# Catalog Store

**File**: `apps/web/src/stores/catalog.store.ts`

Manages the user's book collection. In-memory only — Dexie persistence is planned.

## State

| Property | Type             | Default | Description                                                |
|----------|------------------|---------|------------------------------------------------------------|
| `books`  | `BookEntity[]`   | `[]`    | List of all imported books                                 |
| `error`  | `string \| null` | `null`  | Import error message; `CatalogPage` surfaces it as a toast |

## Book Entity (`lib/storage/types.ts`)

| Property    | Type                  | Required | Description                                                                       |
|-------------|-----------------------|----------|-----------------------------------------------------------------------------------|
| `id`        | `string`              | yes      | Unique book identifier (SHA-256 fingerprint of PDF; doubles as the OPFS filename) |
| `title`     | `string`              | yes      | Display title (from PDF metadata or filename)                                     |
| `author`    | `string \| undefined` | no       | Author name (from PDF metadata)                                                   |
| `coverBlob` | `Blob \| undefined`   | no       | Cover thumbnail as Blob                                                           |
| `pageCount` | `number`              | yes      | Total number of pages                                                             |
| `lastPage`  | `number`              | yes      | Last viewed page (1-indexed)                                                      |
| `addedAt`   | `Date`                | yes      | Timestamp of import                                                               |

## Actions

| Action     | Signature                         | Description                                                     |
|------------|-----------------------------------|-----------------------------------------------------------------|
| `addBook`  | `(book: BookEntity) => void`      | Upsert: replaces the book with the same `id`, otherwise appends |
| `setError` | `(error: string \| null) => void` | Sets or clears the import error                                 |

`removeBook`/`updateBook`/`setBooks` will land with the catalog grid; deletion must pair with `deletePdf`.

## Usage

```tsx
import { useCatalogStore } from '@/stores/catalog.store'

function CatalogView() {
  const books = useCatalogStore(s => s.books)
  // ...
}
```

## Dependencies

- `zustand` — state management library
- `@/lib/storage` — `BookEntity` type

## Persistence

State is in-memory only. Persistence is planned via Dexie (not installed). Hydrate the store from Dexie on app startup and flush it on changes.
