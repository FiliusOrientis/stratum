import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { DocumentImport } from './document-import'

describe('DocumentImport', () => {
  const handlers = () => ({ onImport: vi.fn(), onUrlImport: vi.fn() })

  it('renders the initial variant', () => {
    const h = handlers()
    render(<DocumentImport {...h} />)
    expect(screen.getByText('Open a document')).toBeInTheDocument()
    expect(screen.getByText('Drop a PDF or click to browse')).toBeInTheDocument()
  })

  it('renders the cleared variant', () => {
    const h = handlers()
    render(<DocumentImport variant="cleared" {...h} />)
    expect(screen.getByText('Start again?')).toBeInTheDocument()
  })

  it('calls onImport when the card is clicked', async () => {
    const h = handlers()
    render(<DocumentImport {...h} />)
    await userEvent.click(screen.getByRole('button', { name: 'Open or drop a PDF file' }))
    expect(h.onImport).toHaveBeenCalledOnce()
  })

  it('keeps the URL panel collapsed by default', () => {
    const h = handlers()
    render(<DocumentImport {...h} />)
    expect(screen.getByRole('button', { name: 'Import from URL' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Hide URL input' })).not.toBeInTheDocument()
  })

  it('opens the URL panel when the toggle is clicked', async () => {
    const h = handlers()
    render(<DocumentImport {...h} />)
    await userEvent.click(screen.getByRole('button', { name: 'Import from URL' }))
    expect(screen.getByRole('button', { name: 'Hide URL input' })).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Paste a PDF link')).toBeInTheDocument()
  })

  it('focuses the URL input when the panel expands', async () => {
    const h = handlers()
    render(<DocumentImport {...h} />)
    await userEvent.click(screen.getByRole('button', { name: 'Import from URL' }))
    expect(screen.getByLabelText('URL of a PDF document')).toHaveFocus()
  })

  it('does not focus the URL input when the panel is collapsed', () => {
    const h = handlers()
    render(<DocumentImport {...h} />)
    expect(screen.getByLabelText('URL of a PDF document')).not.toHaveFocus()
  })

  it('closes the URL panel when the toggle is clicked again', async () => {
    const h = handlers()
    render(<DocumentImport {...h} />)
    await userEvent.click(screen.getByRole('button', { name: 'Import from URL' }))
    await userEvent.click(screen.getByRole('button', { name: 'Hide URL input' }))
    expect(screen.getByRole('button', { name: 'Import from URL' })).toBeInTheDocument()
  })
})
