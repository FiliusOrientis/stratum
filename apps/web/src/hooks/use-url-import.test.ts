import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, type MockInstance, vi } from 'vitest'
import { type UrlFormSubmitLike, useUrlImport } from './use-url-import'

// oxlint-disable-next-line anti-slop/no-module-mocking -- external motion/react dependency mocked at the boundary
vi.mock('motion/react', () => ({
  useAnimate: () => [{ current: null }, vi.fn()],
}))

function pdfResponse(overrides: { status?: number; headers?: HeadersInit } = {}): Response {
  return new Response('pdf', {
    status: overrides.status ?? 200,
    headers: overrides.headers ?? { 'content-type': 'application/pdf' },
  })
}

function submitEvent(): UrlFormSubmitLike {
  return { preventDefault: vi.fn() }
}

describe('useUrlImport', () => {
  let fetchSpy: MockInstance

  beforeEach(() => {
    fetchSpy = vi.spyOn(globalThis, 'fetch')
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { readText: vi.fn() },
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('imports a PDF from a URL', async () => {
    fetchSpy.mockResolvedValue(pdfResponse())
    const onUrlImport = vi.fn()
    const { result } = renderHook(() => useUrlImport(onUrlImport))
    act(() => result.current.setUrlValue('example.com/document.pdf'))

    await act(async () => {
      await result.current.handleUrlSubmit(submitEvent())
    })

    expect(onUrlImport).toHaveBeenCalledOnce()
    // SAFETY: toBeInstanceOf(File) below validates the recorded argument
    const file = onUrlImport.mock.calls[0]?.[0] as File
    expect(file).toBeInstanceOf(File)
    expect(file.name).toBe('document.pdf')
    expect(result.current.urlError).toBeNull()
  })

  it('prepends https:// when the URL has no protocol', async () => {
    fetchSpy.mockResolvedValue(pdfResponse())
    const { result } = renderHook(() => useUrlImport(vi.fn()))
    act(() => result.current.setUrlValue('example.com/document.pdf'))

    await act(async () => {
      await result.current.handleUrlSubmit(submitEvent())
    })

    expect(fetchSpy).toHaveBeenCalledWith(
      'https://example.com/document.pdf',
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    )
  })

  it('reports an error and does not fetch when the URL is empty', async () => {
    const { result } = renderHook(() => useUrlImport(vi.fn()))

    await act(async () => {
      await result.current.handleUrlSubmit(submitEvent())
    })

    expect(fetchSpy).not.toHaveBeenCalled()
    expect(result.current.urlError).toBe('Enter a URL')
  })

  it('reports server errors', async () => {
    fetchSpy.mockResolvedValue(pdfResponse({ status: 500 }))
    const { result } = renderHook(() => useUrlImport(vi.fn()))
    act(() => result.current.setUrlValue('example.com/document.pdf'))

    await act(async () => {
      await result.current.handleUrlSubmit(submitEvent())
    })

    expect(result.current.urlError).toBe('Server responded with 500')
  })

  it('rejects non-PDF content types', async () => {
    fetchSpy.mockResolvedValue(
      pdfResponse({
        headers: { 'content-type': 'text/html' },
      }),
    )
    const { result } = renderHook(() => useUrlImport(vi.fn()))
    act(() => result.current.setUrlValue('example.com/page'))

    await act(async () => {
      await result.current.handleUrlSubmit(submitEvent())
    })

    expect(result.current.urlError).toBe('URL does not point to a PDF')
  })

  it('rejects files larger than the size cap', async () => {
    fetchSpy.mockResolvedValue(
      pdfResponse({
        headers: {
          'content-type': 'application/pdf',
          'content-length': String(101 * 1024 * 1024),
        },
      }),
    )
    const { result } = renderHook(() => useUrlImport(vi.fn()))
    act(() => result.current.setUrlValue('example.com/document.pdf'))

    await act(async () => {
      await result.current.handleUrlSubmit(submitEvent())
    })

    expect(result.current.urlError).toBe('File is too large to import')
  })

  it('percent-decodes the filename from the URL', async () => {
    fetchSpy.mockResolvedValue(pdfResponse())
    const onUrlImport = vi.fn()
    const { result } = renderHook(() => useUrlImport(onUrlImport))
    act(() => result.current.setUrlValue('example.com/my%20report.pdf'))

    await act(async () => {
      await result.current.handleUrlSubmit(submitEvent())
    })

    // SAFETY: toBeInstanceOf(File) in the first import test validates the recorded argument shape
    const file = onUrlImport.mock.calls[0]?.[0] as File
    expect(file.name).toBe('my report.pdf')
  })

  it('reports unreachable URLs', async () => {
    fetchSpy.mockRejectedValue(new TypeError('Failed to fetch'))
    const { result } = renderHook(() => useUrlImport(vi.fn()))
    act(() => result.current.setUrlValue('example.com/document.pdf'))

    await act(async () => {
      await result.current.handleUrlSubmit(submitEvent())
    })

    expect(result.current.urlError).toBe('Could not reach this URL')
  })

  it('clears the value and error', () => {
    const { result } = renderHook(() => useUrlImport(vi.fn()))
    act(() => result.current.setUrlValue('example.com/document.pdf'))

    act(() => result.current.handleClear())

    expect(result.current.urlValue).toBe('')
    expect(result.current.urlError).toBeNull()
  })

  it('pastes the clipboard content into the value', async () => {
    const readText = vi.mocked(navigator.clipboard.readText)
    readText.mockResolvedValue('example.com/document.pdf')
    const { result } = renderHook(() => useUrlImport(vi.fn()))

    await act(async () => {
      await result.current.handlePaste()
    })

    expect(result.current.urlValue).toBe('example.com/document.pdf')
  })

  it('keeps the value unchanged when clipboard read fails', async () => {
    const readText = vi.mocked(navigator.clipboard.readText)
    readText.mockRejectedValue(new Error('denied'))
    const { result } = renderHook(() => useUrlImport(vi.fn()))
    act(() => result.current.setUrlValue('existing.pdf'))

    await act(async () => {
      await result.current.handlePaste()
    })

    expect(result.current.urlValue).toBe('existing.pdf')
  })
})
