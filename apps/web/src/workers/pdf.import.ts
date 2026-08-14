import { wrap } from 'comlink'

import type { PdfParseResult } from './pdf.types'

export interface PdfParser {
  parsePdf(file: File): Promise<PdfParseResult>
}

let parser: PdfParser | null = null

export function getPdfParser(): PdfParser {
  if (!parser) {
    parser = wrap<PdfParser>(
      new Worker(new URL('./pdf.worker.ts', import.meta.url), { type: 'module' }),
    )
  }
  return parser
}
