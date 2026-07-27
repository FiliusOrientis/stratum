import { create } from 'zustand'

export interface Book {
  id: string
  title: string
  author?: string
  coverBlob?: Blob
  pageCount: number
  lastPage: number
  lastRead?: Date
  addedAt: Date
  tags?: string[]
}

interface CatalogState {
  books: Book[]
  isLoading: boolean
  error: string | null
}

interface CatalogActions {
  addBook: (book: Book) => void
  removeBook: (id: string) => void
  setBooks: (books: Book[]) => void
  updateBook: (id: string, partial: Partial<Book>) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useCatalogStore = create<CatalogState & CatalogActions>(set => ({
  books: [],
  isLoading: false,
  error: null,
  addBook: book => set(s => ({ books: [...s.books, book] })),
  removeBook: id => set(s => ({ books: s.books.filter(b => b.id !== id) })),
  setBooks: books => set({ books }),
  updateBook: (id, partial) =>
    set(s => ({
      books: s.books.map(b => (b.id === id ? { ...b, ...partial } : b)),
    })),
  setLoading: isLoading => set({ isLoading }),
  setError: error => set({ error }),
}))
