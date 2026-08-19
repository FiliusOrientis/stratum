import { wrap } from 'comlink'

import type { PdfParseResult } from './pdf.types'

export interface PdfParser {
  parsePdf(data: Uint8Array, transferables?: Transferable[]): Promise<PdfParseResult>
}

let parser: PdfParser | null = null

export function getPdfParser(): PdfParser {
  if (!parser) {
    const worker = new Worker(new URL('./pdf.worker.ts', import.meta.url), { type: 'module' })
    const proxy = wrap<PdfParser>(worker)
    parser = {
      parsePdf: async (data, transferables) => {
        try {
          return await proxy.parsePdf(data, transferables)
        } catch (error) {
          // ponytail: a crashed worker poisons the singleton — reset so the next call respawns
          parser = null
          worker.terminate()
          throw error
        }
      },
    }
  }
  return parser
}
