import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const mockPdf = {
  numPages: 12,
  getMetadata: vi.fn(),
  getPage: vi.fn(),
  destroy: vi.fn(),
}

const mockTask = {
  promise: Promise.resolve(mockPdf),
  destroy: vi.fn(),
}

// PDF-spec identifiers (Title, Author, GlobalWorkerOptions) are PascalCase by
// definition — build them via member access on Record-typed objects so the
// naming rule stays off.
// oxlint-disable-next-line anti-slop/no-unsafe-dictionary-type -- pdfjs info contract is an untyped dictionary
function pdfInfo(title?: string, author?: string): Record<string, unknown> {
  // oxlint-disable-next-line anti-slop/no-unsafe-dictionary-type -- pdfjs info contract is an untyped dictionary
  const info: Record<string, unknown> = {}
  if (title !== undefined) {
    info.Title = title
  }
  if (author !== undefined) {
    info.Author = author
  }
  // oxlint-disable-next-line anti-slop/no-known-value-widening -- caller-provided values keep their evidence
  return info
}

// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols
// oxlint-disable-next-line anti-slop/no-module-mocking -- external pdfjs-dist dependency mocked at the boundary
vi.mock('pdfjs-dist', () => {
  // oxlint-disable-next-line anti-slop/no-unsafe-dictionary-type,anti-slop/no-known-value-widening -- pdfjs module surface is untyped by contract
  const api: Record<string, unknown> = { getDocument: () => mockTask }
  api.GlobalWorkerOptions = {}
  return api
})

import { parsePdf } from './pdf.worker'

function makeData(): Uint8Array {
  return new Uint8Array(64)
}

describe('parsePdf', () => {
  beforeEach(() => {
    mockPdf.getMetadata.mockReset()
    mockPdf.getPage.mockReset()
    mockTask.destroy.mockReset()
    mockTask.promise = Promise.resolve(mockPdf)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('maps metadata and page count', async () => {
    mockPdf.getMetadata.mockResolvedValue({ info: pdfInfo('Annual Report', 'Jane Doe') })
    const result = await parsePdf(makeData())
    expect(result).toMatchObject({ title: 'Annual Report', author: 'Jane Doe', pageCount: 12 })
  })

  it('returns undefined title and author when metadata is missing', async () => {
    mockPdf.getMetadata.mockResolvedValue({ info: pdfInfo() })
    const result = await parsePdf(makeData())
    expect(result.title).toBeUndefined()
    expect(result.author).toBeUndefined()
    expect(result.pageCount).toBe(12)
  })

  it('trims whitespace-only metadata to undefined', async () => {
    mockPdf.getMetadata.mockResolvedValue({ info: pdfInfo('   ', '  ') })
    const result = await parsePdf(makeData())
    expect(result.title).toBeUndefined()
    expect(result.author).toBeUndefined()
  })

  it('returns no thumbnail without OffscreenCanvas', async () => {
    mockPdf.getMetadata.mockResolvedValue({ info: pdfInfo() })
    const result = await parsePdf(makeData())
    expect(result.thumbnailBlob).toBeUndefined()
    expect(mockPdf.getPage).not.toHaveBeenCalled()
  })

  it('renders a thumbnail when OffscreenCanvas is available', async () => {
    vi.stubGlobal(
      'OffscreenCanvas',
      // noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols
      class {
        width = 0
        height = 0
        constructor(w: number, h: number) {
          this.width = w
          this.height = h
        }
        getContext() {
          return {}
        }
        convertToBlob() {
          return Promise.resolve(new Blob(['thumb'], { type: 'image/png' }))
        }
      },
    )
    mockPdf.getMetadata.mockResolvedValue({ info: pdfInfo() })
    mockPdf.getPage.mockResolvedValue({
      getViewport: () => ({ width: 300, height: 400 }),
      render: () => ({ promise: Promise.resolve() }),
    })
    const result = await parsePdf(makeData())
    expect(mockPdf.getPage).toHaveBeenCalledWith(1)
    expect(result.thumbnailBlob).toBeInstanceOf(Blob)
  })

  it('keeps metadata when the thumbnail render fails', async () => {
    vi.stubGlobal(
      'OffscreenCanvas',
      class {
        getContext() {
          return {}
        }
      },
    )
    mockPdf.getMetadata.mockResolvedValue({ info: pdfInfo('Still Readable') })
    mockPdf.getPage.mockRejectedValue(new Error('render failure'))
    const result = await parsePdf(makeData())
    expect(result.title).toBe('Still Readable')
    expect(result.pageCount).toBe(12)
    expect(result.thumbnailBlob).toBeUndefined()
  })

  it('destroys the document after parsing', async () => {
    mockPdf.getMetadata.mockResolvedValue({ info: pdfInfo() })
    await parsePdf(makeData())
    expect(mockTask.destroy).toHaveBeenCalledOnce()
  })

  it('destroys the loading task when the document fails to load', async () => {
    mockTask.promise = Promise.reject(new Error('Corrupt document'))
    await expect(parsePdf(makeData())).rejects.toThrow('Corrupt document')
    expect(mockTask.destroy).toHaveBeenCalledOnce()
  })
})
