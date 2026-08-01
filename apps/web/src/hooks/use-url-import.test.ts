import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, type MockInstance, vi } from 'vitest'
import { useUrlImport } from './use-url-import'

vi.mock('motion/react', () => ({
  useAnimate: () => [{ current: null }, vi.fn()],
}))

function pdfResponse(status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: { get: () => 'application/pdf' },
    blob: async () => new Blob(['pdf'], { type: 'application/pdf' }),
  } as unknown as Response
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
      await result.current.handleUrlSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>)
    })

    expect(onUrlImport).toHaveBeenCalledOnce()
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
      await result.current.handleUrlSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>)
    })

    expect(fetchSpy).toHaveBeenCalledWith('https://example.com/document.pdf')
  })

  it('does not fetch when the URL is empty', async () => {
    const { result } = renderHook(() => useUrlImport(vi.fn()))

    await act(async () => {
      await result.current.handleUrlSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>)
    })

    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('reports server errors', async () => {
    fetchSpy.mockResolvedValue(pdfResponse(500))
    const { result } = renderHook(() => useUrlImport(vi.fn()))
    act(() => result.current.setUrlValue('example.com/document.pdf'))

    await act(async () => {
      await result.current.handleUrlSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>)
    })

    expect(result.current.urlError).toBe('Server responded with 500')
  })

  it('rejects non-PDF content types', async () => {
    fetchSpy.mockResolvedValue({
      ok: true,
      status: 200,
      headers: { get: () => 'text/html' },
      blob: async () => new Blob(['<html></html>'], { type: 'text/html' }),
    } as unknown as Response)
    const { result } = renderHook(() => useUrlImport(vi.fn()))
    act(() => result.current.setUrlValue('example.com/page'))

    await act(async () => {
      await result.current.handleUrlSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>)
    })

    expect(result.current.urlError).toBe('URL does not point to a PDF')
  })

  it('reports unreachable URLs', async () => {
    fetchSpy.mockRejectedValue(new TypeError('Failed to fetch'))
    const { result } = renderHook(() => useUrlImport(vi.fn()))
    act(() => result.current.setUrlValue('example.com/document.pdf'))

    await act(async () => {
      await result.current.handleUrlSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>)
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
