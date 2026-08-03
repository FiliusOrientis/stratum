# KeyboardShortcuts

**File**: `apps/web/src/components/app-shell/keyboard-shortcuts.tsx`

Compact "shortcut hint" card rendered at the bottom-left of the catalog page (empty state only). Owns the entrance animation and the mobile visibility — the rows themselves are the presentational `KeyboardHint` component.

## Props

| Prop | Type | Description |
|------|------|-------------|
| `shortcuts` | `KeyboardHintProps[]` | Ordered list of hints: `{ keys: string[], description: string }` |

## Structure

```
<div> ← rounded-lg card, border-border, bg-card/50, px-4 py-3, motion fadeUp entrance, max-md:hidden, pointer-events-auto
  <div> ← stacked hints, gap-1.5
    <KeyboardHint keys={['Ctrl', 'O']} description="to open a file" />
    <KeyboardHint keys={['D']} description="to toggle dark mode" />
  </div>
</div>
```

- **Responsive**: whole panel hidden below `md` — keyboard hints are pointless on touch devices
- **Animation**: single `fadeUp` on the panel (280ms, `easeOut`) — hints themselves do not animate
- **Keys**: `shortcut.keys.join('+')` used as React key

## Usage

```tsx
import { KeyboardShortcuts } from '@/components/app-shell'

{books.length === 0 && (
  <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-start pb-5 pl-5">
    <KeyboardShortcuts
      shortcuts={[
        { keys: ['Ctrl', 'O'], description: 'to open a file' },
        { keys: ['D'], description: 'to toggle dark mode' },
      ]}
    />
  </div>
)}
```

The page wraps the panel in an `absolute bottom-0` container (`main` is `relative`), so it overlays the page without taking layout space — the empty state stays centered in the full viewport. `pointer-events-none` on the wrapper lets the empty gutter pass clicks through; the panel itself re-enables events via `pointer-events-auto`.

## Dependencies

- `motion/react` — `motion` for panel fade-in
- `@/lib/animation` — `easeOut` constant
- `./keyboard-hint` — `KeyboardHint` row + `KeyboardHintProps` type
