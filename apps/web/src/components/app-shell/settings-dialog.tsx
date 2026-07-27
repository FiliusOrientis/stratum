import { KeyIcon } from '@phosphor-icons/react'
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { MAX_KEYS, useSettingsStore } from '@/stores'

const KEY_SLOTS = Array.from({ length: MAX_KEYS }, (_, i) => i)

export function SettingsDialog() {
  const isOpen = useSettingsStore(s => s.isDialogOpen)
  const closeSettings = useSettingsStore(s => s.closeSettings)
  const geminiKeys = useSettingsStore(s => s.geminiKeys)
  const setGeminiKey = useSettingsStore(s => s.setGeminiKey)

  return (
    <Dialog isOpen={isOpen} showCloseButton={false} onOpenChange={open => !open && closeSettings()}>
      <DialogHeader>
        <DialogTitle>Settings</DialogTitle>
        <DialogDescription>Configure API keys, reading preferences, and more.</DialogDescription>
      </DialogHeader>

      <div className="flex flex-col gap-4 py-4">
        <div>
          <h3 className="font-medium text-foreground text-sm">Gemini API Keys</h3>
          <p className="mt-1 mb-3 text-muted-foreground text-xs">
            Bring your own key. Stratum rotates through available keys to maximize rate limits.
          </p>
          <div className="flex flex-col gap-2">
            {KEY_SLOTS.map(slot => (
              <div key={`key-slot-${slot}`} className="flex items-center gap-2">
                <KeyIcon className="size-3.5 shrink-0 text-muted-foreground" />
                <span className="w-10 shrink-0 text-muted-foreground text-xs">Key {slot + 1}</span>
                <input
                  type="password"
                  className="flex h-7 w-full rounded-md border border-border bg-background px-2 text-foreground text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
                  placeholder={geminiKeys[slot] ? '••••••••' : 'Enter API key'}
                  value={geminiKeys[slot] ?? ''}
                  onChange={e => setGeminiKey(slot, e.target.value || null)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <DialogFooter>
        <DialogClose>Close</DialogClose>
      </DialogFooter>
    </Dialog>
  )
}
