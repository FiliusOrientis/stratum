# DropZone

**File**: `apps/web/src/components/app-shell/drop-zone.tsx`

Full-screen drag-and-drop overlay for PDF imports. Appears when a file is dragged over the browser window.

## Props

| Prop | Type | Description |
|------|------|-------------|
| `onDrop` | `(file: File) => void` | Fired when a PDF file is dropped |

## Behavior

- Listens to `dragenter`, `dragleave`, `dragover`, `drop` events on `document`
- Uses a `dragCount` ref to handle nested drag events correctly (enter/leave on child elements)
- Only activates when the drag data contains `Files`
- Only accepts `application/pdf` type files
- Overlay shows with fade animation (Motion `AnimatePresence`, 150ms)

## Drag counter pattern

```tsx
const dragCount = useRef(0)
// Increment on dragenter, decrement on dragleave
// Only hide when counter reaches 0
```

This prevents flickering when the cursor moves over child elements of the overlay.

## Usage

```tsx
import { DropZone } from '@/components/app-shell'

<DropZone onDrop={(file) => handleFile(file)} />
```

## Styling

- Semi-transparent background: `bg-background/60 backdrop-blur-sm`
- Dashed border: `border-2 border-dashed border-border`
- Matching Motion overlay animation: `fade-in/fade-out 150ms`
