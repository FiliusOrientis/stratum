import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { useToolbarStore, useViewerStore } from '@/stores'
import { ReaderToolbar } from './reader-toolbar'

describe('ReaderToolbar', () => {
  beforeEach(() => {
    useToolbarStore.setState({
      position: 'top',
      isTocDrawerOpen: false,
      isCatalogDrawerOpen: false,
    })
    useViewerStore.setState({ currentPage: 1, pageCount: 10, zoomMode: 'fit', zoomLevel: 1 })
  })

  it('renders navigation controls', () => {
    render(<ReaderToolbar />)
    expect(screen.getByLabelText('Previous page')).toBeInTheDocument()
    expect(screen.getByLabelText('Next page')).toBeInTheDocument()
  })

  it('renders zoom controls', () => {
    render(<ReaderToolbar />)
    expect(screen.getByLabelText('Zoom out')).toBeInTheDocument()
    expect(screen.getByLabelText('Zoom in')).toBeInTheDocument()
  })

  it('renders fullscreen and settings', () => {
    render(<ReaderToolbar />)
    expect(screen.getByLabelText('Fullscreen')).toBeInTheDocument()
    expect(screen.getByLabelText('Settings')).toBeInTheDocument()
  })

  it('renders nothing when position is hidden', () => {
    useToolbarStore.setState({ position: 'hidden' })
    const { container } = render(<ReaderToolbar />)
    expect(container.innerHTML).toBe('')
  })

  it('shows hide toolbar button', () => {
    render(<ReaderToolbar />)
    expect(screen.getByLabelText('Hide toolbar')).toBeInTheDocument()
  })

  it('shows move-position button', () => {
    render(<ReaderToolbar />)
    expect(screen.getByLabelText('Move to bottom')).toBeInTheDocument()
  })

  it('shows move to top when at bottom', () => {
    useToolbarStore.setState({ position: 'bottom' })
    render(<ReaderToolbar />)
    expect(screen.getByLabelText('Move to top')).toBeInTheDocument()
  })
})
