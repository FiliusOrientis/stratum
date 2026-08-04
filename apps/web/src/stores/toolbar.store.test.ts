import { beforeEach, describe, expect, it } from 'vitest'
import { useToolbarStore } from './toolbar.store'

const initialState = {
  position: 'top' as const,
  previousPosition: 'top' as const,
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

  it('hide saves previous position and sets hidden', () => {
    useToolbarStore.getState().hide()
    const state = useToolbarStore.getState()
    expect(state.position).toBe('hidden')
    expect(state.previousPosition).toBe('top')
  })

  it('show restores previous position', () => {
    useToolbarStore.getState().hide()
    useToolbarStore.getState().show()
    expect(useToolbarStore.getState().position).toBe('top')
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
