import Dexie, { type EntityTable } from 'dexie'

export interface BookEntity {
  id: string
  title: string
  author?: string
  coverBlob?: Blob
  pageCount: number
  lastPage: number
  lastRead?: Date
  addedAt: Date
  tags?: string[]
  opfsPath: string
}

const DB_NAME = 'stratum'
const DB_VERSION = 1

export class StratumDb extends Dexie {
  books!: EntityTable<BookEntity, 'id'>

  constructor() {
    super(DB_NAME)
    this.version(DB_VERSION).stores({
      books: 'id, title, addedAt, lastRead',
    })
  }
}

export const db = new StratumDb()
