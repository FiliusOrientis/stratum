import { expose } from 'comlink'
import type { PDFDocumentProxy } from 'pdfjs-dist'
import * as pdfjs from 'pdfjs-dist'
import workerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url'

import { isNonEmptyString } from '@/lib/utils'

import type { PdfParseResult } from './pdf.types'

pdfjs.GlobalWorkerOptions.workerSrc = workerUrl

const THUMBNAIL_SCALE = 0.5

async function renderThumbnail(
  pdf: PDFDocumentProxy,
  pageNumber: number,
): Promise<Blob | undefined> {
  if (!('OffscreenCanvas' in globalThis)) {
    return undefined
  }
  const page = await pdf.getPage(pageNumber)
  const viewport = page.getViewport({ scale: THUMBNAIL_SCALE })
  const canvas = new OffscreenCanvas(
    Math.max(1, Math.floor(viewport.width)),
    Math.max(1, Math.floor(viewport.height)),
  )
  const context = canvas.getContext('2d')
  if (!context) {
    return undefined
  }
  await page.render({
    canvas: null,
    // SAFETY: pdfjs types only accept CanvasRenderingContext2D; the OffscreenCanvas context
    // exposes the same render surface, so the intersection asserts only the missing type label.
    canvasContext: context as OffscreenCanvasRenderingContext2D & CanvasRenderingContext2D,
    viewport,
  }).promise
  return canvas.convertToBlob()
}

export async function parsePdf(data: Uint8Array): Promise<PdfParseResult> {
  const task = pdfjs.getDocument({ data })
  try {
    const pdf = await task.promise
    const [metadata, thumbnailBlob] = await Promise.all([
      pdf.getMetadata(),
      // ponytail: thumbnail is best-effort — a broken first page must not kill metadata
      renderThumbnail(pdf, 1).catch(() => undefined),
    ])
    // SAFETY: pdfjs types metadata.info as Object; the raw values are re-validated by
    // isNonEmptyString at this boundary.
    // oxlint-disable-next-line anti-slop/no-unsafe-dictionary-type -- pdfjs info is an untyped dictionary by contract
    const info = metadata.info as Record<string, unknown>
    const title = info.Title
    const author = info.Author
    return {
      title: isNonEmptyString(title) ? title.trim() : undefined,
      author: isNonEmptyString(author) ? author.trim() : undefined,
      pageCount: pdf.numPages,
      thumbnailBlob,
    }
  } finally {
    await task.destroy()
  }
}

expose({ parsePdf })
