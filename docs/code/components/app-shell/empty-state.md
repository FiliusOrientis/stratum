# EmptyState

**File**: `apps/web/src/components/app-shell/empty-state.tsx`
**Types**: `apps/web/src/components/app-shell/empty-state.types.ts`
**Sub-component**: `apps/web/src/components/app-shell/document-import.tsx` — merged card + toggleable URL import form as one visual unit

Full-page empty state shown when the catalog has no books. Features a clickable import card with integrated URL import toggle.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'initial' \| 'cleared'` | `'initial'` | Controls card copy |
| `onImport` | `() => void` | — | Fired when the import card is clicked (opens file picker) |
| `onUrlImport` | `(file: File) => void` | — | Fired when a PDF is successfully fetched from a URL |

## Variants

- **initial**: First-time user. Stratum wordmark, card "Open a document".
- **cleared**: After removing all books. Stratum wordmark, card "Import another document".

## Layout

```
  [Stratum wordmark]             ← dual light/dark SVG swap

┌────────────────────────────────────┐
│ 📖  Open a document               │  ← card, rounded-lg, border-border/50
│     Drop a PDF or click here to browse │
└────────────────────────────────────┘

             ⌄ Import from URL        ← standalone centered toggle

Toggle open:

┌────────────────────────────────────┐
│ 📖  Open a document               │  ← rounded-t-lg (sharp bottom)
└────────────────────────────────────┘
┌────────────────────────────────────┐
│ https:// │ Paste a PDF link  │📋/→│  ← URL panel, rounded-b-lg (sharp top)
│   e.g. example.com/document.pdf   │
└────────────────────────────────────┘

             ▲ Hide URL input          ← toggle changes icon + label
```

Container fits content width, centered via `mx-auto`. No fixed max-width — no viewport-driven resizing. Padding: `px-6` → `md:px-10` → `lg:px-16`. Keyboard shortcut hints live in the `KeyboardShortcuts` panel at the page bottom (see `keyboard-shortcuts.md`).

## Animation

Staggered entrance using `motion/react` variants:
- Container orchestrates with `staggerChildren: 0.05` (50ms between children)
- Each child: `opacity: 0 → 1`, `y: 8 → 0`, `scale: 0.98 → 1`, 280ms, `easeOut` curve
- URL input section: height + opacity animation on toggle (250ms, `easeOut`)

## Keyboard Shortcut

Listens for `Ctrl+O` (or `Cmd+O` on Mac) via a `keydown` event listener. Calls `onImport` when triggered. Visible hints (open file, theme toggle) live in the `KeyboardShortcuts` panel at the page bottom.

## URL Import

Implemented via `DocumentImport` sub-component (`document-import.tsx`). The URL input is hidden by default and revealed by clicking the standalone centered toggle below the card.

**Toggle** — standalone button outside both card and URL panel (aria-label `Import from URL` / `Hide URL input`):
- Closed: `CaretDownIcon`, `bg-card`, `rounded-t-none` (sharp top)
- Open: `CaretUpIcon`, `bg-card`, `rounded-t-none rounded-b` (attached below URL panel)

**Panel animation** (conditional `motion.div animate`):
- Closed: `height: 0, opacity: 0`
- Open: `height: 'auto', opacity: 1`
- 250ms, `easeOut` curve. Input value preserved across open/close.
- Input autofocuses on expand (`useEffect` + ref on `InputGroupInput`).

**Card rounding**: `rounded-lg` when closed, `rounded-t-lg` when open (sharp bottom connects to URL panel).

**URL panel rounding**: `rounded-b-lg` always (sharp top connects to card). Both use `border border-border/50`.

**Button states** (inlined into `UrlImportPanel` sub-component):
1. **Empty**: clipboard paste button (📋) shown.
2. **Has content (idle)**: submit arrow (→) shown.
3. **Loading**: spinning icon (⏳), button disabled.
4. **Error**: clear button (✕) and error message shown.

Fetch flow unchanged: fetch URL, validate content-type, convert blob to `File`, call `onUrlImport`. Error triggers shake animation via `useAnimate`.

Button swap logic:
- `!urlError && !urlValue.trim()` → paste button
- `urlError || urlValue.trim()` → action button:
  - `urlError` → clear (✕) button
  - `isLoading` → spinner (⏳) button, disabled
  - else → submit arrow (→) button

## Accessibility

- Container: `role="region"` with `aria-label="Empty catalog"`
- Import button: native `<button>` element with `aria-label`
- URL input: `<Label htmlFor="url-input" className="sr-only">` association, `aria-invalid` set when error present, `aria-describedby` linking to FieldError
- Error messages: `FieldError` with `role="alert"` for screen reader announcement
- Clipboard paste button: `aria-label="Paste URL from clipboard"`

## Usage

```tsx
import { EmptyState } from '@/components/app-shell'

<EmptyState
  onImport={() => fileInputRef.current?.click()}
  onUrlImport={handleFile}
/>

<EmptyState
  variant="cleared"
  onImport={() => fileInputRef.current?.click()}
  onUrlImport={handleFile}
/>
```

## Dependencies

- `@phosphor-icons/react` — BooksIcon (via DocumentImport)
- `motion/react` — `motion` for staggered entrance animation
- `@/lib/animation` — `easeOut` constant
- `@/components/stratum-wordmark` — `StratumWordmark` (theme-aware logo, replaces the heading text)
- `@/components/app-shell/document-import` — `DocumentImport` (merged card + URL input)
