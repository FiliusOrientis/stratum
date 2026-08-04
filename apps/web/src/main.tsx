import { ThemeProvider } from 'next-themes'
import { createRoot } from 'react-dom/client'
import { App } from './app'
import { ErrorBoundary } from './components/error-boundary'
import { Toaster } from './components/ui/sonner'
import './styles/globals.css'

const root = document.getElementById('root')
if (!root) {
  throw new Error('Root element not found')
}

createRoot(root).render(
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem={true}
    disableTransitionOnChange={true}
  >
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
    <Toaster />
  </ThemeProvider>,
)
