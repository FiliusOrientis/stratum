# DropZone

**File**: `apps/web/src/components/app-shell/drop-zone.tsx`

Full-screen drag-and-drop overlay for PDF imports. Powered by `react-dropzone` (useDropzone hook).

## Props

| Prop | Type | Description |
|------|------|-------------|
| `onDrop` | `(file: File) => void` | Fired when a PDF file is dropped |

## Behavior

- Uses `react-dropzone`'s `useDropzone` hook — handles drag enter/leave counting, file validation, event prevention
- Accepts only PDF files: `accept={{ 'application/pdf': ['.pdf'] }}`
- Single file only: `multiple={false}`
- Does not open file dialog on click: `noClick={true}` (use `ImportButton` for that)
- Overlay shows with fade animation (Motion `AnimatePresence`, 150ms)
- `isDragActive` state from react-dropzone drives the overlay visibility

## Usage

```tsx
import { DropZone } from '@/components/app-shell'

<DropZone onDrop={(file) => handleFile(file)} />
```

## Styling

- Semi-transparent background: `bg-background/60 backdrop-blur-sm`
- Dashed border: `border-2 border-dashed border-border`
- Matching Motion overlay animation: `fade-in/fade-out 150ms`

## Dependencies

- `react-dropzone` — `useDropzone` hook for drag event handling
- `motion/react` — `AnimatePresence` + `motion.div` for overlay animation
