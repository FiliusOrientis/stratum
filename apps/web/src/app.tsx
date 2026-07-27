import { createBrowserRouter, RouterProvider } from 'react-router'
import { CatalogPage, ReaderPage } from './routes'

const router = createBrowserRouter([
  // biome-ignore lint/style/useNamingConvention: React Router v8 requires PascalCase Component property
  { path: '/', Component: CatalogPage },
  // biome-ignore lint/style/useNamingConvention: React Router v8 requires PascalCase Component property
  { path: '/reader/:bookId', Component: ReaderPage },
])

export function App() {
  return <RouterProvider router={router} />
}
