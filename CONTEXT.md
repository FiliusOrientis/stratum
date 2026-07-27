# Stratum — Domain Model

Shared language between developers and AI. Use these terms — never synonyms.

## Subsystems

- **Flipbook Engine** — Three.js 3D book renderer (DearFlip adapter in `packages/3d-engine-vendor`)
- **AI Assistant** — Gemini-powered chat with streaming, text-to-speech
- **Storage** — IndexedDB (Dexie) for metadata + OPFS for binary PDFs
- **Worker** — Dedicated Web Worker (Comlink) for PDF parsing and text indexing

## Entities

| Term | Definition |
|------|------------|
| Book | A loaded PDF rendered as a 3D flipbook |
| Page | A single sheet within a Book (recto/verso sides) |
| Spread | A visible two-page layout when the book is open |
| Viewer | The 3D canvas container rendering the Book |
| Catalog | The user's collection of Books (local-first) |
| Annotation | Highlight, note, or drawing on a Page |
| Narration | AI-generated text-to-speech reading of a Page |
| Key Slot | One of 10 BYOK API key rotation slots for Gemini |

## State (Zustand stores)

- `viewerStore` — camera mode, zoom, current page, spread mode
- `toolbarStore` — active toolbars and their visibility
- `themeStore` — theme preferences (always dark, slate-blue accents)

## Workers

- **PDF Worker** — Comlink RPC. Parses PDF binary → text + metadata. Never raw `postMessage`.
- **Search Worker** — IndexedDB full-text search index maintenance.

## Data Flow

```
PDF drop → OPFS (raw bytes) → PDF Worker → Dexie (metadata) + OPFS (persist)
User search → IndexedDB FTS → results
AI chat → Gemini API (streaming via @ai-sdk/google) → UI stream
```
