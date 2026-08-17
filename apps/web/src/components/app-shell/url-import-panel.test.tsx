import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { UrlImportPanel } from './url-import-panel'
import type { UrlImportPanelProps } from './url-import-panel.types'

function props(overrides: Partial<UrlImportPanelProps> = {}): UrlImportPanelProps {
  return {
    scope: createRef<HTMLDivElement>(),
    urlValue: '',
    urlError: null,
    isLoading: false,
    handleUrlSubmit: vi.fn(async () => undefined),
    handlePaste: vi.fn(async () => undefined),
    handleClear: vi.fn(),
    setUrlValue: vi.fn(),
    isUrlOpen: true,
    ...overrides,
  }
}

describe('UrlImportPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows the paste button when empty and error-free', () => {
    render(<UrlImportPanel {...props()} />)
    expect(screen.getByRole('button', { name: 'Paste URL from clipboard' })).toBeInTheDocument()
  })

  it('shows the submit arrow when the input has content', () => {
    render(<UrlImportPanel {...props({ urlValue: 'example.com/document.pdf' })} />)
    expect(screen.getByRole('button', { name: 'Submit URL' })).toBeInTheDocument()
  })

  it('disables the submit button while loading', () => {
    render(<UrlImportPanel {...props({ urlValue: 'example.com/document.pdf', isLoading: true })} />)
    expect(screen.getByRole('button', { name: 'Submit URL' })).toBeDisabled()
  })

  it('shows the clear button and error message on error', () => {
    render(<UrlImportPanel {...props({ urlError: 'Could not reach this URL' })} />)
    expect(screen.getByRole('button', { name: 'Clear input' })).toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveTextContent('Could not reach this URL')
  })

  it('calls handlePaste from the paste button', async () => {
    const user = userEvent.setup()
    const handlePaste = vi.fn(async () => undefined)
    render(<UrlImportPanel {...props({ handlePaste })} />)
    await user.click(screen.getByRole('button', { name: 'Paste URL from clipboard' }))
    expect(handlePaste).toHaveBeenCalledOnce()
  })

  it('calls handleClear from the clear button', async () => {
    const user = userEvent.setup()
    const handleClear = vi.fn()
    render(<UrlImportPanel {...props({ urlError: 'Bad URL', handleClear })} />)
    await user.click(screen.getByRole('button', { name: 'Clear input' }))
    expect(handleClear).toHaveBeenCalledOnce()
  })
})
