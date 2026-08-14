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
function pdfInfo(title?: string, author?: string): Record<string, unknown> {
  const info: Record<string, unknown> = {}
  if (title !== undefined) {
    info.Title = title
  }
  if (author !== undefined) {
    info.Author = author
  }
  return info
}

vi.mock('pdfjs-dist', () => {
  const api: Record<string, unknown> = { getDocument: () => mockTask }
  api.GlobalWorkerOptions = {}
  return api
})

import { parsePdf } from './pdf.worker'

function makeFile(): File {
  return new File([new Uint8Array(64)], 'report.pdf', { type: 'application/pdf' })
}

describe('parsePdf', () => {
  beforeEach(() => {
    mockPdf.getMetadata.mockReset()
    mockPdf.getPage.mockReset()
    mockTask.destroy.mockReset()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('maps metadata and page count', async () => {
    mockPdf.getMetadata.mockResolvedValue({ info: pdfInfo('Annual Report', 'Jane Doe') })
    const result = await parsePdf(makeFile())
    expect(result).toMatchObject({ title: 'Annual Report', author: 'Jane Doe', pageCount: 12 })
  })

  it('returns undefined title and author when metadata is missing', async () => {
    mockPdf.getMetadata.mockResolvedValue({ info: pdfInfo() })
    const result = await parsePdf(makeFile())
    expect(result.title).toBeUndefined()
    expect(result.author).toBeUndefined()
    expect(result.pageCount).toBe(12)
  })

  it('trims whitespace-only metadata to undefined', async () => {
    mockPdf.getMetadata.mockResolvedValue({ info: pdfInfo('   ', '  ') })
    const result = await parsePdf(makeFile())
    expect(result.title).toBeUndefined()
    expect(result.author).toBeUndefined()
  })

  it('returns no thumbnail without OffscreenCanvas', async () => {
    mockPdf.getMetadata.mockResolvedValue({ info: pdfInfo() })
    const result = await parsePdf(makeFile())
    expect(result.thumbnailBlob).toBeUndefined()
    expect(mockPdf.getPage).not.toHaveBeenCalled()
  })

  it('renders a thumbnail when OffscreenCanvas is available', async () => {
    vi.stubGlobal(
      'OffscreenCanvas',
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
    const result = await parsePdf(makeFile())
    expect(mockPdf.getPage).toHaveBeenCalledWith(1)
    expect(result.thumbnailBlob).toBeInstanceOf(Blob)
  })

  it('destroys the document after parsing', async () => {
    mockPdf.getMetadata.mockResolvedValue({ info: pdfInfo() })
    await parsePdf(makeFile())
    expect(mockTask.destroy).toHaveBeenCalledOnce()
  })
})
