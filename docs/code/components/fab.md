# Fab

**File**: `apps/web/src/components/fab.tsx`

Generic floating action button — ghost icon button with optional fixed corner placement. Single source of truth for FAB styling across the app (theme toggle, keyboard shortcuts, future FABs).

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `ReactNode` | — | Icon element (decorative — caller sets `aria-hidden`) |
| `label` | `string` | — | `aria-label` for the button |
| `onPress` | `() => void` | — | Press handler |
| `position` | `FabPosition` | — | Fixed corner placement; when omitted the button renders inline (no `fixed`) |
| `isExpanded` | `boolean` | — | Sets `aria-expanded` (popover-style FABs) |
| `size` | `'icon' \| 'icon-lg'` | `'icon'` | Button size |
| `className` | `string` | — | Extra classes merged via `cn()` |

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
  icon={<QuestionIcon aria-hidden="true" />}
  label="Keyboard shortcuts"
  isExpanded={isOpen}
  onPress={() => setIsOpen(o => !o)}
/>

<Fab
  icon={<SunIcon aria-hidden="true" />}
  label="Switch to light mode"
  size="icon-lg"
  position="top-right"
  onPress={toggleTheme}
/>
```

Composers: `ThemeToggle` (theme-toggle.tsx) and `KeyboardShortcutsFab` (app-shell/keyboard-shortcuts-fab.tsx).

## Dependencies

- `@/components/ui/button` — `Button` (ghost variant, icon sizes)
- `@/lib/utils` — `cn`
