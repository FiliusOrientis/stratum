# ReaderToolbar

**File**: `apps/web/src/components/app-shell/reader-toolbar.tsx`

Edge-anchored toolbar for the 3D flipbook reader. Position controlled by toolbarStore.

## Controls (left to right)

| Control | Icon | Action | Store Binding |
|---------|------|--------|---------------|
| Previous page | `CaretLeftIcon` | `viewerStore.prevPage()` | disabled at page 1 |
| Page input | `Input` (type=number) | `viewerStore.setPage()` | min=1, max=pageCount |
| Next page | `CaretRightIcon` | `viewerStore.nextPage()` | disabled at last page |
| Separator | vertical line | — | — |
| Zoom out | `MagnifyingGlassMinusIcon` | `viewerStore.zoomOut()` | switches to custom mode |
| Zoom in | `MagnifyingGlassPlusIcon` | `viewerStore.zoomIn()` | switches to custom mode |
| Separator | vertical line | — | — |
| Fullscreen | `CornersOutIcon` | `viewerStore.toggleFullscreen()` | — |
| Separator | vertical line | — | — |
| Move to top/bottom | `ArrowFatLineDownIcon` / `ArrowFatLineUpIcon` | `toolbarStore.setPosition()` | cycles top↔bottom |
| Hide toolbar | `EyeSlashIcon` | `toolbarStore.setPosition('hidden')` | — |

## Position Behavior

| Position | CSS | Rendering |
|----------|-----|-----------|
| `top` | `fixed top-0 inset-x-0` | Anchored to top of viewport |
| `bottom` | `fixed bottom-0 inset-x-0` | Anchored to bottom of viewport |
| `hidden` | `display: none` | Not rendered |

## Usage

```tsx
import { ReaderToolbar } from '@/components/app-shell'
import { AppLayout } from '@/components/app-shell/app-layout'

<AppLayout>
  <ReaderToolbar />
</AppLayout>
```

## Styling

- Semi-transparent background: `bg-background/80 backdrop-blur-md`
- Uniform `gap-2` spacing between all elements
- All buttons use `size="icon"` for consistent 28px height
- Separators match button height (`h-7`)

## Tests

**File**: `reader-toolbar.test.tsx` — 7 tests covering:
- All control buttons rendered
- Position switching (top/bottom/hidden)
- Move-to-top / move-to-bottom labels

Coverage: 83.87% statements, 57.14% branches, 80% functions, 75% lines.
