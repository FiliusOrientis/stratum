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

| File       | Doc | Purpose                                                                    |
|------------|-----|----------------------------------------------------------------------------|
| `main.tsx` | —   | App entry point. Mounts React tree via `createRoot` inside `<StrictMode>`. |
| `app.tsx`  | —   | Router configuration. `createBrowserRouter` with route definitions.        |

## Routes

| File               | Doc | Purpose                                                               |
|--------------------|-----|-----------------------------------------------------------------------|
| `catalog-page.tsx` | —   | Catalog page: empty state + document import card + import error toast |
| `reader-page.tsx`  | —   | Reader page with toolbar (flipbook placeholder)                       |

## Shared Components (`components/shared/`)

| File                   | Doc                        | Purpose                                                                                                             |
|------------------------|----------------------------|---------------------------------------------------------------------------------------------------------------------|
| `theme-toggle.tsx`     | —                          | Dark/light toggle FAB, 9-position placement (default top-right); Sun↔MoonStar morph via `MorphIcon`; composes `Fab` |
| `fab.tsx`              | `components/shared/fab.md` | Generic FAB — ghost icon button + 9-position placement                                                              |
| `stratum-wordmark.tsx` | —                          | Theme-aware Stratum wordmark (light/dark SVG swap)                                                                  |
| `error-boundary.tsx`   | —                          | Error boundary with reset buttons; reset remounts children via key                                                  |

## Components

### UI Primitives (`components/ui/`)

ShadCN React Aria components. Read-only — never modify directly.

| File                | Doc                          | Purpose                                                                          |
|---------------------|------------------------------|----------------------------------------------------------------------------------|
| `button.tsx`        | `components/ui/button.md`    | Button + LinkButton with 6 variants, 8 sizes                                     |
| `card.tsx`          | —                            | Card container with header, content, footer                                      |
| `input.tsx`         | —                            | Text input with form integration                                                 |
| `label.tsx`         | —                            | Form label component                                                             |
| `separator.tsx`     | `components/ui/separator.md` | Visual divider with 4 variants (default/muted/soft/faint)                        |
| `skeleton.tsx`      | —                            | Loading placeholder                                                              |
| `badge.tsx`         | —                            | Status/category badge                                                            |
| `avatar.tsx`        | —                            | User/book avatar                                                                 |
| `dialog.tsx`        | —                            | Modal dialog overlay                                                             |
| `sheet.tsx`         | —                            | Slide-in panel (drawer)                                                          |
| `tooltip.tsx`       | —                            | Tooltip with overlay arrow, placement options                                    |
| `dropdown-menu.tsx` | —                            | Dropdown menu with items, separators, submenus                                   |
| `field-error.tsx`   | —                            | Inline form error message (`role="alert"`) — custom, not registry                |
| `input-group.tsx`   | —                            | InputGroup composite (input + inline addons/buttons) — custom on top of registry |
| `kbd.tsx`           | —                            | Keyboard key hint — custom on top of registry                                    |
| `sonner.tsx`        | —                            | Sonner toast provider + themed toaster                                           |
| `textarea.tsx`      | —                            | Multiline text input                                                             |

### Feature Components

| Component Directory           | Files                                            | Purpose                                                                                                                                        |
|-------------------------------|--------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| `app-shell/`                  |                                                  |                                                                                                                                                |
| `app-layout.tsx`              | `components/app-shell/app-layout.md`             | Top-level layout wrapper (MotionConfig, ThemeToggle, d-key shortcut via `resolvedTheme`)                                                       |
| `collapse-toggle.tsx`         | —                                                | Shared caret pill for edge-attached expand/collapse (toolbar trigger); vertical flip animation on toggle                                       |
| `empty-state.tsx`             | `components/app-shell/empty-state.md`            | Empty catalog hero with import CTAs                                                                                                            |
| `empty-state.types.ts`        | —                                                | `EmptyStateProps` interface                                                                                                                    |
| `keyboard-hint.tsx`           | `components/app-shell/keyboard-hint.md`          | Presentational "Press [keys] to ..." row (Kbd keycaps)                                                                                         |
| `keyboard-shortcuts.tsx`      | `components/app-shell/keyboard-shortcuts.md`     | Hint card — stacked rows, fadeUp in/out variants                                                                                               |
| `keyboard-shortcuts-fab.tsx`  | `components/app-shell/keyboard-shortcuts-fab.md` | "?" ghost FAB toggling the shortcuts panel; exports `DEFAULT_SHORTCUTS`                                                                        |
| `document-import.tsx`         | `components/app-shell/empty-state.md`            | Import card organism (card + URL panel + toggle)                                                                                               |
| `url-import-panel.tsx`        | —                                                | URL input form molecule (InputGroup + FieldError + shake, autofocus on expand; `UrlActionButton` sub-component picks clear/submit/paste state) |
| `url-import-panel.types.ts`   | —                                                | `UrlImportPanelProps` interface                                                                                                                |
| `drop-zone.tsx`               | `components/app-shell/drop-zone.md`              | Drag-and-drop PDF overlay with animation                                                                                                       |
| `reader-toolbar/`             |                                                  |                                                                                                                                                |
| `reader-toolbar.tsx`          | `components/app-shell/reader-toolbar.md`         | Orchestrator — store connections, AnimatePresence                                                                                              |
| `reader-toolbar-controls.tsx` | —                                                | Desktop (inline) and mobile (dropdown) layout                                                                                                  |
| `reader-toolbar-button.tsx`   | —                                                | ToolbarButton: Button + Tooltip wrapper                                                                                                        |
| `reader-toolbar-trigger.tsx`  | —                                                | Collapsed pill when toolbar is hidden                                                                                                          |
| `page-navigation.tsx`         | —                                                | Prev/next/page-input molecule (draft state, commit on blur/Enter)                                                                              |
| `reader-toolbar.types.ts`     | —                                                | `ToolbarButtonProps` type                                                                                                                      |
| `reader-toolbar.helpers.ts`   | —                                                | `ToolbarAnimation` type + `getAnimation` math                                                                                                  |

