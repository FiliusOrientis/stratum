import { type ChangeEvent, useCallback, useRef } from 'react'
import { importPdf } from '@/lib/pdf-import'
import { useCatalogStore } from '@/stores/catalog.store'
import { useViewerStore } from '@/stores/viewer.store'
import { getPdfParser } from '@/workers/pdf.import'

export function useFileImport() {
  const addBook = useCatalogStore(s => s.addBook)
  const setError = useCatalogStore(s => s.setError)
  const setPageCount = useViewerStore(s => s.setPageCount)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(
    async (file: File) => {
      try {
        const imported = await importPdf(file)
        const parsed = await getPdfParser().parsePdf(file)
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
        setError(error instanceof Error ? error.message : 'Failed to import PDF')
      }
    },
    [addBook, setError, setPageCount],
  )

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        handleFile(file)
      }
      e.target.value = ''
    },
    [handleFile],
  )

  return { handleFile, handleInputChange, fileInputRef }
}
