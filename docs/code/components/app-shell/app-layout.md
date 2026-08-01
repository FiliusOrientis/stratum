# AppLayout

**File**: `apps/web/src/components/app-shell/app-layout.tsx`

Top-level layout wrapper. Renders header (optional), main content, and the ThemeToggle (default top-right position).

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `header` | `ReactNode` | No | — | Content rendered in the top header bar |
| `children` | `ReactNode` | Yes | — | Main page content |

## Structure

```
<MotionConfig reducedMotion="user">
  <div class="flex h-dvh w-full flex-col bg-background text-foreground">
    {header && <header>...</header>}
    <main>{children}</main>
    <ThemeToggle />                          ← default top-right position
  </div>
</MotionConfig>
```

## Keyboard

- **`d`** — toggle dark/light theme (ignores input/textarea/select/contenteditable targets)

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
