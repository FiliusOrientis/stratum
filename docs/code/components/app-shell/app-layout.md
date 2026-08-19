# AppLayout

**File**: `apps/web/src/components/app-shell/app-layout.tsx`

Top-level layout wrapper. Renders header (optional), main content, and the ThemeToggle (default top-right position).

## Props

| Prop       | Type        | Required | Default | Description                            |
|------------|-------------|----------|---------|----------------------------------------|
| `header`   | `ReactNode` | No       | —       | Content rendered in the top header bar |
| `children` | `ReactNode` | Yes      | —       | Main page content                      |

## Structure

- Wraps the tree in `MotionConfig reducedMotion="user"` (app-wide motion preference)
- Root div: `flex h-dvh w-full flex-col bg-background text-foreground`
- Optional `header` bar renders first; `children` render inside `main` (relative, flex-1)
- `ThemeToggle` renders with default `top-right` position

## Keyboard

- **`d`** — toggle dark/light theme (ignores `input` and `textarea` targets)

## Usage

```tsx
// Catalog page (with header)
<AppLayout header={<span>Stratum</span>}>
  <CatalogContent />
</AppLayout>

// Reader page (no header, immersive)
<AppLayout>
  <FlipbookContent />
  <ReaderToolbar />
</AppLayout>
```

## Responsive

Uses `h-dvh` (dynamic viewport height) to handle mobile browser chrome.
