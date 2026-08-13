import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { useToolbarStore } from '@/stores/toolbar.store'
import { useViewerStore } from '@/stores/viewer.store'
import { ToolbarControls } from './reader-toolbar-controls'

describe('ToolbarControls', () => {
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
    render(<ToolbarControls isTop={true} />)
    expect(screen.getAllByLabelText('Previous page').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByLabelText('Next page').length).toBeGreaterThanOrEqual(1)
  })

  it('renders zoom, fullscreen and hide buttons', () => {
    render(<ToolbarControls isTop={true} />)
    expect(screen.getByLabelText('Zoom out')).toBeInTheDocument()
    expect(screen.getByLabelText('Zoom in')).toBeInTheDocument()
    expect(screen.getAllByLabelText('Fullscreen').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByLabelText('Hide toolbar').length).toBeGreaterThanOrEqual(1)
  })

  it('labels the position button move-to-bottom at top', () => {
    render(<ToolbarControls isTop={true} />)
    expect(screen.getAllByLabelText('Move to bottom').length).toBeGreaterThanOrEqual(1)
  })

  it('labels the position button move-to-top at bottom', () => {
    render(<ToolbarControls isTop={false} />)
    expect(screen.getAllByLabelText('Move to top').length).toBeGreaterThanOrEqual(1)
  })

  it('disables previous page on first page and next page on last page', () => {
    useViewerStore.setState({ currentPage: 1, pageCount: 1 })
    render(<ToolbarControls isTop={true} />)
    for (const button of screen.getAllByLabelText('Previous page')) {
      expect(button).toBeDisabled()
    }
    for (const button of screen.getAllByLabelText('Next page')) {
      expect(button).toBeDisabled()
    }
  })

  it('moves the position button via setPosition', async () => {
    render(<ToolbarControls isTop={true} />)
    const move = screen.getAllByLabelText('Move to bottom')[0] as HTMLElement
    await move.click()
    expect(useToolbarStore.getState().position).toBe('bottom')
  })
})
