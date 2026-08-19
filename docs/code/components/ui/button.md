# Button Component

**File**: `apps/web/src/components/ui/button.tsx`

ShadCN React Aria button primitive. Two button types with identical styling API.

## Exports

### `Button(props: ButtonProps)`

Standard `<button>` element for clicks/actions.

**Props** (extends react-aria-components `ButtonProps`):
- `className?: string` — additional CSS classes merged via `cn()`
- `variant?: 'default' | 'destructive' | 'ghost' | 'outline' | 'secondary' | 'link'` (default: `'default'`)
- `size?: 'default' | 'xs' | 'sm' | 'lg' | 'icon' | 'icon-xs' | 'icon-sm' | 'icon-lg'` (default: `'default'`)

**Data attributes** (for styling/targeting):
- `data-slot="button"` — identifies as button element
- `data-variant={variant}` — current variant for CSS targeting
- `data-size={size}` — current size for CSS targeting

### `LinkButton(props: LinkButtonProps)`

Renders as `<a>` element via react-aria-components `LinkPrimitive`. Use for navigation, not actions.

**Props** (extends react-aria-components `LinkProps`):
- Same `className`, `variant`, `size` as Button

### `buttonVariants`

CVA (class-variance-authority) variant configuration object. Reusable for custom components that need button styling.

## Variants

| Variant       | Purpose                | Visual                                                                                                                                                                |
|---------------|------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `default`     | Primary action         | `bg-primary text-primary-foreground hover:bg-primary/80`                                                                                                              |
| `destructive` | Deletion/danger        | `bg-destructive/10 text-destructive hover:bg-destructive/20` + `focus-visible:border-destructive/40 focus-visible:ring-destructive/20` (dark variants at /20 /30 /40) |
| `ghost`       | Minimal, no background | `hover:bg-muted hover:text-foreground` (+ `aria-expanded:bg-muted`)                                                                                                   |
| `outline`     | Bordered secondary     | `border-border hover:bg-input/50 hover:text-foreground` (+ `aria-expanded:bg-muted`, dark `bg-input/30`)                                                              |
| `secondary`   | Alternate primary      | `bg-secondary text-secondary-foreground` + `hover:bg-[color-mix(...)]`, `aria-expanded` retained                                                                      |
| `link`        | Hyperlink appearance   | `text-primary underline-offset-4 hover:underline`                                                                                                                     |

## Sizes

| Size      | Height     | Usage                |
|-----------|------------|----------------------|
| `default` | 28px (h-7) | Standard buttons     |
| `xs`      | 20px (h-5) | Compact/tight spaces |
| `sm`      | 24px (h-6) | Dense toolbars       |
| `lg`      | 32px (h-8) | Primary/hero buttons |
| `icon`    | 28px (h-7) | Icon-only buttons    |
| `icon-xs` | 20px (h-5) | Tiny icon buttons    |
| `icon-sm` | 24px (h-6) | Small icon buttons   |
| `icon-lg` | 32px (h-8) | Large icon buttons   |

## Dependencies

- `class-variance-authority` — CVA for variant/size class generation
- `react-aria-components` — ButtonPrimitive, LinkPrimitive base components
- `@/lib/utils` — `cn()` function for class merging

## Testing

**File**: `apps/web/src/components/ui/button.test.tsx`

9 tests covering:
- Text rendering (both Button and LinkButton)
- All 6 variants
- All 8 sizes
- className forwarding
- LinkButton href rendering
- Data attributes (data-slot, data-variant, data-size)

Note: `components/ui/` is excluded from the coverage config (`vitest.config.ts`), so no coverage percentage is reported for this file.

## Usage Examples

```tsx
// Primary action
<Button>Save</Button>

// Destructive with custom class
<Button variant="destructive" className="w-full">Delete</Button>

// Icon button with Lucide icon
<Button size="icon" aria-label="Settings">
  <Gear />
</Button>

// Navigation link styled as button
<LinkButton variant="outline" href="/reader/abc123">Open Book</LinkButton>

// LinkButton in dark toolbar
<LinkButton variant="ghost" size="sm" href="/settings">Settings</LinkButton>
```

## Architecture Decisions

1. **Two components** (Button + LinkButton) instead of one with polymorphic `as` prop — React Aria does not support the `asChild` pattern. Each uses its own React Aria primitive.
2. **CVA over Tailwind variants** — CVA provides type-safe variant configuration with autocomplete. All Tailwind classes are defined once in the CVA call.
3. **Data attributes** over class name sniffing — `data-variant` and `data-size` enable reliable CSS targeting for testing without depending on generated class names.
4. **No icon wrapper** — Icons render as direct children. Spacing and sizing handled via CSS selectors (`[&_svg]`).
