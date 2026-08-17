import { create } from 'zustand'

type ToolbarPosition = 'top' | 'bottom' | 'hidden'

interface ToolbarState {
  position: ToolbarPosition
  previousPosition: ToolbarPosition
  isTocDrawerOpen: boolean
  isCatalogDrawerOpen: boolean
}

interface ToolbarActions {
  setPosition: (pos: ToolbarPosition) => void
  hide: () => void
  show: () => void
  toggleTocDrawer: () => void
  setTocDrawerOpen: (open: boolean) => void
  toggleCatalogDrawer: () => void
  setCatalogDrawerOpen: (open: boolean) => void
  closeAllDrawers: () => void
}

export const useToolbarStore = create<ToolbarState & ToolbarActions>((set, get) => ({
  position: 'top',
  previousPosition: 'top',
  isTocDrawerOpen: false,
  isCatalogDrawerOpen: false,
  setPosition: position => set({ position }),
  hide: () => {
    const { position } = get()
    if (position !== 'hidden') {
      set({ position: 'hidden', previousPosition: position })
    }
  },
  show: () => {
    const { previousPosition } = get()
    set({ position: previousPosition })
  },
  toggleTocDrawer: () => set(s => ({ isTocDrawerOpen: !s.isTocDrawerOpen })),
  setTocDrawerOpen: isTocDrawerOpen => set({ isTocDrawerOpen }),
  toggleCatalogDrawer: () => set(s => ({ isCatalogDrawerOpen: !s.isCatalogDrawerOpen })),
  setCatalogDrawerOpen: isCatalogDrawerOpen => set({ isCatalogDrawerOpen }),
  closeAllDrawers: () => set({ isTocDrawerOpen: false, isCatalogDrawerOpen: false }),
}))
