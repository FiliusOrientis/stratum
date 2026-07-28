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
    const prev = screen.getAllByLabelText('Previous page')
    const next = screen.getAllByLabelText('Next page')
    expect(prev.length).toBeGreaterThanOrEqual(1)
    expect(next.length).toBeGreaterThanOrEqual(1)
  })

  it('renders zoom controls', () => {
    render(<ReaderToolbar />)
    expect(screen.getByLabelText('Zoom out')).toBeInTheDocument()
    expect(screen.getByLabelText('Zoom in')).toBeInTheDocument()
  })

  it('renders fullscreen button', () => {
    render(<ReaderToolbar />)
    const buttons = screen.getAllByLabelText('Fullscreen')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('shows trigger button when hidden', () => {
    useToolbarStore.setState({ position: 'hidden', previousPosition: 'top' })
    render(<ReaderToolbar />)
    expect(screen.getByLabelText('Show toolbar')).toBeInTheDocument()
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
