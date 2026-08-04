import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useCatalogStore } from '@/stores/catalog.store'
import { CatalogPage } from './catalog-page'

vi.mock('@/lib/pdf-import', () => ({
  importPdf: vi.fn().mockResolvedValue({
    title: 'test-doc',
    pageCount: 42,
    fingerprint: 'mock-fingerprint',
  }),
}))

describe('CatalogPage', () => {
  beforeEach(() => {
    useCatalogStore.setState({ books: [], isLoading: false, error: null })
  })

  it('renders EmptyState when no books', () => {
    render(<CatalogPage />)
    expect(screen.getAllByAltText('Stratum')).toHaveLength(2)
  })

  it('renders import card when no books', () => {
    render(<CatalogPage />)
    expect(screen.getByRole('button', { name: 'Open or drop a PDF file' })).toBeInTheDocument()
  })

  it('renders shortcuts FAB when no books', () => {
    render(<CatalogPage />)
    expect(screen.getByRole('button', { name: 'Keyboard shortcuts' })).toBeInTheDocument()
    expect(screen.queryByText('to open a file')).not.toBeInTheDocument()
  })

  it('opens the shortcuts panel from the FAB', async () => {
    render(<CatalogPage />)
    await userEvent.click(screen.getByRole('button', { name: 'Keyboard shortcuts' }))
    expect(screen.getByText('to open a file')).toBeInTheDocument()
    expect(screen.getByText('to toggle dark mode')).toBeInTheDocument()
  })

  it('renders book count when books exist', () => {
    useCatalogStore.setState({
      books: [
        {
          id: '1',
          title: 'Test Book',
          pageCount: 100,
          lastPage: 1,
          addedAt: new Date(),
        },
      ],
    })
    render(<CatalogPage />)
    expect(screen.getByText('1 book(s) imported')).toBeInTheDocument()
  })

  it('renders pluralized book count', () => {
    useCatalogStore.setState({
      books: [
        { id: '1', title: 'A', pageCount: 10, lastPage: 1, addedAt: new Date() },
        { id: '2', title: 'B', pageCount: 20, lastPage: 1, addedAt: new Date() },
      ],
    })
    render(<CatalogPage />)
    expect(screen.getByText('2 book(s) imported')).toBeInTheDocument()
  })

  it('triggers file input when import card is clicked', async () => {
    render(<CatalogPage />)
    const card = screen.getByRole('button', { name: 'Open or drop a PDF file' })
    // biome-ignore lint/security/noSecrets: CSS selector, not a secret
    const hiddenInputs = document.querySelectorAll<HTMLInputElement>('input[type="file"]')
    expect(hiddenInputs.length).toBeGreaterThanOrEqual(1)
    const clickSpy = vi.spyOn(hiddenInputs[0] as HTMLInputElement, 'click')
    await userEvent.click(card)
    expect(clickSpy).toHaveBeenCalledOnce()
  })
})
