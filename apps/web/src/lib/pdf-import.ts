import { savePdf } from '@/lib/storage'

const PDF_EXT_REGEX = /\.pdf$/i

export interface PdfImportResult {
  title: string
  fingerprint: string
}

export async function importPdf(filename: string, bytes: ArrayBuffer): Promise<PdfImportResult> {
  const fingerprint = await computeSha256(bytes)
  await savePdf(fingerprint, new Blob([bytes], { type: 'application/pdf' }))
  return {
    title: filename.replace(PDF_EXT_REGEX, ''),
    fingerprint,
  }
}

async function computeSha256(bytes: ArrayBuffer): Promise<string> {
  const hash = await crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}
