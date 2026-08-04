import { beforeEach, describe, expect, it } from 'vitest'
import { useViewerStore } from './viewer.store'

const initialState = {
  currentPage: 1,
  pageCount: 0,
  zoomMode: 'fit' as const,
  zoomLevel: 1,
  coverType: 'none' as const,
  isFullscreen: false,
  isReady: false,
}

describe('viewerStore', () => {
  beforeEach(() => {
    useViewerStore.setState(initialState)
  })

  it('has default state', () => {
    const state = useViewerStore.getState()
    expect(state.currentPage).toBe(1)
    expect(state.zoomMode).toBe('fit')
    expect(state.isFullscreen).toBe(false)
  })

  it('sets page', () => {
    useViewerStore.getState().setPage(5)
    expect(useViewerStore.getState().currentPage).toBe(5)
  })

  it('sets page count', () => {
    useViewerStore.getState().setPageCount(42)
    expect(useViewerStore.getState().pageCount).toBe(42)
  })

  it('next page advances', () => {
    useViewerStore.setState({ currentPage: 1, pageCount: 10 })
    useViewerStore.getState().nextPage()
    expect(useViewerStore.getState().currentPage).toBe(2)
  })

  it('next page does not exceed max', () => {
    useViewerStore.setState({ currentPage: 10, pageCount: 10 })
    useViewerStore.getState().nextPage()
    expect(useViewerStore.getState().currentPage).toBe(10)
  })

  it('prev page goes back', () => {
    useViewerStore.setState({ currentPage: 5, pageCount: 10 })
    useViewerStore.getState().prevPage()
    expect(useViewerStore.getState().currentPage).toBe(4)
  })

  it('prev page does not go below 1', () => {
    useViewerStore.setState({ currentPage: 1, pageCount: 10 })
    useViewerStore.getState().prevPage()
    expect(useViewerStore.getState().currentPage).toBe(1)
  })

  it('zoom in switches to custom mode', () => {
    useViewerStore.getState().zoomIn()
    const state = useViewerStore.getState()
    expect(state.zoomMode).toBe('custom')
    expect(state.zoomLevel).toBe(1.25)
  })

  it('zoom in increments custom level', () => {
    useViewerStore.setState({ zoomMode: 'custom', zoomLevel: 1 })
    useViewerStore.getState().zoomIn()
    expect(useViewerStore.getState().zoomLevel).toBe(1.25)
  })

  it('zoom out switches to custom mode', () => {
    useViewerStore.getState().zoomOut()
    const state = useViewerStore.getState()
    expect(state.zoomMode).toBe('custom')
    expect(state.zoomLevel).toBe(0.75)
  })

  it('toggles fullscreen', () => {
    useViewerStore.getState().toggleFullscreen()
    expect(useViewerStore.getState().isFullscreen).toBe(true)
    useViewerStore.getState().toggleFullscreen()
    expect(useViewerStore.getState().isFullscreen).toBe(false)
  })

  it('sets zoom mode', () => {
    useViewerStore.getState().setZoomMode('width')
    expect(useViewerStore.getState().zoomMode).toBe('width')
  })

  it('sets zoom level', () => {
    useViewerStore.getState().setZoomLevel(2.5)
    expect(useViewerStore.getState().zoomLevel).toBe(2.5)
  })

  it('sets cover type', () => {
    useViewerStore.getState().setCoverType('basic')
    expect(useViewerStore.getState().coverType).toBe('basic')
  })

  it('sets ready state', () => {
    useViewerStore.getState().setReady(true)
    expect(useViewerStore.getState().isReady).toBe(true)
  })
})
