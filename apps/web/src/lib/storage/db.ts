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

export interface ConfigEntity {
  key: string
  value: unknown
}

const DB_NAME = 'stratum'
const DB_VERSION = 1

export class StratumDb extends Dexie {
  books!: EntityTable<BookEntity, 'id'>
  config!: EntityTable<ConfigEntity, 'key'>

  constructor() {
    super(DB_NAME)
    this.version(DB_VERSION).stores({
      books: 'id, title, addedAt, lastRead',
      config: 'key',
    })
  }
}

export const db = new StratumDb()
