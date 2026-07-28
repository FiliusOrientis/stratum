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
| `catalog-page.tsx` | — | Catalog page with import button (placeholder) |
| `reader-page.tsx` | — | Reader page with toolbar (flipbook placeholder) |

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

### Feature Components

| Component Directory | Files | Purpose |
|--------------------|-------|---------|
| `book-viewer/` | — | R3F flipbook scene (placeholder — not yet built) |
| `app-shell/` | | |
| `app-layout.tsx` | `components/app-shell/app-layout.md` | Top-level layout wrapper |
| `reader-toolbar/` | | |
| `reader-toolbar.tsx` | `components/app-shell/reader-toolbar.md` | Orchestrator — store connections, AnimatePresence |
| `reader-toolbar-button.tsx` | — | ToolbarButton: Button + Tooltip wrapper |
| `reader-toolbar-trigger.tsx` | — | Collapsed pill when toolbar is hidden |
| `reader-toolbar-controls.tsx` | — | Button row — desktop (inline) and mobile (left/center/right) layouts |
| `reader-toolbar.types.ts` | — | Types, animation math (`getAnimation`) |

## Stores (`stores/`)

| File | Doc | Purpose |
|------|-----|---------|
| `catalog.store.ts` | `stores/catalog-store.md` | Book list, sort/filter, import state |
| `viewer.store.ts` | `stores/viewer-store.md` | Current page, zoom, cover type, fullscreen |
| `toolbar.store.ts` | `stores/toolbar-store.md` | Edge-anchored position, hide/show, drawer visibility |
| `settings.store.ts` | `stores/settings-store.md` | Gemini keys, dialog state |

## Workers (`workers/`)

| File | Doc | Purpose |
|------|-----|---------|
| `pdf.worker.ts` | — | Comlink RPC: pdfjs-dist document loading (not yet built) |
| `search.worker.ts` | — | Comlink RPC: MiniSearch indexing (not yet built) |

## Lib (`lib/`)

| File | Doc | Purpose |
|------|-----|---------|
| `utils.ts` | `lib/utils.md` | `cn()` className merge utility |
| `storage/db.ts` | `lib/storage/db.md` | Dexie schema (books, config tables) |
| `storage/opfs.ts` | `lib/storage/opfs.md` | OPFS binary PDF read/write/evict |
| `pdf-import/index.ts` | `lib/pdf-import/index.md` | PDF import pipeline (fingerprint + OPFS save) |

## Animation

Component interactions use **Motion** (`motion/react`) — AnimatePresence, spring physics, slide transitions. See `components/app-shell/reader-toolbar.md` for usage patterns. No JS animation library is used for the 3D flipbook (that uses R3F's native animation system).
