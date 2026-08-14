import { expose } from 'comlink'
import type { PDFDocumentProxy } from 'pdfjs-dist'
import * as pdfjs from 'pdfjs-dist'
import workerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url'

import type { PdfParseResult } from './pdf.types'

pdfjs.GlobalWorkerOptions.workerSrc = workerUrl

const THUMBNAIL_SCALE = 0.5

function stringOrUndefined(value: unknown): string | undefined {
  if (typeof value !== 'string') {
    return undefined
  }
  const trimmed = value.trim()
  return trimmed ? trimmed : undefined
}

async function renderThumbnail(
  pdf: PDFDocumentProxy,
  pageNumber: number,
): Promise<Blob | undefined> {
  if (typeof OffscreenCanvas === 'undefined') {
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
    canvasContext: context as unknown as CanvasRenderingContext2D,
    viewport,
  }).promise
  return canvas.convertToBlob()
}

export async function parsePdf(file: File): Promise<PdfParseResult> {
  const data = new Uint8Array(await file.arrayBuffer())
  const task = pdfjs.getDocument({ data })
  const pdf = await task.promise
  try {
    const metadata = await pdf.getMetadata()
    const info = metadata.info as Record<string, unknown> | undefined
    const thumbnailBlob = await renderThumbnail(pdf, 1)
    return {
      title: stringOrUndefined(info?.Title),
      author: stringOrUndefined(info?.Author),
      pageCount: pdf.numPages,
      thumbnailBlob,
    }
  } finally {
    await task.destroy()
  }
}

expose({ parsePdf })
