# PDF Import

**File**: `apps/web/src/lib/pdf-import.ts`

PDF file import pipeline: fingerprint → OPFS save. Parsing runs separately in the PDF Worker; `use-file-import` orchestrates both and rolls back OPFS bytes when parsing fails.

## Exports

### `importPdf(filename: string, bytes: ArrayBuffer): Promise<PdfImportResult>`

Hashes the bytes and saves them to OPFS under the fingerprint.

| Param      | Type          | Description                                |
|------------|---------------|--------------------------------------------|
| `filename` | `string`      | Original file name (title fallback source) |
| `bytes`    | `ArrayBuffer` | PDF bytes read once by the caller          |

**Returns**: `PdfImportResult` object:

| Property      | Type     | Description                                     |
|---------------|----------|-------------------------------------------------|
| `title`       | `string` | Display title (filename without .pdf extension) |
| `fingerprint` | `string` | SHA-256 hex digest of the bytes                 |

**Side effects**: Saves the bytes to OPFS via `savePdf(fingerprint, blob)`.

`computeSha256` is an internal helper (not exported) used by `importPdf` for the fingerprint.

## Pipeline

1. `use-file-import` reads `file.arrayBuffer()` once
2. `importPdf` computes the SHA-256 fingerprint and saves to OPFS
3. The PDF Worker (`workers/pdf.worker.ts`) parses a transferred `Uint8Array` view of the same bytes → metadata + page count + thumbnail
4. `catalogStore.addBook()` upserts the book — on parse failure `deletePdf(fingerprint)` removes the orphaned bytes

Text extraction and outline/TOC parsing land with the reader step.

## Usage

```ts
import { importPdf } from '@/lib/pdf-import'

const bytes = await file.arrayBuffer()
const { title, fingerprint } = await importPdf(file.name, bytes)
```

## Dependencies

- `@/lib/storage` — `savePdf()` for OPFS persistence
- `crypto.subtle.digest` — browser-native SHA-256

## Edge Cases

- Non-PDF files: rejected by `use-file-import` type check before hashing
- Duplicate files: same content → same fingerprint → OPFS overwrites; the store upserts by id
- Large files: bytes are read once and transferred to the worker (no second copy)
