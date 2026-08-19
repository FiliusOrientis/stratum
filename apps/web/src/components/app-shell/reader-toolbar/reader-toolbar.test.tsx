import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { useToolbarStore } from '@/stores/toolbar.store'
import { useViewerStore } from '@/stores/viewer.store'
import { ReaderToolbar } from './reader-toolbar'

describe('ReaderToolbar', () => {
  beforeEach(() => {
    useToolbarStore.setState({
      position: 'top',
      previousPosition: 'top',
      isTocDrawerOpen: false,
      isCatalogDrawerOpen: false,
    })
    useViewerStore.setState({
      currentPage: 1,
      pageCount: 10,
      zoomMode: 'fit',
      zoomLevel: 1,
      coverType: 'none',
      isFullscreen: false,
      isReady: false,
    })
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

  it('disables previous page on first page', () => {
    useViewerStore.setState({ currentPage: 1, pageCount: 5 })
    render(<ReaderToolbar />)
    const prevButtons = screen.getAllByLabelText('Previous page')
    for (const btn of prevButtons) {
      expect(btn).toBeDisabled()
    }
  })

  it('disables next page on last page', () => {
    useViewerStore.setState({ currentPage: 5, pageCount: 5 })
    render(<ReaderToolbar />)
    const nextButtons = screen.getAllByLabelText('Next page')
    for (const btn of nextButtons) {
      expect(btn).toBeDisabled()
    }
  })

  it('enables previous page after first page', () => {
    useViewerStore.setState({ currentPage: 2, pageCount: 5 })
    render(<ReaderToolbar />)
    const prevButtons = screen.getAllByLabelText('Previous page')
    for (const btn of prevButtons) {
      expect(btn).not.toBeDisabled()
    }
  })

  it('enables next page before last page', () => {
    useViewerStore.setState({ currentPage: 3, pageCount: 5 })
    render(<ReaderToolbar />)
    const nextButtons = screen.getAllByLabelText('Next page')
    for (const btn of nextButtons) {
      expect(btn).not.toBeDisabled()
    }
  })

  it('calls nextPage on next button click', async () => {
    useViewerStore.setState({ currentPage: 1, pageCount: 5 })
    render(<ReaderToolbar />)
    const nextBtns = screen.getAllByLabelText('Next page')
    // SAFETY: the desktop toolbar renders one Next page button for every rendered state
    await userEvent.click(nextBtns[0] as HTMLElement)
    expect(useViewerStore.getState().currentPage).toBe(2)
  })

  it('calls prevPage on prev button click', async () => {
    useViewerStore.setState({ currentPage: 3, pageCount: 5 })
    render(<ReaderToolbar />)
    const prevBtns = screen.getAllByLabelText('Previous page')
    // SAFETY: the desktop toolbar renders one Previous page button for every rendered state
    await userEvent.click(prevBtns[0] as HTMLElement)
    expect(useViewerStore.getState().currentPage).toBe(2)
  })
})
