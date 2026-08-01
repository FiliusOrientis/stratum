# Code Documentation Index

Every module in `apps/web/src/` is documented below. Each doc covers:

- **Purpose** — what the module does and why it exists
- **Exports** — every exported symbol with signature, parameters, return type
- **Dependencies** — internal and external imports
- **Architecture** — design decisions, trade-offs, alternatives considered
- **Usage** — code examples showing integration with other modules
- **Testing** — test locations, coverage expectations, edge cases

---

## Root Files

| File | Doc | Purpose |
|------|-----|---------|
| `main.tsx` | — | App entry point. Mounts React tree to DOM via `createRoot`. |
| `app.tsx` | — | Router configuration. `createBrowserRouter` with route definitions. |

## Routes

| File | Doc | Purpose |
|------|-----|---------|
| `catalog-page.tsx` | — | Catalog page: empty state + document import card |
| `reader-page.tsx` | — | Reader page with toolbar (flipbook placeholder) |

## Shared Components

| File | Doc | Purpose |
|------|-----|---------|
| `theme-toggle.tsx` | — | Dark/light toggle, 9-position placement (default top-right) |
| `stratum-wordmark.tsx` | — | Theme-aware Stratum wordmark (light/dark SVG swap) |
| `error-boundary.tsx` | — | Error boundary with reset buttons |

## Components

### UI Primitives (`components/ui/`)

ShadCN React Aria components. Read-only — never modify directly.

| File | Doc | Purpose |
|------|-----|---------|
| `button.tsx` | `components/ui/button.md` | Button + LinkButton with 6 variants, 8 sizes |
| `card.tsx` | — | Card container with header, content, footer |
| `input.tsx` | — | Text input with form integration |
| `label.tsx` | — | Form label component |
| `separator.tsx` | `components/ui/separator.md` | Visual divider with 4 variants (default/muted/soft/faint) |
| `skeleton.tsx` | — | Loading placeholder |
| `badge.tsx` | — | Status/category badge |
| `avatar.tsx` | — | User/book avatar |
| `dialog.tsx` | — | Modal dialog overlay |
| `sheet.tsx` | — | Slide-in panel (drawer) |
| `tooltip.tsx` | — | Tooltip with overlay arrow, placement options |
| `dropdown-menu.tsx` | — | Dropdown menu with items, separators, submenus |
| `field-error.tsx` | — | Inline form error message (`role="alert"`) |
| `input-group.tsx` | — | InputGroup composite (input + inline addons/buttons) |
| `kbd.tsx` | — | Keyboard key hint |
| `sonner.tsx` | — | Sonner toast provider + themed toaster |
| `textarea.tsx` | — | Multiline text input |

### Feature Components

| Component Directory | Files | Purpose |
|--------------------|-------|---------|
| `book-viewer/` | — | R3F flipbook scene (placeholder — not yet built) |
| `app-shell/` | | |
| `app-layout.tsx` | `components/app-shell/app-layout.md` | Top-level layout wrapper (MotionConfig, ThemeToggle, d-key shortcut) |
| `collapse-toggle.tsx` | — | Shared caret pill for edge-attached expand/collapse (URL panel toggle, toolbar trigger); vertical flip animation on toggle |
| `empty-state.tsx` | `components/app-shell/empty-state.md` | Empty catalog hero with import CTAs |
| `empty-state.types.ts` | — | `EmptyStateProps` interface |
| `document-import.tsx` | `components/app-shell/empty-state.md` | Import card organism (card + URL panel + toggle) |
| `url-import-panel.tsx` | — | URL input form molecule (InputGroup + FieldError + shake, autofocus on expand) |
| `drop-zone.tsx` | `components/app-shell/drop-zone.md` | Drag-and-drop PDF overlay with animation |
| `reader-toolbar/` | | |
| `reader-toolbar.tsx` | `components/app-shell/reader-toolbar.md` | Orchestrator — store connections, AnimatePresence |
| `reader-toolbar-controls.tsx` | — | Desktop (inline) and mobile (dropdown) layout |
| `reader-toolbar-button.tsx` | — | ToolbarButton: Button + Tooltip wrapper |
| `reader-toolbar-trigger.tsx` | — | Collapsed pill when toolbar is hidden |
| `page-navigation.tsx` | — | Prev/next/page-input molecule |
| `reader-toolbar.types.ts` | — | Types, animation math (`getAnimation`) |

## Stores (`stores/`)

| File | Doc | Purpose |
|------|-----|---------|
| `catalog.store.ts` | `stores/catalog-store.md` | Book list, sort/filter, import state |
| `viewer.store.ts` | `stores/viewer-store.md` | Current page, zoom, cover type, fullscreen |
| `toolbar.store.ts` | `stores/toolbar-store.md` | Edge-anchored position, hide/show, drawer visibility |
| `settings.store.ts` | `stores/settings-store.md` | Gemini keys, dialog state |

## Hooks (`hooks/`)

| File | Doc | Purpose |
|------|-----|---------|
| `use-file-import.ts` | — | File picker input → catalog import, input value reset |
| `use-keyboard-shortcut.ts` | — | Global keydown listener with input-target guard |
| `use-url-import.ts` | — | URL fetch, content-type validation, File conversion, paste/clear |

Tests co-located: `use-file-import.test.ts` (5), `use-url-import.test.ts` (9).

## Story Files

| File | Component | States |
|------|-----------|--------|
| `app-shell/document-import.stories.tsx` | DocumentImport | Closed, Cleared, Open, WithUrl, Loading, ErrorState |
| `app-shell/url-import-panel.stories.tsx` | UrlImportPanel | Collapsed, Open, WithUrl, Loading, ErrorState |
| `app-shell/empty-state.stories.tsx` | EmptyState | Initial, Cleared |
| `app-shell/drop-zone.stories.tsx` | DropZone | Default |
| `app-shell/reader-toolbar/reader-toolbar.stories.tsx` | ReaderToolbar | Default, BottomPosition |
| `app-shell/reader-toolbar/page-navigation.stories.tsx` | PageNavigation | FirstPage, LastPage, Interactive |
| `theme-toggle.stories.tsx` | ThemeToggle | Default (position: center, theme controls) |
| `error-boundary.stories.tsx` | ErrorBoundary | ErrorState, NormalState |

## Workers (`workers/`)

| File | Doc | Purpose |
|------|-----|---------|
| `index.ts` | — | Comlink placeholder (empty) |
| `pdf.worker.ts` | — | Comlink RPC: pdfjs-dist document loading (not yet built) |
| `search.worker.ts` | — | Comlink RPC: MiniSearch indexing (not yet built) |

## Lib (`lib/`)

| File | Doc | Purpose |
|------|-----|---------|
| `utils.ts` | `lib/utils.md` | `cn()` className merge utility |
| `animation.ts` | — | Animation constants: `easeOut`, `easeInOut`, `springPreset`, `toolbarAnimation` |
| `storage/db.ts` | `lib/storage/db.md` | Dexie schema (books, config tables) |
| `storage/opfs.ts` | `lib/storage/opfs.md` | OPFS binary PDF read/write/evict |
| `pdf-import/index.ts` | `lib/pdf-import/index.md` | PDF import pipeline (fingerprint + OPFS save) |

## Animation

Component interactions use **Motion** (`motion/react`) — AnimatePresence, spring physics, slide transitions. Shared constants in `lib/animation.ts` (`easeOut`, `easeInOut`, `springPreset`, `toolbarAnimation`). See `components/app-shell/reader-toolbar.md` for usage patterns. No JS animation library is used for the 3D flipbook (that uses R3F's native animation system).
