import { beforeEach, describe, expect, it } from 'vitest'
import { type Book, useCatalogStore } from './catalog.store'

const mockBook: Book = {
  id: 'test-1',
  title: 'Test Book',
  pageCount: 100,
  lastPage: 1,
  addedAt: new Date(),
}

const initialState = { books: [], isLoading: false, error: null }

describe('catalogStore', () => {
  beforeEach(() => {
    useCatalogStore.setState(initialState)
  })

  it('starts empty', () => {
    expect(useCatalogStore.getState().books).toEqual([])
  })

  it('adds a book', () => {
    const store = useCatalogStore.getState()
    store.addBook(mockBook)
    const books = useCatalogStore.getState().books
    expect(books).toHaveLength(1)
    expect(books[0]?.title).toBe('Test Book')
  })

  it('removes a book', () => {
    useCatalogStore.getState().addBook(mockBook)
    useCatalogStore.getState().removeBook('test-1')
    expect(useCatalogStore.getState().books).toHaveLength(0)
  })

  it('updates a book', () => {
    useCatalogStore.getState().addBook(mockBook)
    useCatalogStore.getState().updateBook('test-1', { lastPage: 42 })
    const books = useCatalogStore.getState().books
    expect(books[0]?.lastPage).toBe(42)
  })

  it('updateBook ignores non-matching id', () => {
    useCatalogStore.getState().addBook(mockBook)
    useCatalogStore.getState().updateBook('nonexistent', { title: 'Changed' })
    const books = useCatalogStore.getState().books
    expect(books[0]?.title).toBe('Test Book')
  })

  it('sets loading state', () => {
    useCatalogStore.getState().setLoading(true)
    expect(useCatalogStore.getState().isLoading).toBe(true)
  })

  it('sets error state', () => {
    useCatalogStore.getState().setError('something went wrong')
    expect(useCatalogStore.getState().error).toBe('something went wrong')
    useCatalogStore.getState().setError(null)
    expect(useCatalogStore.getState().error).toBeNull()
  })
})
