import { toast } from 'sonner'
import {
  AppLayout,
  DEFAULT_SHORTCUTS,
  DropZone,
  EmptyState,
  KeyboardShortcutsFab,
} from '@/components/app-shell'
import { useFileImport } from '@/hooks/use-file-import'
import { useCatalogStore } from '@/stores/catalog.store'

export function CatalogPage() {
  const books = useCatalogStore(s => s.books)
  const error = useCatalogStore(s => s.error)
  const { handleFile, handleInputChange, fileInputRef } = useFileImport()

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  const openFileDialog = useCallback(() => {
    fileInputRef.current?.click()
  }, [fileInputRef])

  const isEmpty = books.length === 0

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
      <DropZone
        onDrop={file => {
          void handleFile(file)
        }}
      >
        {isEmpty ? (
          <EmptyState
            onImport={openFileDialog}
            onUrlImport={file => {
              void handleFile(file)
            }}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-muted-foreground text-sm">
              {books.length} {books.length === 1 ? 'book' : 'books'} imported
            </p>
          </div>
        )}
      </DropZone>
      {isEmpty && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-start pb-5 pl-5">
          <KeyboardShortcutsFab shortcuts={DEFAULT_SHORTCUTS} />
        </div>
      )}
    </AppLayout>
  )
}
