import { BookOpenIcon, LinkIcon, PlusIcon } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  onImport: () => void
  onOpenUrl: () => void
}

export function EmptyState({ onImport, onOpenUrl }: EmptyStateProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 px-6">
      <div className="flex size-14 items-center justify-center rounded-full border border-border bg-muted/30">
        <BookOpenIcon className="size-6 text-muted-foreground" />
      </div>
      <div className="text-center">
        <h2 className="font-heading font-medium text-base text-foreground">No books yet</h2>
        <p className="mt-1 text-muted-foreground text-sm">Import a PDF to start reading in 3D.</p>
      </div>
      <div className="flex items-center gap-3">
        <Button onPress={onImport}>
          <PlusIcon />
          Import PDF
        </Button>
        <Button variant="ghost" onPress={onOpenUrl}>
          <LinkIcon />
          Open from URL
        </Button>
      </div>
    </div>
  )
}
