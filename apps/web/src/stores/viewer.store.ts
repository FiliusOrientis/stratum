import { create } from 'zustand'

type ZoomMode = 'fit' | 'width' | 'custom'
type CoverType = 'none' | 'plain' | 'basic' | 'ridge'

const ZOOM_MIN = 0.5
const ZOOM_MAX = 5
const ZOOM_STEP = 0.25
const ZOOM_INITIAL_IN = 1.25
const ZOOM_INITIAL_OUT = 0.75

function clampPage(page: number, pageCount: number): number {
  if (pageCount < 1) {
    return 1
  }
  return Math.min(pageCount, Math.max(1, page))
}

function clampZoom(level: number): number {
  return Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, level))
}

interface ViewerState {
  currentPage: number
  pageCount: number
  zoomMode: ZoomMode
  zoomLevel: number
  coverType: CoverType
  isFullscreen: boolean
  isReady: boolean
}

interface ViewerActions {
  setPage: (page: number) => void
  setPageCount: (count: number) => void
  setZoomMode: (mode: ZoomMode) => void
  setZoomLevel: (level: number) => void
  setCoverType: (type: CoverType) => void
  toggleFullscreen: () => void
  setReady: (ready: boolean) => void
  nextPage: () => void
  prevPage: () => void
  zoomIn: () => void
  zoomOut: () => void
}

export const useViewerStore = create<ViewerState & ViewerActions>((set, get) => ({
  currentPage: 1,
  pageCount: 0,
  zoomMode: 'fit',
  zoomLevel: 1,
  coverType: 'none',
  isFullscreen: false,
  isReady: false,
  setPage: page => set(s => ({ currentPage: clampPage(page, s.pageCount) })),
  setPageCount: pageCount =>
    set(s => ({ pageCount, currentPage: clampPage(s.currentPage, pageCount) })),
  setZoomMode: zoomMode => set({ zoomMode }),
  setZoomLevel: zoomLevel => set({ zoomLevel: clampZoom(zoomLevel) }),
  setCoverType: coverType => set({ coverType }),
  toggleFullscreen: () => set(s => ({ isFullscreen: !s.isFullscreen })),
  setReady: isReady => set({ isReady }),
  nextPage: () => {
    const { currentPage, pageCount } = get()
    if (currentPage < pageCount) {
      set({ currentPage: currentPage + 1 })
    }
  },
  prevPage: () => {
    const { currentPage } = get()
    if (currentPage > 1) {
      set({ currentPage: currentPage - 1 })
    }
  },
  zoomIn: () => {
    const { zoomMode, zoomLevel } = get()
    if (zoomMode === 'custom') {
      set({ zoomLevel: clampZoom(+(zoomLevel + ZOOM_STEP).toFixed(2)) })
    } else {
      set({ zoomMode: 'custom', zoomLevel: ZOOM_INITIAL_IN })
    }
  },
  zoomOut: () => {
    const { zoomMode, zoomLevel } = get()
    if (zoomMode === 'custom') {
      set({ zoomLevel: clampZoom(+(zoomLevel - ZOOM_STEP).toFixed(2)) })
    } else {
      set({ zoomMode: 'custom', zoomLevel: ZOOM_INITIAL_OUT })
    }
  },
}))
