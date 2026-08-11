# KeyboardShortcutsFab

**File**: `apps/web/src/components/app-shell/keyboard-shortcuts-fab.tsx`

Floating action button (`?` question icon, ghost) that toggles the `KeyboardShortcuts` panel. The panel is hidden by default — clicking the FAB pops it up above the button.

## Props

| Prop | Type | Description |
|------|------|-------------|
| `shortcuts` | `KeyboardHintProps[]` | Ordered list of hints: `{ keys: string[], description: string }` |

## Structure

```
<div> ← flex-col, items-start, gap-2, pointer-events-auto
  <AnimatePresence>
    {isOpen && <KeyboardShortcuts shortcuts={shortcuts} />}   ← pops up above the FAB
  </AnimatePresence>
  <Fab label="Keyboard shortcuts" aria-expanded={isOpen} onPress={toggle} icon={<CircleHelp aria-hidden="true" />} />
</div>
```

- **Default closed**: panel mounts only on first open — no render cost, no layout impact
- **Animation**: panel entrance/exit driven by `KeyboardShortcuts` `fadeUp` variants (280ms in, 150ms out, `easeOut`), orchestrated via `AnimatePresence`
- **A11y**: `aria-expanded` reflects open state; question icon is decorative (`aria-hidden`)

## Usage

```tsx
import { KeyboardShortcutsFab } from '@/components/app-shell'

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
```

The page wraps the FAB in an `absolute bottom-0` container (`main` is `relative`), so it overlays the page without taking layout space. `pointer-events-none` on the wrapper lets the empty gutter pass clicks through; the FAB re-enables events via `pointer-events-auto`.

## Dependencies

- `lucide-react` — CircleHelp
- `motion/react` — `AnimatePresence` for pop-up/close
- `@/components/fab` — generic `Fab` (ghost icon button)
- `./keyboard-shortcuts` — `KeyboardShortcuts` panel
- `./keyboard-hint` — `KeyboardHintProps` type
