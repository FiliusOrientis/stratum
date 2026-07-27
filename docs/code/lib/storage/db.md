# Dexie Database

**File**: `apps/web/src/lib/storage/db.ts`

IndexedDB wrapper using Dexie.js for structured metadata storage.

## Entities

### BookEntity

| Field | Type | Indexed | Description |
|-------|------|---------|-------------|
| `id` | `string` | Primary key | SHA-256 fingerprint of the PDF |
| `title` | `string` | Yes | Display title |
| `author` | `string?` | No | Author name |
| `coverBlob` | `Blob?` | No | Cover thumbnail image |
| `pageCount` | `number` | No | Total pages |
| `lastPage` | `number` | No | Last viewed page |
| `lastRead` | `Date?` | Yes | Last read timestamp |
| `addedAt` | `Date` | Yes | Import timestamp |
| `tags` | `string[]?` | No | User tags |
| `opfsPath` | `string` | No | OPFS file path for the PDF binary |

### ConfigEntity

| Field | Type | Indexed | Description |
|-------|------|---------|-------------|
| `key` | `string` | Primary key | Config key name |
| `value` | `unknown` | No | Config value (any JSON-serializable type) |

## Class: StratumDb

Extends `Dexie` with versioned schema.

```ts
const DB_NAME = 'stratum'
const DB_VERSION = 1

// Schema:
// books:  'id, title, addedAt, lastRead'
// config: 'key'
```

## Singleton

```ts
export const db = new StratumDb()
```

Import this singleton anywhere — Dexie handles connection pooling internally.

## Usage

```tsx
import { db, type BookEntity } from '@/lib/storage'

// Query all books sorted by last read
const books = await db.books.orderBy('lastRead').reverse().toArray()

// Add a book
await db.books.put({
  id: fingerprint,
  title: 'My Book',
  pageCount: 200,
  lastPage: 1,
  addedAt: new Date(),
  opfsPath: fingerprint,
})

// Update last read
await db.books.update(fingerprint, { lastRead: new Date(), lastPage: 42 })

// Config key-value
await db.config.put({ key: 'toolbarPosition', value: 'bottom' })
const pos = await db.config.get('toolbarPosition')
```

## Schema Migrations

Current version: 1. Add new versions in ascending order:

```ts
this.version(2).stores({
  books: 'id, title, addedAt, lastRead, author', // added author index
})
```

## Dependencies

- `dexie` — IndexedDB wrapper library
