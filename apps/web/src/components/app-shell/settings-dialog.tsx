import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { useSettingsStore } from '@/stores'

export function SettingsDialog() {
  const isOpen = useSettingsStore(s => s.isDialogOpen)
  const closeSettings = useSettingsStore(s => s.closeSettings)

  return (
    <Dialog isOpen={isOpen} showCloseButton={false} onOpenChange={open => !open && closeSettings()}>
      <DialogHeader>
        <DialogTitle>Settings</DialogTitle>
        <DialogDescription>Configure reading preferences and app behavior.</DialogDescription>
      </DialogHeader>

      <div className="flex flex-col gap-6 py-4">
        <div>
          <h3 className="font-heading text-sm text-muted-foreground">Reading</h3>
          <p className="mt-1 text-xs text-muted-foreground/60">
            Page turning, zoom behavior, and display preferences will appear here.
          </p>
        </div>

        <Separator />

        <div>
          <h3 className="font-heading text-sm text-muted-foreground">Appearance</h3>
          <p className="mt-1 text-xs text-muted-foreground/60">
            Theme, toolbar position, and layout options will appear here.
          </p>
        </div>

        <Separator />

        <div>
          <h3 className="font-heading text-sm text-muted-foreground">Storage</h3>
          <p className="mt-1 text-xs text-muted-foreground/60">
            Imported PDFs, cache management, and storage usage will appear here.
          </p>
        </div>
      </div>

      <DialogFooter>
        <DialogClose>Close</DialogClose>
      </DialogFooter>
    </Dialog>
  )
}
