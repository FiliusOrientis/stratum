import { beforeEach, describe, expect, it } from 'vitest'
import type { BookEntity } from '@/lib/storage'
import { useCatalogStore } from './catalog.store'

const mockBook: BookEntity = {
  id: 'test-1',
  title: 'Test Book',
  pageCount: 100,
  lastPage: 1,
  addedAt: new Date(),
}

const initialState = { books: [], error: null } satisfies { books: BookEntity[]; error: null }

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

  it('replaces an existing book with the same id', () => {
    useCatalogStore.getState().addBook(mockBook)
    useCatalogStore.getState().addBook({ ...mockBook, title: 'Updated Title' })
    const books = useCatalogStore.getState().books
    expect(books).toHaveLength(1)
    expect(books[0]?.title).toBe('Updated Title')
  })

  it('sets error state', () => {
    useCatalogStore.getState().setError('something went wrong')
    expect(useCatalogStore.getState().error).toBe('something went wrong')
    useCatalogStore.getState().setError(null)
    expect(useCatalogStore.getState().error).toBeNull()
  })
})
