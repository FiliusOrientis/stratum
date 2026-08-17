# PDF Worker

**Directory**: `apps/web/src/workers/`

Comlink RPC worker that parses PDFs with pdfjs-dist on a background thread, so the main thread never blocks on parsing.

## Files

| File            | Purpose                                                       |
|-----------------|---------------------------------------------------------------|
| `pdf.types.ts`  | Shared `PdfParseResult` contract                              |
| `pdf.worker.ts` | Comlink entry — `parsePdf(data)`                              |
| `pdf.import.ts` | Main-thread typed proxy client (lazy singleton, self-healing) |

## Exports

### `parsePdf(data: Uint8Array): Promise<PdfParseResult>`

Parses PDF bytes in the worker. The main thread passes a `Uint8Array` view over a **transferred** `ArrayBuffer` (Comlink transfer list), so the bytes are not cloned.

| Property        | Type      | Description                                                                                                                                              |
|-----------------|-----------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `title`         | `string?` | Title from the PDF metadata (`/Title`), trimmed; `undefined` when absent                                                                                 |
| `author`        | `string?` | Author from the PDF metadata (`/Author`), trimmed; `undefined` when absent                                                                               |
| `pageCount`     | `number`  | Total pages in the document                                                                                                                              |
| `thumbnailBlob` | `Blob?`   | Page-1 thumbnail rendered at 0.5 scale; `undefined` when `OffscreenCanvas` is unavailable **or the page render fails** (best-effort — metadata survives) |

**Resource handling**: `task.destroy()` runs in `finally`, including when the document load rejects.

The filename fallback for the title lives in the caller (`use-file-import` applies `parsed.title ?? filename-title`).

## Client (`pdf.import.ts`)

```ts
import { getPdfParser } from '@/workers/pdf.import'

const bytes = await file.arrayBuffer()
const parsed = await getPdfParser().parsePdf(new Uint8Array(bytes), [bytes])
```

`getPdfParser()` creates the `Worker` once and reuses it (lazy singleton). When a call rejects, the proxy resets the singleton and terminates the worker, so the next call spawns a fresh one — a crashed worker cannot poison later imports.

## Worker setup

- pdfjs worker: `GlobalWorkerOptions.workerSrc = workerUrl` where `workerUrl` is `pdfjs-dist/build/pdf.worker.mjs?url` (Vite asset)
- Thumbnail: `OffscreenCanvas` + 2d context → `page.render({ canvas: null, canvasContext, viewport })` → `canvas.convertToBlob()`
- `canvasContext` uses a single intersection assertion (`OffscreenCanvasRenderingContext2D & CanvasRenderingContext2D`) with a `SAFETY:` comment because pdfjs types only accept `CanvasRenderingContext2D`; the OffscreenCanvas context is compatible
- Capability check uses `'OffscreenCanvas' in globalThis`, not `typeof`
- Metadata `info` is cast to `Record<string, unknown>` (SAFETY comment + site-scoped anti-slop suppression — pdfjs info is an untyped dictionary by contract); raw values are re-validated by the `isNonEmptyString` type guard (`@/lib/utils`) at this boundary
- No `postMessage` anywhere — Comlink only

## Testing

**File**: `workers/pdf.worker.test.ts` — 8 tests, pdfjs-dist mocked:
- Metadata mapping (title/author), missing-metadata fallback, whitespace trimming
- Thumbnail guard: no `OffscreenCanvas` → no thumbnail, render not called
- Thumbnail render path with a stubbed `OffscreenCanvas`
- Metadata survives a failing thumbnail render
- `task.destroy()` after parsing and after a rejected document load

The mock and the pdfjs info contract use `Record<string, unknown>` with site-scoped anti-slop suppressions (logged in `docs/lint-suppressions.md`) because pdfjs's surface is untyped by contract.

## Dependencies

- `comlink` — RPC
- `pdfjs-dist` — parsing + rendering
