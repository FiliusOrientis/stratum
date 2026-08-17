import { act, renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { importPdf } from '@/lib/pdf-import'
import { deletePdf } from '@/lib/storage'
import { useCatalogStore } from '@/stores/catalog.store'
import { useViewerStore } from '@/stores/viewer.store'
import { useFileImport } from './use-file-import'

// oxlint-disable-next-line anti-slop/no-module-mocking -- internal seam: converts to DI when the services layer lands
vi.mock('@/lib/pdf-import', () => ({
  importPdf: vi.fn(),
}))

// oxlint-disable-next-line anti-slop/no-module-mocking -- internal seam: converts to DI when the services layer lands
vi.mock('@/lib/storage', () => ({
  deletePdf: vi.fn(),
}))

const { mockParser } = vi.hoisted(() => ({ mockParser: { parsePdf: vi.fn() } }))

// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols
// oxlint-disable-next-line anti-slop/no-module-mocking -- internal seam: converts to DI when the services layer lands
vi.mock('@/workers/pdf.import', () => ({
  getPdfParser: () => mockParser,
}))

const mockImportPdf = vi.mocked(importPdf)
const mockDeletePdf = vi.mocked(deletePdf)
const mockParsePdf = mockParser.parsePdf

function changeEvent(value: string, files: File[]) {
  const input = document.createElement('input')
  input.value = value
  Object.defineProperty(input, 'files', { configurable: true, value: files })
  return { target: input }
}

function pdfFile(): File {
  return new File(['pdf'], 'doc.pdf', { type: 'application/pdf' })
}

describe('useFileImport', () => {
  beforeEach(() => {
    useCatalogStore.setState({ books: [], error: null })
    useViewerStore.setState({ pageCount: 0 })
    mockImportPdf.mockReset()
    mockDeletePdf.mockReset()
    mockParsePdf.mockReset()
    mockImportPdf.mockResolvedValue({ title: 'doc', fingerprint: 'fp-1' })
    mockParsePdf.mockResolvedValue({ pageCount: 12 })
  })

  it('imports a file and adds the book to the catalog', async () => {
    const { result } = renderHook(() => useFileImport())

    await act(async () => {
      await result.current.handleFile(pdfFile())
    })

    expect(mockImportPdf).toHaveBeenCalledWith('doc.pdf', expect.any(ArrayBuffer))
    expect(mockParsePdf).toHaveBeenCalledWith(expect.any(Uint8Array), [expect.any(ArrayBuffer)])
    expect(useCatalogStore.getState().books).toEqual([
      {
        id: 'fp-1',
        title: 'doc',
        pageCount: 12,
        lastPage: 1,
        addedAt: expect.any(Date),
      },
    ])
  })

  it('sets the viewer page count after import', async () => {
    const { result } = renderHook(() => useFileImport())

    await act(async () => {
      await result.current.handleFile(pdfFile())
    })

    expect(useViewerStore.getState().pageCount).toBe(12)
  })

  it('prefers parsed metadata and stores the cover thumbnail', async () => {
    mockParsePdf.mockResolvedValue({
      title: 'Annual Report',
      author: 'Jane Doe',
      pageCount: 30,
      thumbnailBlob: new Blob(['thumb'], { type: 'image/png' }),
    })
    const { result } = renderHook(() => useFileImport())

    await act(async () => {
      await result.current.handleFile(pdfFile())
    })

    expect(useCatalogStore.getState().books[0]).toMatchObject({
      title: 'Annual Report',
      author: 'Jane Doe',
      pageCount: 30,
      coverBlob: expect.any(Blob),
    })
    expect(useViewerStore.getState().pageCount).toBe(30)
  })

  it('falls back to the filename title when metadata has none', async () => {
    const { result } = renderHook(() => useFileImport())

    await act(async () => {
      await result.current.handleFile(pdfFile())
    })

    expect(useCatalogStore.getState().books[0]?.title).toBe('doc')
  })

  it('records the error and deletes stored bytes when parsing fails', async () => {
    mockParsePdf.mockRejectedValue({ message: 'Corrupt PDF' })
    const { result } = renderHook(() => useFileImport())

    await act(async () => {
      await result.current.handleFile(pdfFile())
    })

    expect(useCatalogStore.getState().error).toBe('Corrupt PDF')
    expect(mockDeletePdf).toHaveBeenCalledWith('fp-1')
    expect(useCatalogStore.getState().books).toEqual([])
  })

  it('rejects non-PDF files without saving or parsing', async () => {
    const { result } = renderHook(() => useFileImport())
    const file = new File(['pdf'], 'doc.txt', { type: 'text/plain' })

    await act(async () => {
      await result.current.handleFile(file)
    })

    expect(useCatalogStore.getState().error).toBe('Selected file is not a PDF')
    expect(mockImportPdf).not.toHaveBeenCalled()
    expect(mockParsePdf).not.toHaveBeenCalled()
  })

  it('clears a previous error before importing', async () => {
    useCatalogStore.setState({ error: 'Old error' })
    const { result } = renderHook(() => useFileImport())

    await act(async () => {
      await result.current.handleFile(pdfFile())
    })

    expect(useCatalogStore.getState().error).toBeNull()
  })

  it('ignores a second import while one is in flight', async () => {
    let resolveImport!: (value: { title: string; fingerprint: string }) => void
    mockImportPdf.mockImplementationOnce(() => new Promise(resolve => (resolveImport = resolve)))
    const { result } = renderHook(() => useFileImport())

    let first!: Promise<void>
    let second!: Promise<void>
    act(() => {
      first = result.current.handleFile(pdfFile())
      second = result.current.handleFile(pdfFile())
    })
    await waitFor(() => {
      expect(mockImportPdf).toHaveBeenCalledOnce()
    })
    await act(async () => {
      resolveImport({ title: 'doc', fingerprint: 'fp-1' })
      await Promise.all([first, second])
    })

    expect(mockImportPdf).toHaveBeenCalledOnce()
    expect(useCatalogStore.getState().books).toHaveLength(1)
  })

  it('forwards the picked file from input change', async () => {
    const { result } = renderHook(() => useFileImport())

    act(() => {
      result.current.handleInputChange(changeEvent('fake-path', [pdfFile()]))
    })

    await waitFor(() => {
      expect(mockImportPdf).toHaveBeenCalledWith('doc.pdf', expect.any(ArrayBuffer))
    })
  })

  it('resets the input value after change', async () => {
    const { result } = renderHook(() => useFileImport())
    const event = changeEvent('fake-path', [pdfFile()])

    act(() => {
      result.current.handleInputChange(event)
    })

    await waitFor(() => {
      expect(event.target.value).toBe('')
    })
  })

  it('does not import when no file is selected', async () => {
    const { result } = renderHook(() => useFileImport())

    act(() => {
      result.current.handleInputChange(changeEvent('', []))
    })

    await waitFor(() => {
      expect(mockImportPdf).not.toHaveBeenCalled()
    })
  })
})
