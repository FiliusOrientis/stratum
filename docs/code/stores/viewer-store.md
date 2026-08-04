# Viewer Store

**File**: `apps/web/src/stores/viewer.store.ts`

Controls the flipbook reader state — page navigation, zoom, cover style.

## State

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `currentPage` | `number` | `1` | Current page number (1-indexed) |
| `pageCount` | `number` | `0` | Total pages in the loaded book |
| `zoomMode` | `'fit' \| 'width' \| 'custom'` | `'fit'` | Zoom behavior mode |
| `zoomLevel` | `number` | `1` | Custom zoom multiplier (only applies in 'custom' mode) |
| `coverType` | `'none' \| 'plain' \| 'basic' \| 'ridge'` | `'none'` | 3D cover detail level |
| `isFullscreen` | `boolean` | `false` | Whether viewer is in fullscreen mode |
| `isReady` | `boolean` | `false` | Whether the 3D scene has finished initializing |

## Zoom Modes

| Mode | Behavior |
|------|----------|
| `fit` | Page fills viewport height. Best for continuous reading. |
| `width` | Page fills viewport width. Best for landscape/tables. |
| `custom` | Free zoom via slider. User controls exact level. |

## Cover Types

| Type | Description |
|------|-------------|
| `none` | All pages are flat. No 3D cover geometry. |
| `plain` | Flat cover with thickness. No spine detail. |
| `basic` | Raised spine with cover boards. |
| `ridge` | Ridged spine with depth. Most detailed. |

## Actions

| Action | Signature | Description |
|--------|-----------|-------------|
| `setPage` | `(page: number) => void` | Jump to a specific page |
| `setPageCount` | `(count: number) => void` | Set total page count |
| `setZoomMode` | `(mode: ZoomMode) => void` | Change zoom behavior |
| `setZoomLevel` | `(level: number) => void` | Set custom zoom value |
| `setCoverType` | `(type: CoverType) => void` | Change cover detail |
| `toggleFullscreen` | `() => void` | Toggle fullscreen mode |
| `setReady` | `(ready: boolean) => void` | Mark viewer as ready/not-ready |
| `nextPage` | `() => void` | Advance one page (clamped to pageCount) |
| `prevPage` | `() => void` | Go back one page (clamped to 1) |
| `zoomIn` | `() => void` | Increase zoom by 0.25, switches to 'custom' mode |
| `zoomOut` | `() => void` | Decrease zoom by 0.25 (min 0.25), switches to 'custom' mode |

## Usage

```tsx
import { useViewerStore } from '@/stores'

function PageIndicator() {
  const page = useViewerStore((s) => s.currentPage)
  const total = useViewerStore((s) => s.pageCount)
  const nextPage = useViewerStore((s) => s.nextPage)
  return <span>{page} / {total}</span>
}
```

## Dependencies

- `zustand` — state management library

## Integration Notes

- `nextPage`/`prevPage` clamp auto-matically — no need for caller-side bounds checking.
- Call `setPageCount` when a book is loaded so navigation respects boundaries.
- Call `setReady(false)` during book switching, `setReady(true)` when the new 3D scene is ready.
