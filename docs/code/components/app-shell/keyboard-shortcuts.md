# KeyboardShortcuts

**File**: `apps/web/src/components/app-shell/keyboard-shortcuts.tsx`

Presentational "shortcut hint" card — stacked `KeyboardHint` rows. Not shown by default: it is mounted/unmounted by the `KeyboardShortcutsFab` FAB (see `keyboard-shortcuts-fab.md`).

## Props

| Prop        | Type                  | Description                                                      |
|-------------|-----------------------|------------------------------------------------------------------|
| `shortcuts` | `KeyboardHintProps[]` | Ordered list of hints: `{ keys: string[], description: string }` |

## Styling

- **Container**: rounded-lg card, `border-border`, `bg-card/50`, `px-4 py-3`, `motion` `fadeUp` entrance/exit, `max-md:hidden`
- **Rows**: stacked hints with `gap-1.5`
- **Responsive**: whole panel hidden below `md` — keyboard hints are pointless on touch devices
- **Animation**: `fadeUp` variants (280ms in, 150ms out, `easeOut`) — consumed by `KeyboardShortcutsFab`'s `AnimatePresence`
- **Keys**: `shortcut.keys.join('+')` used as React key

## Usage

Most callers compose this inside `KeyboardShortcutsFab` instead of using it directly:

```tsx
import { KeyboardShortcutsFab } from '@/components/app-shell'

<KeyboardShortcutsFab
  shortcuts={[
    { keys: ['Ctrl', 'O'], description: 'to open a file' },
    { keys: ['D'], description: 'to toggle dark mode' },
  ]}
/>
```

## Dependencies

- `motion/react` — `motion` for panel fade-in/out
- `@/lib/animation` — `easeOut` constant
- `./keyboard-hint` — `KeyboardHint` row + `KeyboardHintProps` type
