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
| `main.tsx` | `routes/` | App entry point. Mounts React tree to DOM via `createRoot`. |
| `app.tsx` | `routes/` | Router configuration. `createBrowserRouter` with route definitions. |

## Routes

| File | Doc | Purpose |
|------|-----|---------|
| `routes/catalog-page.tsx` | `routes/catalog-page.md` | Catalog page with import button |
| `routes/reader-page.tsx` | `routes/reader-page.md` | Reader page with toolbar + flipbook |

## Components

### UI Primitives (`components/ui/`)

ShadCN React Aria components. Read-only — never modify directly.

| File | Doc | Purpose |
|------|-----|---------|
| `button.tsx` | `components/ui/button.md` | Button + LinkButton with 6 variants, 8 sizes |
| `card.tsx` | — | Card container with header, content, footer |
| `input.tsx` | — | Text input with form integration |
| `label.tsx` | — | Form label component |
| `separator.tsx` | `components/ui/separator.md` | Visual divider using border rendering |
| `skeleton.tsx` | — | Loading placeholder |
| `badge.tsx` | — | Status/category badge |
| `avatar.tsx` | — | User/book avatar |
| `dialog.tsx` | — | Modal dialog overlay |
| `sheet.tsx` | — | Slide-in panel (drawer) |

### Feature Components

| Component Directory | Files | Purpose |
|--------------------|-------|---------|
| `book-viewer/` | — | R3F flipbook scene: page mesh, cover, turn animation |
| `book-shelf/` | — | R3F 3D bookshelf catalog scene |
| `app-shell/` | | |
| `app-layout.tsx` | `components/app-shell/app-layout.md` | Top-level layout wrapper |
| `reader-toolbar/` | | |
| `reader-toolbar.tsx` | `components/app-shell/reader-toolbar.md` | Orchestrator — store connections, AnimatePresence |
| `reader-toolbar-button.tsx` | — | ToolbarButton: Button + Tooltip wrapper |
| `reader-toolbar-trigger.tsx` | — | Collapsed pill when toolbar is hidden |
| `reader-toolbar-controls.tsx` | — | Full button row (nav, zoom, tools, position) |
| `reader-toolbar.types.ts` | — | Types, animation math (`getAnimation`) |

## Stores (`stores/`)

| File | Doc | Purpose |
|------|-----|---------|
| `catalog.store.ts` | — | Book list, sort/filter, import state |
| `viewer.store.ts` | — | Current page, zoom, cover type, fullscreen |
| `toolbar.store.ts` | — | Edge-anchored position (top/bottom/hidden) |
| `settings.store.ts` | — | BYOK keys, reading prefs, theme |

## Workers (`workers/`)

| File | Doc | Purpose |
|------|-----|---------|
| `pdf.worker.ts` | — | Comlink RPC: pdfjs-dist document loading, text extraction, outline parsing |
| `search.worker.ts` | — | Comlink RPC: MiniSearch full-text indexing and queries |

## Lib (`lib/`)

| File | Doc | Purpose |
|------|-----|---------|
| `utils.ts` | — | `cn()` className merge utility |
| `storage/db.ts` | — | Dexie schema (books, config tables) |
| `storage/opfs.ts` | — | OPFS binary PDF read/write/evict |
| `math/page-bend.ts` | — | Bezier curve math extracted from DearFlip for page-turn animation |
| `pdf-import/index.ts` | `lib/pdf-import/index.md` | PDF import pipeline (fingerprint + OPFS save) |

## Animation

Component interactions use **Motion** (`motion/react`) — AnimatePresence, spring physics, slide transitions. See `components/app-shell/reader-toolbar.md` for usage patterns. No JS animation library is used for the 3D flipbook (that uses R3F's native animation system).
