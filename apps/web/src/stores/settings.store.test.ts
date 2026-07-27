import { beforeEach, describe, expect, it } from 'vitest'
import { MAX_KEYS, useSettingsStore } from './settings.store'

const initialState = {
  geminiKeys: Array.from({ length: MAX_KEYS }, () => null),
  isDialogOpen: false,
}

describe('settingsStore', () => {
  beforeEach(() => {
    useSettingsStore.setState(initialState)
  })

  it('starts with 10 empty key slots', () => {
    const { geminiKeys } = useSettingsStore.getState()
    expect(geminiKeys).toHaveLength(MAX_KEYS)
    expect(geminiKeys.every(k => k === null)).toBe(true)
  })

  it('sets a key at a slot', () => {
    useSettingsStore.getState().setGeminiKey(0, 'abc-123')
    expect(useSettingsStore.getState().geminiKeys[0]).toBe('abc-123')
  })

  it('clears a key slot', () => {
    useSettingsStore.getState().setGeminiKey(0, 'abc-123')
    useSettingsStore.getState().clearGeminiKey(0)
    expect(useSettingsStore.getState().geminiKeys[0]).toBeNull()
  })

  it('opens and closes settings dialog', () => {
    useSettingsStore.getState().openSettings()
    expect(useSettingsStore.getState().isDialogOpen).toBe(true)
    useSettingsStore.getState().closeSettings()
    expect(useSettingsStore.getState().isDialogOpen).toBe(false)
  })

  it('toggles settings dialog', () => {
    useSettingsStore.getState().toggleSettings()
    expect(useSettingsStore.getState().isDialogOpen).toBe(true)
    useSettingsStore.getState().toggleSettings()
    expect(useSettingsStore.getState().isDialogOpen).toBe(false)
  })
})
