import { useCallback, useRef } from 'react'
import { importPdf } from '@/lib/pdf-import'
import { useCatalogStore } from '@/stores/catalog.store'
import { useViewerStore } from '@/stores/viewer.store'

export function useFileImport() {
  const addBook = useCatalogStore(s => s.addBook)
  const setPageCount = useViewerStore(s => s.setPageCount)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(
    async (file: File) => {
      const metadata = await importPdf(file)
      addBook({
        id: metadata.fingerprint,
        title: metadata.title,
        pageCount: metadata.pageCount,
        lastPage: 1,
        addedAt: new Date(),
      })
      setPageCount(metadata.pageCount)
    },
    [addBook, setPageCount],
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
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
