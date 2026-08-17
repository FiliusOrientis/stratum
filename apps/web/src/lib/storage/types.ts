export interface BookEntity {
  id: string
  title: string
  author?: string
  coverBlob?: Blob
  pageCount: number
  lastPage: number
  addedAt: Date
}
