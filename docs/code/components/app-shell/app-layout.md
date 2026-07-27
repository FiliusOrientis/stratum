# AppLayout

**File**: `apps/web/src/components/app-shell/app-layout.tsx`

Top-level layout wrapper. Renders header (optional) and main content.

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `header` | `ReactNode` | No | — | Content rendered in the top header bar |
| `children` | `ReactNode` | Yes | — | Main page content |

## Structure

```
<div class="flex h-dvh w-full flex-col bg-background text-foreground">
  {header && <header>...</header>}
  <main class="flex-1 overflow-hidden">{children}</main>
</div>
```

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
