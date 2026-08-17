import { create } from 'zustand'
import type { BookEntity } from '@/lib/storage'

interface CatalogState {
  books: BookEntity[]
  error: string | null
}

interface CatalogActions {
  addBook: (book: BookEntity) => void
  setError: (error: string | null) => void
}

export const useCatalogStore = create<CatalogState & CatalogActions>(set => ({
  books: [],
  error: null,
  addBook: book =>
    set(s => ({
      books: s.books.some(b => b.id === book.id)
        ? s.books.map(b => (b.id === book.id ? book : b))
        : [...s.books, book],
    })),
  setError: error => set({ error }),
}))
