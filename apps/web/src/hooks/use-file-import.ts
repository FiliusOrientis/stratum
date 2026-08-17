import { importPdf } from '@/lib/pdf-import'
import { deletePdf } from '@/lib/storage'
import { isNonEmptyString } from '@/lib/utils'
import { useCatalogStore } from '@/stores/catalog.store'
import { useViewerStore } from '@/stores/viewer.store'
import { getPdfParser } from '@/workers/pdf.import'

function errorMessage(error: Error | { message?: unknown }): string {
  if (error instanceof Error) {
    return error.message
  }
  if ('message' in error && isNonEmptyString(error.message)) {
    return error.message
  }
  return 'Failed to import PDF'
}

export function useFileImport() {
  const addBook = useCatalogStore(s => s.addBook)
  const setError = useCatalogStore(s => s.setError)
  const setPageCount = useViewerStore(s => s.setPageCount)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const isImportingRef = useRef(false)

  const handleFile = useCallback(
    async (file: File) => {
      if (isImportingRef.current) {
        return
      }
      isImportingRef.current = true
      try {
        setError(null)
        if (file.type !== 'application/pdf') {
          setError('Selected file is not a PDF')
          return
        }
        const bytes = await file.arrayBuffer()
        const imported = await importPdf(file.name, bytes)
        try {
          const parsed = await getPdfParser().parsePdf(new Uint8Array(bytes), [bytes])
          addBook({
            id: imported.fingerprint,
            title: parsed.title ?? imported.title,
            author: parsed.author,
            pageCount: parsed.pageCount,
            coverBlob: parsed.thumbnailBlob,
            lastPage: 1,
            addedAt: new Date(),
          })
          setPageCount(parsed.pageCount)
        } catch (error) {
          await deletePdf(imported.fingerprint)
          // SAFETY: catch binds unknown; Comlink rejections are plain objects, Errors pass through
          setError(errorMessage(error as Error | { message?: unknown }))
        }
      } catch (error) {
        // SAFETY: catch binds unknown; the import pipeline only ever surfaces readable messages
        setError(errorMessage(error as Error | { message?: unknown }))
      } finally {
        isImportingRef.current = false
      }
    },
    [addBook, setError, setPageCount],
  )

  const handleInputChange = useCallback(
    (e: { target: { files: FileList | null; value: string } }) => {
      const file = e.target.files?.[0]
      if (file) {
        void handleFile(file)
      }
      e.target.value = ''
    },
    [handleFile],
  )

  return { handleFile, handleInputChange, fileInputRef }
}
