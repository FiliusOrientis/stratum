# ReaderToolbar

**Directory**: `apps/web/src/components/app-shell/reader-toolbar/`

Edge-anchored toolbar for the 3D flipbook reader. Position controlled by toolbarStore.

## File Structure

| File | Purpose |
|------|---------|
| `reader-toolbar.tsx` | Orchestrator — connects Zustand stores to sub-components, mounts AnimatePresence |
| `reader-toolbar-controls.tsx` | Full button row — nav, zoom, fullscreen, position switcher, hide. Receives data and callbacks via props |
| `reader-toolbar-trigger.tsx` | Collapsed pill button shown when toolbar is hidden. Animates in/out with spring |
| `reader-toolbar-button.tsx` | Wraps ShadCN `Button` + `TooltipTrigger` + `Tooltip`. Reduces repetition in controls |
| `reader-toolbar.types.ts` | Shared types (`ToolbarButtonProps`) and pure animation math (`getAnimation()`) |

The decomposition follows the modularity principle: logic (`getAnimation` in types file) is separated from UI markup (controls/trigger), and each sub-component is independently testable and improvable.

## Controls (left to right)

| Control | Icon | Action | Store Binding | Disabled when |
|---------|------|--------|---------------|---------------|
| Previous page | `CaretLeftIcon` | `viewerStore.prevPage()` | disabled at page 1 | `currentPage <= 1` |
| Page input | `Input` (type=text, inputMode=numeric) | `viewerStore.setPage()` | validates 1..pageCount | — |
| Next page | `CaretRightIcon` | `viewerStore.nextPage()` | disabled at last page | `currentPage >= pageCount` |
| Separator | vertical line | — | — | — |
| Zoom out | `MagnifyingGlassMinusIcon` | `viewerStore.zoomOut()` | switches to custom mode | — |
| Zoom in | `MagnifyingGlassPlusIcon` | `viewerStore.zoomIn()` | switches to custom mode | — |
| Separator | vertical line | — | — | — |
| Fullscreen | `CornersOutIcon` | `viewerStore.toggleFullscreen()` | — | — |
| Separator | vertical line | — | — | — |
| Move to top/bottom | `ArrowFatLineDownIcon` / `ArrowFatLineUpIcon` | `toolbarStore.setPosition()` | cycles top↔bottom | — |
| Hide toolbar | `EyeSlashIcon` | `toolbarStore.hide()` | collapses to trigger button | — |

## Position Behavior

| Position | CSS | Rendering |
|----------|-----|-----------|
| `top` | `fixed top-0 inset-x-0` | Anchored to top of viewport |
| `bottom` | `fixed bottom-0 inset-x-0` | Anchored to bottom of viewport |
| `hidden` | `fixed (top-0/bottom-0)` | Collapsed to pill trigger at edge. `show()` restores to `previousPosition`. Trigger uses `rounded-t-none` when at top, `rounded-b-none` when at bottom. |

## Usage

```tsx
import { ReaderToolbar } from '@/components/app-shell'
import { AppLayout } from '@/components/app-shell/app-layout'

<AppLayout>
  <ReaderToolbar />
</AppLayout>
```

## Motion Animations

Imports from `motion/react`.

### Hide/Show Slide

The toolbar and its collapsed trigger are wrapped in `AnimatePresence mode="wait"`. When `position` changes to `'hidden'`, the toolbar slides out (up if at top, down if at bottom) with a spring transition. After the exit completes, the trigger button slides in from the same edge. Clicking the trigger reverses the sequence.

- **Transition**: `{ type: 'spring', stiffness: 300, damping: 30 }`
- **Toolbar slide**: 80px in the direction of the edge
- **Trigger slide**: 40px in the direction of the edge
- **Both**: `opacity` animates from 0 to 1

```tsx
<AnimatePresence mode="wait" initial={false}>
  {position === 'hidden' ? (
    <motion.div key="trigger" initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -40, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
      {/* trigger button */}
    </motion.div>
  ) : (
    <motion.div key={`toolbar-${position}`} initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -80, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
      {/* toolbar controls */}
    </motion.div>
  )}
</AnimatePresence>
```

The `key` prop differences (`"trigger"` vs `"toolbar-{position}"`) enable AnimatePresence to detect state swaps. `mode="wait"` ensures the entering element waits for the exiting one to finish. Direction uses `position` when visible (for correct exit direction after top↔bottom moves) and `previousPosition` when hidden (for the trigger). `initial={false}` on AnimatePresence prevents entrance animations on first mount.

## Styling

- Semi-transparent background: `bg-background/80 backdrop-blur-md`
- Uniform `gap-2` spacing between all elements
- All buttons use `size="icon"` for consistent 28px height
- Separators match button height (`h-7`)

## Storybook

**File**: `reader-toolbar.stories.tsx`

The story uses a `ToolbarStory` wrapper that accepts `currentPage`, `pageCount`, and `position` as props. These are synced to Zustand stores via `useEffect` on mount and prop change. Storybook auto-generates controls for all three props. Use **Open canvas in new tab** to preview the toolbar — the Docs tab shows controls and source but the toolbar's `fixed` positioning renders it outside the docs canvas. `loaders` initialize the stores synchronously before the first render so the preview shows the toolbar immediately.

### Wrapper pattern

```tsx
function ToolbarStory({ currentPage = 1, pageCount = 42, position = 'top' }) {
  useEffect(() => {
    useViewerStore.setState({ currentPage, pageCount })
    useToolbarStore.setState({ position })
  }, [currentPage, pageCount, position])
  return <ReaderToolbar />
}

Note: `loaders` initialize the stores synchronously before the first render so the docs preview shows the toolbar immediately.

### Variants

| Name | Args | Description |
|------|------|-------------|
| `Default` | page 1/42, top | Default toolbar position |
| `BottomPosition` | page 5/100, bottom | Toolbar anchored to bottom |

### Controls

| Prop | Control Type | Options | Default |
|------|-------------|---------|---------|
| `currentPage` | number | — | 1 |
| `pageCount` | number | — | 42 |
| `position` | select | top, bottom, hidden | top |

## Tests

**File**: `reader-toolbar.test.tsx` — 7 tests covering:
- All control buttons rendered
- Position switching (top/bottom/hidden)
- Move-to-top / move-to-bottom labels

Coverage: 83.87% statements, 57.14% branches, 80% functions, 75% lines.
