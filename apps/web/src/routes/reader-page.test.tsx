import { render, screen } from '@testing-library/react'
import { useTheme } from 'next-themes'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useToolbarStore } from '@/stores/toolbar.store'
import { useViewerStore } from '@/stores/viewer.store'
import { ReaderPage } from './reader-page'

const mockUseTheme = vi.mocked(useTheme)

describe('ReaderPage', () => {
  beforeEach(() => {
    useViewerStore.setState({ currentPage: 1, pageCount: 0 })
    useToolbarStore.setState({ position: 'top', previousPosition: 'top' })
    mockUseTheme.mockReturnValue({
      theme: 'dark',
      setTheme: vi.fn(),
      resolvedTheme: 'dark',
      themes: ['dark', 'light'],
    })
  })

  it('renders the reader placeholder', () => {
    render(<ReaderPage />)
    expect(screen.getByText('3D Flipbook coming soon')).toBeInTheDocument()
  })

  it('renders the reader toolbar', () => {
    render(<ReaderPage />)
    expect(screen.getAllByRole('button', { name: 'Fullscreen' }).length).toBeGreaterThan(0)
  })
})
