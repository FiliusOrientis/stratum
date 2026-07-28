import { useCallback, useRef } from 'react'
import { DropZone, EmptyState } from '@/components/app-shell'
import { AppLayout } from '@/components/app-shell/app-layout'
import { importPdf } from '@/lib/pdf-import'
import { useCatalogStore, useViewerStore } from '@/stores'

export function CatalogPage() {
  const books = useCatalogStore(s => s.books)
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

  const handleUrlImport = useCallback(() => {
    const url = window.prompt('Enter PDF URL:')
    if (!url) {
      return
    }
    fetch(url)
      .then(res => res.blob())
      .then(blob => {
        const name = url.split('/').pop() || 'document.pdf'
        handleFile(new File([blob], name, { type: 'application/pdf' }))
      })
      .catch(() => {
        // url fetch failed silently
      })
  }, [handleFile])

  return (
    <AppLayout>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={handleInputChange}
      />
      {books.length === 0 ? (
        <EmptyState onImport={() => fileInputRef.current?.click()} onOpenUrl={handleUrlImport} />
      ) : (
        <div className="flex h-full items-center justify-center">
          <p className="text-muted-foreground text-sm">{books.length} book(s) imported</p>
        </div>
      )}
      <DropZone onDrop={handleFile} />
    </AppLayout>
  )
}
