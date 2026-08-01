# Stratum — Domain Model

Shared language between developers and AI. Use these terms — never synonyms.

## Subsystems

- **Flipbook Engine** — @react-three/fiber (R3F) 3D book renderer. Single-page view only. No 2D/slider/reader modes.
- **3D Bookshelf** — R3F render of the user's book catalog. Books as 3D meshes with cover textures.
- **Projected Text Layer** — HTML overlay on top of the R3F canvas. Extracted pdfjs-dist text items positioned in screen-space, synced to the 3D page transform via `Vector3.project()`. Enables text selection, copying, and highlighting without interfering with canvas interaction.
- **AI Assistant** — Gemini-powered chat with streaming, text-to-speech.
- **Storage** — IndexedDB (Dexie) for structured metadata + OPFS for binary PDFs.
- **PDF Worker** — Dedicated Web Worker (Comlink) for pdfjs-dist document parsing, text extraction, and outline parsing.
- **Search Worker** — Dedicated Web Worker (Comlink) for MiniSearch full-text indexing and queries.

## Viewer Model (3D-Only)

- **Single Page View** — One page at a time, centered in the viewport. The only supported page mode.
- **Cover Types** — Four levels of 3D cover detail: `none` (all pages flat), `plain` (flat cover), `basic` (raised spine), `ridge` (ridged spine with depth).
- **Page Zoom** — Three modes: `fit` (page fills viewport height), `width` (page fills viewport width), `custom` (free zoom slider).
- **Page Turn** — LTR only. Bezier curve animation driven by vertex math extracted from DearFlip's `stratum-engine-legacy.js`.
- **Toolbar** — Edge-anchored bar movable between `top`, `bottom`, and `hidden`. Position persisted in toolbarStore.
- **Theme Toggle** — Sun/moon icon toggle. Positionable via `position` prop (9 named spots; default `top-right` in app shell). `d` key shortcut. Uses `next-themes` and class-based dark mode.

## Entities

| Term | Definition |
|------|------------|
| Book | A loaded PDF rendered as a single-page 3D flipbook |
| Page | A single sheet within a Book |
| Shelf | The 3D bookshelf view showing the user's Book collection |
| Viewer | The R3F <Canvas> and scene graph rendering the Book |
| Catalog | The user's collection of Books (local-first, stored in Dexie + OPFS) |
| Cover | The 3D hardcover mesh (type: none/plain/basic/ridge) |
| Page Turn | The Bezier-curve page-flip animation between consecutive pages |
| Projected Text Layer | Transparent HTML overlay mapping extracted PDF text to 3D page screen-space |
| Annotation | Highlight, note, or drawing on a Page (future) |
| Narration | AI-generated text-to-speech reading of a Page (future) |
| Key Slot | One of 10 BYOK API key rotation slots for Gemini |

## State (Zustand stores)

- `catalogStore` — book list, import state, sort/filter
- `viewerStore` — current page, page count, zoom mode and level, cover type, isFullscreen
- `toolbarStore` — position (top/bottom/hidden), active drawers
- `settingsStore` — BYOK Gemini keys, dialog open state

## Workers (Comlink RPC)

- **PDF Worker** (`pdf.worker.ts`) — Comlink RPC. Loads pdfjs-dist document, extracts metadata (title, page count, page labels), parses outline/TOC tree, renders page 1 thumbnail, extracts text content items with positions for the projected text layer.
- **Search Worker** (`search.worker.ts`) — Comlink RPC. Maintains MiniSearch full-text index. Tokenizes extracted page text. Handles keyword queries and ranked search results.

## Data Flow

```
PDF import → OPFS (binary bytes) → PDF Worker → thumbnail (Blob) + metadata + text items
                                                        ↓
                                                  Dexie (Book row)
                                                        ↓
Reader opens → Dexie (Book) → OPFS (PDF bytes) → PDF Worker → page textures → R3F mesh
                                                              → text items → Projected Text Layer
User search → Search Worker (MiniSearch) → ranked results → highlight matches
Settings → settingsStore (in-memory, no Dexie persistence)
```

## Responsiveness

Target viewports:
- **Desktop** (≥1024px): Full reader experience with drawers, edge-anchored toolbar, keyboard shortcuts
- **Tablet** (≥768px, <1024px): Adapted toolbar, touch gestures for page turn, collapsible drawers
- **Mobile** (<768px): Minimal chrome, swipe-only navigation, bottom-anchored toolbar, drawers as full-screen overlays

All three viewports must support the same core features: page turn, zoom, toolbar, TOC, text selection.
