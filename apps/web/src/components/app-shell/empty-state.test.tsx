import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { EmptyState } from './empty-state'

const noop = () => undefined
const HELPER_TEXT_PATTERN = /example\.com\/document\.pdf/

function getSubmitButton(): HTMLButtonElement {
  const buttons = screen.getAllByRole('button')
  return buttons.find(btn => btn.getAttribute('type') === 'submit') as HTMLButtonElement
}

describe('EmptyState', () => {
  it('renders the wordmark in the initial variant', () => {
    render(<EmptyState onImport={noop} onUrlImport={noop} />)
    expect(screen.getAllByAltText('Stratum')).toHaveLength(2)
  })

  it('renders the wordmark in the cleared variant', () => {
    render(<EmptyState variant="cleared" onImport={noop} onUrlImport={noop} />)
    expect(screen.getAllByAltText('Stratum')).toHaveLength(2)
  })

  it('renders import card with initial text', () => {
    render(<EmptyState onImport={noop} onUrlImport={noop} />)
    expect(screen.getByText('Open a document')).toBeInTheDocument()
    expect(screen.getByText('Drop a PDF or click here to browse')).toBeInTheDocument()
  })

  it('renders import card with cleared text', () => {
    render(<EmptyState variant="cleared" onImport={noop} onUrlImport={noop} />)
    expect(screen.getByText('Start again?')).toBeInTheDocument()
  })

  it('calls onImport when card is clicked', async () => {
    const onImport = vi.fn()
    render(<EmptyState onImport={onImport} onUrlImport={noop} />)
    const card = screen.getByRole('button', {
      name: 'Open or drop a PDF file',
    })
    await userEvent.click(card)
    expect(onImport).toHaveBeenCalledOnce()
  })

  it('calls onImport on Enter key on card', async () => {
    const onImport = vi.fn()
    render(<EmptyState onImport={onImport} onUrlImport={noop} />)
    const card = screen.getByRole('button', {
      name: 'Open or drop a PDF file',
    })
    card.focus()
    await userEvent.keyboard('{Enter}')
    expect(onImport).toHaveBeenCalledOnce()
  })

  it('calls onImport on Space key on card', async () => {
    const onImport = vi.fn()
    render(<EmptyState onImport={onImport} onUrlImport={noop} />)
    const card = screen.getByRole('button', {
      name: 'Open or drop a PDF file',
    })
    card.focus()
    await userEvent.keyboard('{ }')
    expect(onImport).toHaveBeenCalledOnce()
  })

  it('renders URL input with placeholder', () => {
    render(<EmptyState onImport={noop} onUrlImport={noop} />)
    expect(screen.getByPlaceholderText('Paste a PDF link')).toBeInTheDocument()
  })

  it('renders as region landmark with aria-label', () => {
    render(<EmptyState onImport={noop} onUrlImport={noop} />)
    const region = screen.getByRole('region')
    expect(region).toHaveAttribute('aria-label', 'Empty catalog')
  })

  it('card has correct aria role and label', () => {
    render(<EmptyState onImport={noop} onUrlImport={noop} />)
    const card = screen.getByRole('button', {
      name: 'Open or drop a PDF file',
    })
    expect(card).toBeInTheDocument()
  })

  it('renders helper text for URL input', () => {
    render(<EmptyState onImport={noop} onUrlImport={noop} />)
    expect(screen.getByText(HELPER_TEXT_PATTERN)).toBeInTheDocument()
  })

  it('shows paste button when URL input is empty', () => {
    render(<EmptyState onImport={noop} onUrlImport={noop} />)
    expect(screen.getByLabelText('Paste URL from clipboard')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Submit URL' })).not.toBeInTheDocument()
  })

  it('calls onUrlImport with File on successful URL submission', async () => {
    const user = userEvent.setup()
    const onUrlImport = vi.fn()
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response('pdf content', {
        status: 200,
        headers: { 'Content-Type': 'application/pdf' },
      }),
    )
    render(<EmptyState onImport={noop} onUrlImport={onUrlImport} />)
    await user.type(screen.getByPlaceholderText('Paste a PDF link'), 'https://example.com/doc.pdf')
    await user.click(getSubmitButton())
    expect(onUrlImport).toHaveBeenCalledOnce()
    expect(onUrlImport).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'doc.pdf', type: 'application/pdf' }),
    )
    vi.restoreAllMocks()
  })

  it('shows error message on fetch failure', async () => {
    const user = userEvent.setup()
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network error'))
    render(<EmptyState onImport={noop} onUrlImport={noop} />)
    await user.type(screen.getByPlaceholderText('Paste a PDF link'), 'https://example.com/doc.pdf')
    await user.click(getSubmitButton())
    expect(await screen.findByText('Could not reach this URL')).toBeInTheDocument()
    vi.restoreAllMocks()
  })

  it('shows error for non-PDF content-type', async () => {
    const user = userEvent.setup()
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response('not pdf', {
        status: 200,
        headers: { 'Content-Type': 'text/html' },
      }),
    )
    render(<EmptyState onImport={noop} onUrlImport={noop} />)
    await user.type(screen.getByPlaceholderText('Paste a PDF link'), 'https://example.com/doc.pdf')
    await user.click(getSubmitButton())
    expect(await screen.findByText('URL does not point to a PDF')).toBeInTheDocument()
    vi.restoreAllMocks()
  })

  it('clears error when user types after failed submission', async () => {
    const user = userEvent.setup()
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('fail'))
    render(<EmptyState onImport={noop} onUrlImport={noop} />)
    const input = screen.getByPlaceholderText('Paste a PDF link')
    await user.type(input, 'https://example.com/bad.pdf')
    await user.click(getSubmitButton())
    expect(await screen.findByText('Could not reach this URL')).toBeInTheDocument()
    await user.type(input, 'x')
    expect(screen.queryByText('Could not reach this URL')).not.toBeInTheDocument()
    vi.restoreAllMocks()
  })

  it('calls onImport on Ctrl+O keyboard shortcut', () => {
    const onImport = vi.fn()
    render(<EmptyState onImport={onImport} onUrlImport={noop} />)
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'o', ctrlKey: true }))
    expect(onImport).toHaveBeenCalledOnce()
  })

  it('calls onImport on Cmd+O keyboard shortcut', () => {
    const onImport = vi.fn()
    render(<EmptyState onImport={onImport} onUrlImport={noop} />)
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'o', metaKey: true }))
    expect(onImport).toHaveBeenCalledOnce()
  })

  it('does not call onImport when Ctrl+O typed in URL input', () => {
    const onImport = vi.fn()
    render(<EmptyState onImport={onImport} onUrlImport={noop} />)
    const input = screen.getByPlaceholderText('Paste a PDF link')
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'o', ctrlKey: true, bubbles: true }))
    expect(onImport).not.toHaveBeenCalled()
  })
})
