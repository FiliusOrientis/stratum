# PDF Import

**File**: `apps/web/src/lib/pdf-import/index.ts`

PDF file import pipeline: fingerprint → OPFS save → metadata extraction.

## Exports

### `importPdf(file: File): Promise<PdfMetadata>`

Imports a PDF file into the app.

| Param | Type | Description |
|-------|------|-------------|
| `file` | `File` | PDF file from user import (picker, drag-drop, or URL download) |

**Returns**: `PdfMetadata` object:
| Property | Type | Description |
|----------|------|-------------|
| `title` | `string` | Display title (filename without .pdf extension) |
| `pageCount` | `number` | Initial page count (0 — filled by PDF Worker later) |
| `fingerprint` | `string` | SHA-256 hex digest of file bytes |

**Side effects**: Saves PDF bytes to OPFS via `savePdf(fingerprint, file)`.

Note: `computeSha256` is an internal helper (not exported) used by `importPdf` for the fingerprint.

## Pipeline (future)

1. User picks file → `importPdf` computes the SHA-256 fingerprint
2. `savePdf(fingerprint, file)` → OPFS
3. PDF Worker loads from OPFS → extracts metadata + text + thumbnail
4. `catalogStore.addBook()` with enriched metadata

Currently step 3-4 are stubs — the PDF Worker integration is Milestone 3.

## Usage

```tsx
import { importPdf } from '@/lib/pdf-import'

const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (!file) return
  const metadata = await importPdf(file)
  console.log(`Imported: ${metadata.title}`)
}
```

## Dependencies

- `@/lib/storage` — `savePdf()` for OPFS persistence
- `crypto.subtle.digest` — browser-native SHA-256

## Edge Cases

- Non-PDF files: accepted by the picker but PDF Worker will fail gracefully
- Duplicate files: SHA-256 collision unlikely; same content → same fingerprint → OPFS overwrites
- Large files: SHA-256 computation is async and streams via ArrayBuffer (memory-bound)
