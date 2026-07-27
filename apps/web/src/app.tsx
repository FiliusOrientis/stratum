import { createBrowserRouter, RouterProvider } from 'react-router'
import { Home } from './routes/home'

const router = createBrowserRouter([
  // biome-ignore lint/style/useNamingConvention: React Router v7 requires PascalCase Component property
  { path: '/', Component: Home },
])

export function App() {
  return <RouterProvider router={router} />
}
