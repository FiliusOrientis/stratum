import { beforeEach, describe, expect, it } from 'vitest'
import { useToolbarStore } from './toolbar.store'

const initialState = {
  position: 'top' as const,
  isTocDrawerOpen: false,
  isCatalogDrawerOpen: false,
}

describe('toolbarStore', () => {
  beforeEach(() => {
    useToolbarStore.setState(initialState)
  })

  it('has default position', () => {
    expect(useToolbarStore.getState().position).toBe('top')
  })

  it('sets position', () => {
    useToolbarStore.getState().setPosition('bottom')
    expect(useToolbarStore.getState().position).toBe('bottom')
  })

  it('toggles TOC drawer', () => {
    useToolbarStore.getState().toggleTocDrawer()
    expect(useToolbarStore.getState().isTocDrawerOpen).toBe(true)
    useToolbarStore.getState().toggleTocDrawer()
    expect(useToolbarStore.getState().isTocDrawerOpen).toBe(false)
  })

  it('sets TOC drawer explicitly', () => {
    useToolbarStore.getState().setTocDrawerOpen(true)
    expect(useToolbarStore.getState().isTocDrawerOpen).toBe(true)
  })

  it('sets catalog drawer explicitly', () => {
    useToolbarStore.getState().setCatalogDrawerOpen(true)
    expect(useToolbarStore.getState().isCatalogDrawerOpen).toBe(true)
  })

  it('toggles catalog drawer', () => {
    useToolbarStore.getState().toggleCatalogDrawer()
    expect(useToolbarStore.getState().isCatalogDrawerOpen).toBe(true)
  })

  it('closes all drawers', () => {
    useToolbarStore.setState({ isTocDrawerOpen: true, isCatalogDrawerOpen: true })
    useToolbarStore.getState().closeAllDrawers()
    expect(useToolbarStore.getState().isTocDrawerOpen).toBe(false)
    expect(useToolbarStore.getState().isCatalogDrawerOpen).toBe(false)
  })
})
