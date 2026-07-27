# SettingsDialog

**File**: `apps/web/src/components/app-shell/settings-dialog.tsx`

Always-accessible settings modal. Controlled by settingsStore. Contains Gemini API key management.

## Sections

### Gemini API Keys
- 10 BYOK key slots (Key 1–Key 10)
- Password-masked inputs
- Empty slots show "Enter API key" placeholder
- Filled slots show "••••••••" placeholder
- Keys stored in-memory via settingsStore

## Store Binding

| Action | Store Method |
|--------|-------------|
| Open dialog | `settingsStore.openSettings()` |
| Close dialog | `settingsStore.closeSettings()` |
| Set key | `settingsStore.setGeminiKey(slot, value)` |

## Usage

```tsx
import { SettingsDialog } from '@/components/app-shell'
import { AppLayout } from '@/components/app-shell/app-layout'
import { useSettingsStore } from '@/stores'

function MyPage() {
  const open = useSettingsStore(s => s.openSettings)
  return (
    <AppLayout>
      <button onClick={open}>Settings</button>
      <SettingsDialog />
    </AppLayout>
  )
}
```

The `SettingsDialog` is mounted once inside `AppLayout` and toggled via store state.

## Dependencies

- `@/components/ui/dialog` — Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose
- `@/stores` — settingsStore (geminiKeys, isDialogOpen, actions)
- `@phosphor-icons/react` — KeyIcon

## Tests

**File**: `settings-dialog.test.tsx` — 4 tests covering:
- Renders nothing when closed
- Renders title and key section when open
- Shows all 10 key slots
- Close button triggers close

Coverage: 91.66% statements, 62.5% branches, 87.5% functions, 87.5% lines.
