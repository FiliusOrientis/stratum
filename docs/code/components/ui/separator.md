# Separator

**File**: `apps/web/src/components/ui/separator.tsx`

Visual divider line. ShadCN React Aria component. Renders consistently across contexts by using CSS `border` instead of `background-color`.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Line direction |

Additional props are passed through to `SeparatorPrimitive` (React Aria).

## Rendering

- **Horizontal**: Uses `border-t` (top border). Width fills container via `w-full`.
- **Vertical**: Uses `border-r` (right border). Height fills container via `self-stretch`.

## Why border instead of bg

The ShadCN default Separator uses `bg-border` with `h-px`/`w-px` to render the line. This causes inconsistent visual height across zoom levels and layout contexts (see [shadcn-ui/ui#3870](https://github.com/shadcn-ui/ui/discussions/3870)). The fix: use CSS `border-t`/`border-r` with `border-border` color, which renders pixel-perfect at any zoom.

## Usage

```tsx
import { Separator } from '@/components/ui/separator'

// Horizontal (default)
<Separator />

// Vertical with custom height
<Separator orientation="vertical" className="h-7" />
```

## Custom height

For vertical separators, set `h-*` to match adjacent elements:
```tsx
<Separator orientation="vertical" className="h-7" /> {/* matches size="icon" button */}
```
