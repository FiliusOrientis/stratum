# AppLayout

**File**: `apps/web/src/components/app-shell/app-layout.tsx`

Top-level layout wrapper. Renders header (optional), main content, and SettingsDialog.

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
  <SettingsDialog />
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

## Dependencies

- `@/stores` — settingsStore for SettingsDialog
- `@/components/app-shell/settings-dialog` — always-mounted settings modal

## Responsive

Uses `h-dvh` (dynamic viewport height) to handle mobile browser chrome.
