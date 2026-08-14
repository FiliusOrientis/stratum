# PDF Worker

**Directory**: `apps/web/src/workers/`

Comlink RPC worker that parses PDFs with pdfjs-dist on a background thread, so the main thread never blocks on parsing.

## Files

| File | Purpose |
|------|---------|
| `pdf.types.ts` | Shared `PdfParseResult` contract |
| `pdf.worker.ts` | Comlink entry — `parsePdf(file)` |
| `pdf.import.ts` | Main-thread typed proxy client (lazy singleton) |

## Exports

### `parsePdf(file: File): Promise<PdfParseResult>`

Parses a PDF file in the worker.

| Property | Type | Description |
|----------|------|-------------|
| `title` | `string?` | Title from the PDF metadata (`/Title`), trimmed; `undefined` when absent |
| `author` | `string?` | Author from the PDF metadata (`/Author`), trimmed; `undefined` when absent |
| `pageCount` | `number` | Total pages in the document |
| `thumbnailBlob` | `Blob?` | Page-1 thumbnail rendered at 0.5 scale; `undefined` when `OffscreenCanvas` is unavailable |

**Side effects**: `task.destroy()` runs after parsing, in `finally`.

The filename fallback for the title lives in the caller (`use-file-import` applies `parsed.title ?? filename-title`).

## Client (`pdf.import.ts`)

```ts
import { getPdfParser } from '@/workers/pdf.import'

const parsed = await getPdfParser().parsePdf(file)
```

`getPdfParser()` creates the `Worker` once and reuses it (lazy singleton). The worker module is bundled by Vite via `new URL('./pdf.worker.ts', import.meta.url)`.

## Worker setup

- pdfjs worker: `GlobalWorkerOptions.workerSrc = workerUrl` where `workerUrl` is `pdfjs-dist/build/pdf.worker.mjs?url` (Vite asset)
- Thumbnail: `OffscreenCanvas` + 2d context → `page.render({ canvas: null, canvasContext, viewport })` → `canvas.convertToBlob()`
- No `postMessage` anywhere — Comlink only

## Testing

**File**: `workers/pdf.worker.test.ts` — 6 tests, pdfjs-dist mocked:
- Metadata mapping (title/author), missing-metadata fallback, whitespace trimming
- Thumbnail guard: no `OffscreenCanvas` → no thumbnail, render not called
- Thumbnail render path with a stubbed `OffscreenCanvas`
- `task.destroy()` after parsing

## Dependencies

- `comlink` — RPC
- `pdfjs-dist` — parsing + rendering
