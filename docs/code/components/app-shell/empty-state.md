# EmptyState

**File**: `apps/web/src/components/app-shell/empty-state.tsx`

Full-page empty state shown when the catalog has no books.

## Props

| Prop | Type | Description |
|------|------|-------------|
| `onImport` | `() => void` | Fired when "Import PDF" button is pressed |
| `onOpenUrl` | `() => void` | Fired when "Open from URL" button is pressed |

## Layout

```
[BookOpenIcon in circle]
  No books yet
  Import a PDF to start reading in 3D.
[Import PDF] [Open from URL]
```

Centered vertically and horizontally within the main content area. Uses `flex h-full flex-col items-center justify-center` with 16px gap between elements.

## Usage

```tsx
import { EmptyState } from '@/components/app-shell'

<EmptyState
  onImport={() => fileInputRef.current?.click()}
  onOpenUrl={() => window.prompt('Enter PDF URL:')}
/>
```

## Dependencies

- `@phosphor-icons/react` — BookOpenIcon, LinkIcon, PlusIcon
- `@/components/ui/button` — Button with variants
