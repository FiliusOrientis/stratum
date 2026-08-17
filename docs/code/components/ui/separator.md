# Separator

**File**: `apps/web/src/components/ui/separator.tsx`

Visual divider line. ShadCN React Aria component with CVA variants. Renders a 1px line via `bg-border` on `h-px`/`w-px` boxes.

## Props

| Prop          | Type                                        | Default        | Description            |
|---------------|---------------------------------------------|----------------|------------------------|
| `orientation` | `'horizontal' \| 'vertical'`                | `'horizontal'` | Line direction         |
| `variant`     | `'default' \| 'muted' \| 'soft' \| 'faint'` | `'default'`    | Line opacity intensity |

Additional props are passed through to `SeparatorPrimitive` (React Aria).

## Variants

| Variant   | Opacity | Use case                            |
|-----------|---------|-------------------------------------|
| `default` | 100%    | Default section dividers            |
| `muted`   | 75%     | Subtle separation                   |
| `soft`    | 50%     | Light visual grouping               |
| `faint`   | 25%     | Barely visible dividers, decorative |

## Rendering

- **Horizontal**: `h-px w-full` (1px line, full width) via `aria-[orientation=horizontal]` selectors
- **Vertical**: `w-px self-stretch` (1px line, container height) via `aria-[orientation=vertical]` selectors
- **`<hr>` element**: `h-px w-full` via `[:is(hr)]` selector

## Line color

Uses `bg-border` (with `h-px`/`w-px` for the line), the standard ShadCN approach. Opacity is modulated per variant via `bg-border/75`, `bg-border/50`, `bg-border/25`.

## Usage

```tsx
import { Separator } from '@/components/ui/separator'

// Horizontal (default)
<Separator />

// Muted variant for subtle separation
<Separator variant="muted" />

// Vertical with custom height
<Separator orientation="vertical" className="h-7" />
```

## Custom height

For vertical separators, set `h-*` to match adjacent elements:
```tsx
<Separator orientation="vertical" className="h-7" /> {/* matches size="icon" button */}
```

## Export

`separatorVariants` is also exported for reuse in custom components that need the same styling.
