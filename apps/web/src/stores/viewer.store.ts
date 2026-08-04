import { create } from 'zustand'

type ZoomMode = 'fit' | 'width' | 'custom'
type CoverType = 'none' | 'plain' | 'basic' | 'ridge'

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
  setPage: page => set({ currentPage: page }),
  setPageCount: pageCount => set({ pageCount }),
  setZoomMode: zoomMode => set({ zoomMode }),
  setZoomLevel: zoomLevel => set({ zoomLevel }),
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
      set({ zoomLevel: Math.min(5, +(zoomLevel + 0.25).toFixed(2)) })
    } else {
      set({ zoomMode: 'custom', zoomLevel: 1.25 })
    }
  },
  zoomOut: () => {
    const { zoomMode, zoomLevel } = get()
    if (zoomMode === 'custom') {
      set({ zoomLevel: Math.max(0.5, +(zoomLevel - 0.25).toFixed(2)) })
    } else {
      set({ zoomMode: 'custom', zoomLevel: 0.75 })
    }
  },
}))
