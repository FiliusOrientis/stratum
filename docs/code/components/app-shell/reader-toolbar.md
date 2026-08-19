# ReaderToolbar

**Directory**: `apps/web/src/components/app-shell/reader-toolbar/`

Edge-anchored toolbar for the 3D flipbook reader. Position controlled by toolbarStore.

## File Structure

| File                          | Purpose                                                                                                 |
|-------------------------------|---------------------------------------------------------------------------------------------------------|
| `reader-toolbar.tsx`          | Orchestrator — connects Zustand stores to sub-components, mounts AnimatePresence                        |
| `reader-toolbar-controls.tsx` | Full button row — nav, zoom, fullscreen, position switcher, hide. Receives data and callbacks via props |
| `reader-toolbar-trigger.tsx`  | Collapsed pill (`CollapseToggle`) shown when toolbar is hidden. Animates in/out with spring             |
| `reader-toolbar-button.tsx`   | Wraps ShadCN `Button` + `TooltipTrigger` + `Tooltip` (700ms delay). Reduces repetition in controls      |
| `reader-toolbar.types.ts`     | Shared types (`ToolbarButtonProps`)                                                                     |
| `reader-toolbar.helpers.ts`   | `ToolbarAnimation` type and pure animation math (`getAnimation()`)                                      |

The decomposition follows the modularity principle: logic (`getAnimation` in helpers file) is separated from UI markup (controls/trigger), and each sub-component is independently testable and improvable.

## Controls (left to right)

**Desktop (≥768px) — all controls inline:**

| Control            | Icon                                   | Action                           | Store Binding               | Disabled when              |
|--------------------|----------------------------------------|----------------------------------|-----------------------------|----------------------------|
| Previous page      | `ChevronLeft`                          | `viewerStore.prevPage()`         | —                           | `currentPage <= 1`         |
| Page input         | `Input` (type=text, inputMode=numeric) | `viewerStore.setPage()`          | validates 1..pageCount      | —                          |
| Next page          | `ChevronRight`                         | `viewerStore.nextPage()`         | —                           | `currentPage >= pageCount` |
| Separator          | `variant="soft"` vertical              | —                                | —                           | —                          |
| Fullscreen         | `Maximize`                             | `viewerStore.toggleFullscreen()` | —                           | —                          |
| Separator          | `variant="soft"` vertical              | —                                | —                           | —                          |
| Zoom out           | `ZoomOut`                              | `viewerStore.zoomOut()`          | switches to custom mode     | —                          |
| Zoom in            | `ZoomIn`                               | `viewerStore.zoomIn()`           | switches to custom mode     | —                          |
| Separator          | `variant="soft"` vertical              | —                                | —                           | —                          |
| Move to top/bottom | `ArrowDownToLine` / `ArrowUpToLine`    | `toolbarStore.setPosition()`     | cycles top↔bottom           | —                          |
| Hide toolbar       | `EyeOff`                               | `toolbarStore.hide()`            | collapses to trigger button | —                          |

**Mobile (<768px) — three-section layout, no separators:**
- **Left**: Fullscreen
- **Center**: Previous page, Page input, Next page (centered via `flex-1 justify-center`)
- **Right**: `Ellipsis` menu dropdown containing Zoom in, Zoom out, Move position, Hide toolbar

## Position Behavior

| Position | CSS                        | Rendering                                                                                                                                                                      |
|----------|----------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `top`    | `fixed top-0 inset-x-0`    | Anchored to top of viewport                                                                                                                                                    |
| `bottom` | `fixed bottom-0 inset-x-0` | Anchored to bottom of viewport                                                                                                                                                 |
| `hidden` | `fixed (top-0/bottom-0)`   | Collapsed to pill trigger at edge. `show()` restores to `previousPosition`. Trigger uses `rounded-t-none` when at top, `rounded-b-none` when at bottom (via `CollapseToggle`). |

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

- **Transition**: `springPreset` from `@/lib/animation` (`{ type: 'spring', duration: 0.25, bounce: 0.1 }`)
- **Toolbar slide**: 80px in the direction of the edge (`toolbarAnimation.slideDir`)
- **Trigger slide**: 40px in the direction of the edge (`toolbarAnimation.triggerSlide`)
- **Both**: `opacity` animates from 0 to 1
- **Direction**: `getAnimation(isTop)` in `reader-toolbar.helpers.ts` derives the signed slide distances and edge (`top-0`/`bottom-0`)

```tsx
<AnimatePresence mode="wait" initial={false}>
  {isHidden ? (
    <ToolbarTrigger key="trigger" isTop={isTop} anim={anim} onShow={show} />
  ) : (
    <motion.div
      key={`toolbar-${position}`}
      initial={{ y: anim.slideDir, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: anim.slideDir, opacity: 0 }}
      transition={springPreset}
      className={cn('fixed inset-x-0 z-50 flex items-center justify-center', anim.edge)}
    >
      <ToolbarControls isTop={isTop} />
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

## Cosmos Fixtures

**File**: `reader-toolbar.fixture.tsx`

Each fixture is a component function that seeds the Zustand stores, then renders the toolbar. The toolbar's `fixed` positioning renders it edge-anchored inside the Cosmos canvas.

### Fixtures

| Name             | Store state        | Description                |
|------------------|--------------------|----------------------------|
| `Default`        | page 1/42, top     | Default toolbar position   |
| `BottomPosition` | page 5/100, bottom | Toolbar anchored to bottom |

## Tests

**File**: `reader-toolbar/reader-toolbar.test.tsx` — 13 tests covering:
- All control buttons rendered (nav, zoom, fullscreen, hide, position)
- Trigger button shown when hidden
- Position switching (top/bottom/hidden)
- Move-to-top / move-to-bottom labels
- First-page / last-page disabled states (prev/next buttons)
- nextPage/prevPage action calls

Coverage (directory, measured via `pnpm test:coverage`): 90.48% statements, 80.77% branches, 83.33% functions, 90.48% lines.
