import { AppLayout, DropZone, EmptyState, KeyboardShortcutsFab } from '@/components/app-shell'
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
      {books.length === 0 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-start pb-5 pl-5">
          <KeyboardShortcutsFab
            shortcuts={[
              { keys: ['Ctrl', 'O'], description: 'to open a file' },
              { keys: ['D'], description: 'to toggle dark mode' },
            ]}
          />
        </div>
      )}
    </AppLayout>
  )
}
