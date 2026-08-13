# Fab

**File**: `apps/web/src/components/fab.tsx`

Generic floating action button — ghost icon button with optional fixed corner placement. Single source of truth for FAB styling across the app (theme toggle, keyboard shortcuts, future FABs).

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `ReactNode` | — | Icon element (decorative — caller sets `aria-hidden`) |
| `label` | `string` | — | `aria-label` for the button; also rendered as tooltip content |
| `onPress` | `() => void` | — | Press handler |
| `position` | `FabPosition` | — | Fixed corner placement; when omitted the button renders inline (no `fixed`) |
| `isExpanded` | `boolean` | — | Sets `aria-expanded` (popover-style FABs) |
| `size` | `'icon' \| 'icon-lg'` | `'icon-lg'` | Button size |
| `className` | `string` | — | Extra classes merged via `cn()` |

## Exports

- `Fab` — the component
- `FabPosition` — the position union type (reused by `ThemeTogglePosition`)

## Tooltip

The button is wrapped in `TooltipTrigger` + `Tooltip` — hovering or focusing shows the `label` as a tooltip.

## Positions

Nine named spots, all `4` units from the edge (`fixed z-50`):

| Position | Classes |
|----------|---------|
| `top-left` / `top-center` / `top-right` | top row |
| `middle-left` / `center` / `middle-right` | vertically centered |
| `bottom-left` / `bottom-center` / `bottom-right` | bottom row |

## Usage

```tsx
import { Fab } from '@/components/fab'

<Fab
  icon={<CircleHelp aria-hidden="true" />}
  label="Keyboard shortcuts"
  isExpanded={isOpen}
  onPress={() => setIsOpen(o => !o)}
/>

<Fab
  icon={<Sun aria-hidden="true" />}
  label="Switch to light mode"
  size="icon-lg"
  position="top-right"
  onPress={toggleTheme}
/>
```

Composers: `ThemeToggle` (theme-toggle.tsx) and `KeyboardShortcutsFab` (app-shell/keyboard-shortcuts-fab.tsx).

## Dependencies

- `@/components/ui/button` — `Button` (ghost variant, icon sizes)
- `@/components/ui/tooltip` — `Tooltip`, `TooltipTrigger`
- `@/lib/utils` — `cn`
