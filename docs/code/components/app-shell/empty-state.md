# EmptyState

**File**: `apps/web/src/components/app-shell/empty-state.tsx`
**Types**: `apps/web/src/components/app-shell/empty-state.types.ts`
**Sub-components**: `document-import.tsx` (import card + URL toggle) and `url-import-panel.tsx` (URL input form)

Full-page empty state shown when the catalog has no books. Features a clickable import card with integrated URL import toggle.

## Props

| Prop          | Type                   | Default | Description                                               |
|---------------|------------------------|---------|-----------------------------------------------------------|
| `onImport`    | `() => void`           | —       | Fired when the import card is clicked (opens file picker) |
| `onUrlImport` | `(file: File) => void` | —       | Fired when a PDF is successfully fetched from a URL       |

## Styling

- Container fits content width, centered via `mx-auto` (`w-fit max-w-full`)
- Padding scales: `px-4` → `md:px-10` → `lg:px-16`
- Vertical rhythm: `gap-8` between wordmark, import card, and any trailing content
- Keyboard shortcut hints live behind a `?` FAB toggle at the page bottom-left (see `keyboard-shortcuts-fab.md`)

## Animation

Staggered entrance using `motion/react` variants:
- Container orchestrates with `staggerChildren: 0.05` (50ms between children)
- Each child uses the shared `fadeUp` variant from `@/lib/animation` (`opacity: 0 → 1`, `y: 8 → 0`, `scale: 0.98 → 1`, 280ms, `easeOut`)
- URL input section: height + opacity animation on toggle (250ms, `easeOut`)

## Keyboard Shortcut

Listens for `Ctrl+O` (or `Cmd+O` on Mac) via the `useKeyboardShortcut` hook. Calls `onImport` when triggered. Visible hints (open file, theme toggle) live behind the `KeyboardShortcutsFab` `?` FAB at the page bottom-left.

## Import Card (`DocumentImport`)

`document-import.tsx` renders the card and the URL toggle as one `ButtonGroup` (no visual gap between them):

- **Card button** — `variant="outline"`, `aria-label="Open or drop a PDF file"`. Left-aligned icon (`Library`, `size-11`) + heading "Open a document" + subtext "Drop a PDF or click here to browse". `rounded-lg` when closed, `rounded-b-none border-b-0` when open (sharp bottom connects to the URL panel).
- **Toggle button** — `w-12 shrink-0`, `aria-label` `Import from URL` / `Hide URL input`, `aria-expanded` reflects state, tooltip matches the label. Caret icon is a `motion.create(ChevronDown)` that flips via `scaleY` (150ms, `easeInOut`).
- **State** — `isUrlOpen` local state; the URL form logic (value, error, loading, submit, paste, clear) comes from the `useUrlImport` hook and is passed to `UrlImportPanel`.

## URL Import (`UrlImportPanel`)

`url-import-panel.tsx` is the form molecule. It is presentational — all state and handlers arrive via props (`scope`, `urlValue`, `urlError`, `isLoading`, `handleUrlSubmit`, `handlePaste`, `handleClear`, `setUrlValue`, `isUrlOpen`).

**Panel animation** (conditional `motion.div animate`):
- Closed: `height: 0, opacity: 0`
- Open: `height: 'auto', opacity: 1`
- 250ms, `easeOut` curve. Input value preserved across open/close.
- Input autofocuses on expand (`useEffect` + ref on `InputGroupInput`).

**Panel styling**: `rounded-b-lg border border-border bg-card/50` (sharp top connects to the card). Contains a form with sr-only `Label`, `InputGroup` (`https://` `InputGroupText` addon inline-start, action button addon inline-end), a hint line, and `FieldError`.

**Action button states** (inline-end addon):
1. **Empty, no error**: clipboard paste button (`Clipboard`, `aria-label="Paste URL from clipboard"`).
2. **Has content (idle)**: submit button (`ArrowRight`, `aria-label="Submit URL"`).
3. **Loading**: spinner (`Loader2` with `animate-spin`), button disabled.
4. **Error**: clear button (`X`, `aria-label="Clear input"`, type `button`) — error message rendered below via `FieldError`.

Fetch flow (in `useUrlImport`): fetch URL, validate content-type, convert blob to `File`, call `onUrlImport`. Error triggers shake animation via `useAnimate`.

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
```

## Dependencies

- `lucide-react` — BookOpen (via DocumentImport)
- `motion/react` — `motion` for staggered entrance animation
- `@/lib/animation` — `fadeUp` entrance variant
- `@/hooks/use-keyboard-shortcut` — `Ctrl+O` shortcut
- `@/components/shared` — `StratumWordmark` (theme-aware logo, replaces the heading text)
- `@/components/ui/button-group` — `ButtonGroup` (card + toggle as one unit)
- `@/components/ui/tooltip` — toggle tooltip
- `@/components/app-shell/document-import` — `DocumentImport` (card + toggle)
- `@/components/app-shell/url-import-panel` — `UrlImportPanel` (URL form)
- `@/hooks/use-url-import` — URL fetch state machine
