# Toolbar Store

**File**: `apps/web/src/stores/toolbar.store.ts`

Controls the reader toolbar position and drawer visibility.

## State

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `position` | `'top' \| 'bottom' \| 'hidden'` | `'top'` | Edge where toolbar is anchored |
| `isTocDrawerOpen` | `boolean` | `false` | TOC/thumbnails sidebar visibility |
| `isCatalogDrawerOpen` | `boolean` | `false` | Catalog drawer visibility |

## Actions

| Action | Signature | Description |
|--------|-----------|-------------|
| `setPosition` | `(pos: ToolbarPosition) => void` | Anchor toolbar to edge |
| `toggleTocDrawer` | `() => void` | Show/hide TOC drawer |
| `setTocDrawerOpen` | `(open: boolean) => void` | Explicitly set TOC drawer state |
| `toggleCatalogDrawer` | `() => void` | Show/hide catalog drawer |
| `setCatalogDrawerOpen` | `(open: boolean) => void` | Explicitly set catalog drawer state |
| `closeAllDrawers` | `() => void` | Close all open drawers |

## Usage

```tsx
import { useToolbarStore } from '@/stores'

function Toolbar() {
  const pos = useToolbarStore((s) => s.position)
  const toggleToc = useToolbarStore((s) => s.toggleTocDrawer)
  return (
    <div data-position={pos}>
      <button onClick={toggleToc}>TOC</button>
    </div>
  )
}
```

## Persistence

Position should be persisted to Dexie (config table) so user preference survives reload.
