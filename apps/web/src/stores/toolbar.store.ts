import { create } from 'zustand'

export type ToolbarPosition = 'top' | 'bottom' | 'hidden'

interface ToolbarState {
  position: ToolbarPosition
  isTocDrawerOpen: boolean
  isCatalogDrawerOpen: boolean
}

interface ToolbarActions {
  setPosition: (pos: ToolbarPosition) => void
  toggleTocDrawer: () => void
  setTocDrawerOpen: (open: boolean) => void
  toggleCatalogDrawer: () => void
  setCatalogDrawerOpen: (open: boolean) => void
  closeAllDrawers: () => void
}

export const useToolbarStore = create<ToolbarState & ToolbarActions>(set => ({
  position: 'top',
  isTocDrawerOpen: false,
  isCatalogDrawerOpen: false,
  setPosition: position => set({ position }),
  toggleTocDrawer: () => set(s => ({ isTocDrawerOpen: !s.isTocDrawerOpen })),
  setTocDrawerOpen: isTocDrawerOpen => set({ isTocDrawerOpen }),
  toggleCatalogDrawer: () => set(s => ({ isCatalogDrawerOpen: !s.isCatalogDrawerOpen })),
  setCatalogDrawerOpen: isCatalogDrawerOpen => set({ isCatalogDrawerOpen }),
  closeAllDrawers: () => set({ isTocDrawerOpen: false, isCatalogDrawerOpen: false }),
}))
