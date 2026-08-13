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

`savePdf` is currently the only export. `loadPdf`, `deletePdf`, and `getStorageUsage` were removed — the import pipeline only writes today; read/delete are planned with the PDF Worker and book removal.

## Usage

```ts
import { importPdf } from '@/lib/pdf-import'

// On PDF import — computes the fingerprint and saves to OPFS
const file = event.target.files[0]
await importPdf(file)
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
