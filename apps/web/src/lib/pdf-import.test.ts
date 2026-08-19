import { beforeEach, describe, expect, it, vi } from 'vitest'
import { savePdf } from '@/lib/storage'
import { importPdf } from './pdf-import'

// oxlint-disable-next-line anti-slop/no-module-mocking -- internal seam: converts to DI when the services layer lands
vi.mock('@/lib/storage', () => ({
  savePdf: vi.fn(),
}))

const mockSavePdf = vi.mocked(savePdf)

const FINGERPRINT_RE = /^[0-9a-f]{64}$/

function bytesOf(text: string): ArrayBuffer {
  return new TextEncoder().encode(text).buffer
}

describe('importPdf', () => {
  beforeEach(() => {
    mockSavePdf.mockReset()
    mockSavePdf.mockResolvedValue(undefined)
  })

  it('derives the title from the filename without the extension', async () => {
    const result = await importPdf('annual-report.pdf', bytesOf('pdf'))
    expect(result.title).toBe('annual-report')
  })

  it('computes a stable sha-256 fingerprint from the content', async () => {
    const first = await importPdf('a.pdf', bytesOf('same content'))
    const second = await importPdf('b.pdf', bytesOf('same content'))
    expect(first.fingerprint).toMatch(FINGERPRINT_RE)
    expect(first.fingerprint).toBe(second.fingerprint)
  })

  it('saves the bytes to OPFS under the fingerprint', async () => {
    const result = await importPdf('doc.pdf', bytesOf('pdf'))
    expect(mockSavePdf).toHaveBeenCalledWith(result.fingerprint, expect.any(Blob))
  })
})
