# DropZone

**File**: `apps/web/src/components/app-shell/drop-zone.tsx`

Wraps page content to create a full-page PDF drop target. Uses `react-dropzone` — the standard dropzone library (10M+ weekly downloads).

## Props

| Prop       | Type                   | Description                                    |
|------------|------------------------|------------------------------------------------|
| `onDrop`   | `(file: File) => void` | Fired when a PDF file is dropped               |
| `children` | `ReactNode`            | Page content rendered inside the dropzone root |

## Architecture

DropZone wraps its children in a div that serves as the **dropzone root** via `getRootProps()`. This is the standard pattern from react-dropzone's documentation.

**`isDragGlobal`** (from react-dropzone's internal document-level `dragover` listener) detects file drags anywhere on the page, not just over the dropzone element. When active, a full-screen overlay renders with `pointer-events: none`, so drops pass through to the dropzone root below.

## Behavior

- **`noClick: true`** — clicking the page does not open a file dialog (use `ImportButton` instead)
- **`accept`** — only PDF files (`application/pdf`)
- **`multiple: false`** — single file per drop
- **`isDragGlobal`** — drives overlay visibility (document-level, not dependent on root `pointer-events`)

## Accessibility

The hidden file input is wrapped in a `<label className="sr-only">` for screen reader association.

## Usage

```tsx
import { DropZone } from '@/components/app-shell'

<DropZone onDrop={(file) => handleFile(file)}>
  <EmptyState onImport={...} onUrlImport={...} />
</DropZone>
```

## Styling

- Overlay root: `fixed inset-0 z-50`, semi-transparent background `bg-background/60 backdrop-blur-sm`
- Overlay content: centered column with `FileText` (`size-8`, muted) + "Drop your PDF here" copy inside a `rounded-xl border-2 border-dashed border-border p-12`
- Motion (`AnimatePresence` + `motion.div`) for the overlay fade entrance/exit (150ms, easeOut)

## Dependencies

- `react-dropzone` — `useDropzone` hook (document-level drag detection, file validation, drop handling)
