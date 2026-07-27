# Catalog Store

**File**: `apps/web/src/stores/catalog.store.ts`

Manages the user's book collection.

## State

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `books` | `Book[]` | `[]` | List of all imported books |
| `isLoading` | `boolean` | `false` | True during import/loading |
| `error` | `string \| null` | `null` | Error message if import fails |

## Book Entity

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | yes | Unique book identifier (SHA-256 fingerprint of PDF) |
| `title` | `string` | yes | Display title (from PDF metadata or filename) |
| `author` | `string \| undefined` | no | Author name (from PDF metadata or AI-enriched) |
| `coverBlob` | `Blob \| undefined` | no | Cover thumbnail as Blob |
| `pageCount` | `number` | yes | Total number of pages |
| `lastPage` | `number` | yes | Last viewed page (1-indexed) |
| `lastRead` | `Date \| undefined` | no | Timestamp of last reading session |
| `addedAt` | `Date` | yes | Timestamp of import |
| `tags` | `string[] \| undefined` | no | User-defined tags/categories |

## Actions

| Action | Signature | Description |
|--------|-----------|-------------|
| `addBook` | `(book: Book) => void` | Appends a book to the catalog |
| `removeBook` | `(id: string) => void` | Removes a book by ID |
| `setBooks` | `(books: Book[]) => void` | Replaces the entire book list |
| `updateBook` | `(id: string, partial: Partial<Book>) => void` | Merges partial data into an existing book |
| `setLoading` | `(loading: boolean) => void` | Sets loading state |
| `setError` | `(error: string \| null) => void` | Sets error state |

## Usage

```tsx
import { useCatalogStore } from '@/stores'

function CatalogView() {
  const books = useCatalogStore((s) => s.books)
  const addBook = useCatalogStore((s) => s.addBook)
  // ...
}
```

## Dependencies

- `zustand` — state management library

## Persistence

State is in-memory only. Data is persisted via Dexie (in `lib/storage/db.ts`). The store should be hydrated on app startup from Dexie and flushed on changes.
