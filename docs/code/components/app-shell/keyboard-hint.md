# KeyboardHint

**File**: `apps/web/src/components/app-shell/keyboard-hint.tsx`

Presentational row for a single keyboard shortcut: `Press [Ctrl] + [O] to open a file`. No animation, no responsive behavior, no store access — placement and visibility are owned by the `KeyboardShortcuts` panel.

## Props

| Prop | Type | Description |
|------|------|-------------|
| `keys` | `string[]` | Key names rendered as keycaps, joined with `+` (e.g. `['Ctrl', 'O']`, `['D']`) |
| `description` | `string` | Sentence tail describing the action (e.g. `'to open a file'`) |

## Structure

```
<p> ← flex, items-center, gap-1.5, text-xs
  Press  [Ctrl] + [O]  to open a file
  Press  [D]          to toggle dark mode
```

- `Kbd` / `KbdGroup` UI primitives render the keycaps (`Kbd variant="click"`)
- Multi-key hints join keycaps with a non-italic `+` span

## Usage

```tsx
import { KeyboardHint } from '@/components/app-shell'

<KeyboardHint keys={['Ctrl', 'O']} description="to open a file" />
```

Most callers compose several hints inside `KeyboardShortcuts` instead of using this directly.

## Dependencies

- `@/components/ui/kbd` — Kbd, KbdGroup
