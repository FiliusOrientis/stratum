import { AppLayout, DropZone, EmptyState } from '@/components/app-shell'
import { useFileImport } from '@/hooks/use-file-import'
import { useCatalogStore } from '@/stores/catalog.store'

export function CatalogPage() {
  const books = useCatalogStore(s => s.books)
  const { handleFile, handleInputChange, fileInputRef } = useFileImport()

  return (
    <AppLayout>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        aria-label="Select a PDF file"
        className="hidden"
        onChange={handleInputChange}
      />
      <DropZone onDrop={handleFile}>
        {books.length === 0 ? (
          <EmptyState onImport={() => fileInputRef.current?.click()} onUrlImport={handleFile} />
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-muted-foreground text-sm">{books.length} book(s) imported</p>
          </div>
        )}
      </DropZone>
    </AppLayout>
  )
}
