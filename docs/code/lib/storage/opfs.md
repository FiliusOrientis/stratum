# OPFS Storage

**File**: `apps/web/src/lib/storage/opfs.ts`

Origin Private File System (OPFS) for binary PDF file storage.

## Storage Layout

```
/navigator.storage.getDirectory()
  └── stratum-pdfs/
      ├── <fingerprint1>  (binary PDF)
      ├── <fingerprint2>  (binary PDF)
      └── ...
```

All PDFs stored in a dedicated `stratum-pdfs/` subdirectory to avoid cluttering the OPFS root.

## Exports

### `savePdf(id: string, file: File): Promise<void>`

Saves a PDF file to OPFS.

| Param | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique file identifier (usually SHA-256 fingerprint) |
| `file` | `File` | The PDF File object from user import |

**Throws**: If the file handle cannot be created (storage full, permissions).

### `loadPdf(id: string): Promise<File | null>`

Loads a PDF file from OPFS.

| Param | Type | Description |
|-------|------|-------------|
| `id` | `string` | File identifier used during save |

**Returns**: A `File` object or `null` if the file does not exist.

### `deletePdf(id: string): Promise<void>`

Deletes a PDF file from OPFS. Silent if file does not exist.

| Param | Type | Description |
|-------|------|-------------|
| `id` | `string` | File identifier to delete |

### `getStorageUsage(): Promise<{ usage: number; quota: number }>`

Returns current OPFS storage usage statistics.

**Returns**:
- `usage` — bytes used (0 if `navigator.storage.estimate` unavailable)
- `quota` — bytes available (0 if estimation unavailable)

## Usage

```ts
import { savePdf, loadPdf, deletePdf } from '@/lib/storage'

// On PDF import
const file = event.target.files[0]
const fingerprint = await computeSha256(file) // from pdf-utils
await savePdf(fingerprint, file)

// On book open
const pdfFile = await loadPdf(book.opfsPath)
if (pdfFile) {
  const bytes = new Uint8Array(await pdfFile.arrayBuffer())
  // Send to PDF Worker for parsing
}

// On book removal
await deletePdf(book.id)
```

## Limitations

- OPFS is scoped to the origin. Data cannot be shared across origins.
- Files persist until explicitly deleted or the user clears site data.
- Some browsers (Firefox) may not support OPFS. Fallback to IndexedDB blob storage is planned.

## Browser Support

| Browser | OPFS Support |
|---------|-------------|
| Chrome 86+ | Full |
| Edge 86+ | Full |
| Firefox 102+ | Full |
| Safari 15.2+ | Full |

## Dependencies

- No external deps. Uses `navigator.storage.getDirectory()` (File System Access API).
