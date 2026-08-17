import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useCatalogStore } from '@/stores/catalog.store'
import { CatalogPage } from './catalog-page'

// oxlint-disable-next-line anti-slop/no-module-mocking -- internal seam: converts to DI when the services layer lands
vi.mock('@/lib/pdf-import', () => ({
  importPdf: vi.fn().mockResolvedValue({
    title: 'test-doc',
    fingerprint: 'mock-fingerprint',
  }),
}))

const { toastSpy } = vi.hoisted(() => ({ toastSpy: { error: vi.fn() } }))

// oxlint-disable-next-line anti-slop/no-module-mocking -- external sonner dependency mocked at the boundary
vi.mock('sonner', () => ({
  toast: toastSpy,
}))

function seedBook(id: string, title: string) {
  return { id, title, pageCount: 10, lastPage: 1, addedAt: new Date() }
}

describe('CatalogPage', () => {
  beforeEach(() => {
    useCatalogStore.setState({ books: [], error: null })
    toastSpy.error.mockClear()
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

  it('renders singular book count', () => {
    useCatalogStore.setState({ books: [seedBook('1', 'Test Book')] })
    render(<CatalogPage />)
    expect(screen.getByText('1 book imported')).toBeInTheDocument()
  })

  it('renders pluralized book count', () => {
    useCatalogStore.setState({
      books: [seedBook('1', 'A'), seedBook('2', 'B')],
    })
    render(<CatalogPage />)
    expect(screen.getByText('2 books imported')).toBeInTheDocument()
  })

  it('shows an error toast when the catalog store reports an import error', () => {
    useCatalogStore.setState({ error: 'Import failed' })
    render(<CatalogPage />)
    expect(toastSpy.error).toHaveBeenCalledWith('Import failed')
  })

  it('triggers file input when import card is clicked', async () => {
    render(<CatalogPage />)
    const card = screen.getByRole('button', { name: 'Open or drop a PDF file' })
    // biome-ignore lint/security/noSecrets: CSS selector, not a secret
    const hiddenInputs = document.querySelectorAll<HTMLInputElement>('input[type="file"]')
    expect(hiddenInputs.length).toBeGreaterThanOrEqual(1)
    // SAFETY: the length assertion above guarantees the first element exists
    const clickSpy = vi.spyOn(hiddenInputs[0] as HTMLInputElement, 'click')
    await userEvent.click(card)
    expect(clickSpy).toHaveBeenCalledOnce()
  })
})
