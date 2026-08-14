export interface PdfParseResult {
  title?: string
  author?: string
  pageCount: number
  thumbnailBlob?: Blob
}
