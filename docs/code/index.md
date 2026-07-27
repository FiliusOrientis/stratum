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
| `routes/catalog-page.tsx` | — | Catalog (3D bookshelf) route at `/` |
| `routes/reader-page.tsx` | — | Reader (flipbook) route at `/reader/:bookId` |

## Components

### UI Primitives (`components/ui/`)

ShadCN React Aria components. Read-only — never modify directly.

| File | Doc | Purpose |
|------|-----|---------|
| `button.tsx` | `components/ui/button.md` | Button + LinkButton with 6 variants, 8 sizes |
| `card.tsx` | — | Card container with header, content, footer |
| `input.tsx` | — | Text input with form integration |
| `label.tsx` | — | Form label component |
| `separator.tsx` | — | Visual separator line |
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
| `app-shell/` | — | Layout, toolbar, drawers, settings dialog |
| `import/` | — | Import button, drop zone, URL dialog |

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
