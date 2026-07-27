import { savePdf } from '@/lib/storage'

const PDF_EXT_REGEX = /\.pdf$/i

export interface PdfMetadata {
  title: string
  pageCount: number
  fingerprint: string
}

export async function importPdf(file: File): Promise<PdfMetadata> {
  const fingerprint = await computeSha256(file)
  await savePdf(fingerprint, file)

  return {
    title: file.name.replace(PDF_EXT_REGEX, ''),
    pageCount: 0,
    fingerprint,
  }
}

export async function computeSha256(file: File): Promise<string> {
  const bytes = await file.arrayBuffer()
  const hash = await crypto.subtle.digest('SHA-256', bytes)
  const hex = Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
  return hex
}
