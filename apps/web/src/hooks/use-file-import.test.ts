import { act, renderHook, waitFor } from '@testing-library/react'
import type { ChangeEvent } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { importPdf } from '@/lib/pdf-import'
import { useCatalogStore } from '@/stores/catalog.store'
import { useViewerStore } from '@/stores/viewer.store'
import { useFileImport } from './use-file-import'

vi.mock('@/lib/pdf-import', () => ({
  importPdf: vi.fn(),
}))

const mockImportPdf = vi.mocked(importPdf)

function changeEvent(value: string, files: File[]) {
  const input = document.createElement('input')
  input.value = value
  Object.defineProperty(input, 'files', { configurable: true, value: files })
  return { target: input } as unknown as ChangeEvent<HTMLInputElement>
}

describe('useFileImport', () => {
  beforeEach(() => {
    useCatalogStore.setState({ books: [], isLoading: false, error: null })
    useViewerStore.setState({ pageCount: 0 })
    mockImportPdf.mockReset()
  })

  it('imports a file and adds the book to the catalog', async () => {
    mockImportPdf.mockResolvedValue({ title: 'doc', pageCount: 12, fingerprint: 'fp-1' })
    const { result } = renderHook(() => useFileImport())
    const file = new File(['pdf'], 'doc.pdf', { type: 'application/pdf' })

    await act(async () => {
      await result.current.handleFile(file)
    })

    expect(mockImportPdf).toHaveBeenCalledWith(file)
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
    mockImportPdf.mockResolvedValue({ title: 'doc', pageCount: 12, fingerprint: 'fp-1' })
    const { result } = renderHook(() => useFileImport())

    await act(async () => {
      await result.current.handleFile(new File(['pdf'], 'doc.pdf'))
    })

    expect(useViewerStore.getState().pageCount).toBe(12)
  })

  it('forwards the picked file from input change', async () => {
    mockImportPdf.mockResolvedValue({ title: 'doc', pageCount: 1, fingerprint: 'fp-1' })
    const { result } = renderHook(() => useFileImport())
    const file = new File(['pdf'], 'doc.pdf', { type: 'application/pdf' })

    act(() => {
      result.current.handleInputChange(changeEvent('fake-path', [file]))
    })

    await waitFor(() => {
      expect(mockImportPdf).toHaveBeenCalledWith(file)
    })
  })

  it('resets the input value after change', async () => {
    mockImportPdf.mockResolvedValue({ title: 'doc', pageCount: 1, fingerprint: 'fp-1' })
    const { result } = renderHook(() => useFileImport())
    const event = changeEvent('fake-path', [new File(['pdf'], 'doc.pdf')])

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