## Stores (`stores/`)

| File                | Doc                        | Purpose                                              |
|---------------------|----------------------------|------------------------------------------------------|
| `catalog.store.ts`  | `stores/catalog-store.md`  | Book list (upsert by id), import error               |
| `viewer.store.ts`   | `stores/viewer-store.md`   | Current page (clamped), zoom, cover type, fullscreen |
| `toolbar.store.ts`  | `stores/toolbar-store.md`  | Edge-anchored position, hide/show, drawer visibility |
| `settings.store.ts` | `stores/settings-store.md` | Gemini keys (slot bounds-checked), dialog state      |

## Hooks (`hooks/`)

| File                       | Doc | Purpose                                                                                                                                               |
|----------------------------|-----|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| `use-file-import.ts`       | —   | File picker input → type guard → single byte read → OPFS save + worker parse (transfer); rolls back OPFS on parse failure; ignores concurrent imports |
| `use-keyboard-shortcut.ts` | —   | Global keydown listener with editable-target guard and modifier matching (`requiresModifier`)                                                         |
| `use-url-import.ts`        | —   | URL fetch with abort + 30s timeout + 100 MB cap, content-type allowlist, filename percent-decoding, paste/clear                                       |

Tests co-located: `use-file-import.test.ts` (11), `use-url-import.test.ts` (11), `use-keyboard-shortcut.test.ts` (5).

## Fixture Files

| File                                                   | Component            | States                                        |
|--------------------------------------------------------|----------------------|-----------------------------------------------|
| `shared/fab.fixture.tsx`                               | Fab                  | Default, Expanded, Positioned                 |
| `shared/error-boundary.fixture.tsx`                    | ErrorBoundary        | ErrorState, NormalState                       |
| `shared/theme-toggle.fixture.tsx`                      | ThemeToggle          | Default (position: center, dark theme)        |
| `shared/stratum-wordmark.fixture.tsx`                  | StratumWordmark      | Default                                       |
| `app-shell/app-layout.fixture.tsx`                     | AppLayout            | Default, WithHeader                           |
| `app-shell/document-import.fixture.tsx`                | DocumentImport       | Closed (interactions covered by unit tests)   |
| `app-shell/url-import-panel.fixture.tsx`               | UrlImportPanel       | Collapsed, Open, WithUrl, Loading, ErrorState |
| `app-shell/empty-state.fixture.tsx`                    | EmptyState           | Initial                                       |
| `app-shell/drop-zone.fixture.tsx`                      | DropZone             | Default                                       |
| `app-shell/reader-toolbar/reader-toolbar.fixture.tsx`  | ReaderToolbar        | Default, BottomPosition                       |
| `app-shell/reader-toolbar/page-navigation.fixture.tsx` | PageNavigation       | FirstPage, LastPage, Interactive              |
| `app-shell/collapse-toggle.fixture.tsx`                | CollapseToggle       | TopClosed, TopOpen, BottomClosed              |
| `app-shell/keyboard-hint.fixture.tsx`                  | KeyboardHint         | OpenFile, ToggleTheme                         |
| `app-shell/keyboard-shortcuts.fixture.tsx`             | KeyboardShortcuts    | Default                                       |
| `app-shell/keyboard-shortcuts-fab.fixture.tsx`         | KeyboardShortcutsFab | Default                                       |

## Workers (`workers/`)

| File               | Doc                     | Purpose                                                                                            |
|--------------------|-------------------------|----------------------------------------------------------------------------------------------------|
| `pdf.types.ts`     | —                       | Shared `PdfParseResult` contract                                                                   |
| `pdf.worker.ts`    | `workers/pdf-worker.md` | Comlink entry: `parsePdf(data: Uint8Array)` — metadata, page count, page-1 thumbnail (best-effort) |
| `pdf.import.ts`    | —                       | Main-thread typed proxy client (lazy singleton; resets on failure)                                 |
| `search.worker.ts` | —                       | Comlink RPC: MiniSearch indexing (planned — deps not installed)                                    |

## Lib (`lib/`)

| File               | Doc                   | Purpose                                                                                                |
|--------------------|-----------------------|--------------------------------------------------------------------------------------------------------|
| `utils.ts`         | `lib/utils.md`        | `cn()` className merge + `isNonEmptyString` type guard                                                 |
| `animation.ts`     | —                     | Animation constants: `easeOut`, `easeInOut`, `springPreset`, `toolbarAnimation` (px offsets), `fadeUp` |
| `storage/types.ts` | —                     | `BookEntity` interface (id doubles as OPFS filename)                                                   |
| `storage/opfs.ts`  | `lib/storage/opfs.md` | OPFS binary PDF save (`savePdf`) + delete (`deletePdf`)                                                |
| `pdf-import.ts`    | `lib/pdf-import.md`   | PDF import pipeline (fingerprint + OPFS save)                                                          |

## Animation

Component interactions use **Motion** (`motion/react`) — AnimatePresence, spring physics, slide transitions. Shared constants in `lib/animation.ts` (`easeOut`, `easeInOut`, `springPreset`, `toolbarAnimation`). See `components/app-shell/reader-toolbar.md` for usage patterns. No JS animation library is used for the 3D flipbook (that uses R3F's native animation system).
