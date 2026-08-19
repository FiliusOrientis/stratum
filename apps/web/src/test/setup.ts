import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import type { ReactNode } from 'react'
import { afterEach, vi } from 'vitest'

afterEach(() => cleanup())

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: query === '(prefers-color-scheme: dark)',
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// oxlint-disable-next-line anti-slop/no-module-mocking -- external next-themes dependency mocked at the boundary
vi.mock('next-themes', () => ({
  // biome-ignore lint/style/useNamingConvention: mock key must match next-themes PascalCase export
  ThemeProvider: ({ children }: { children: ReactNode }) => children,
  useTheme: vi.fn(() => ({
    theme: 'dark',
    setTheme: vi.fn(),
    resolvedTheme: 'dark',
    themes: ['dark', 'light'],
  })),
}))
