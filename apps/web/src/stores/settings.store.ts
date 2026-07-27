import { create } from 'zustand'

export const MAX_KEYS = 10

interface SettingsState {
  geminiKeys: (string | null)[]
  isDialogOpen: boolean
}

interface SettingsActions {
  setGeminiKey: (slot: number, key: string | null) => void
  clearGeminiKey: (slot: number) => void
  openSettings: () => void
  closeSettings: () => void
  toggleSettings: () => void
}

export const useSettingsStore = create<SettingsState & SettingsActions>(set => ({
  geminiKeys: Array.from({ length: MAX_KEYS }, () => null),
  isDialogOpen: false,
  setGeminiKey: (slot, key) =>
    set(s => {
      const geminiKeys = [...s.geminiKeys]
      geminiKeys[slot] = key
      return { geminiKeys }
    }),
  clearGeminiKey: slot =>
    set(s => {
      const geminiKeys = [...s.geminiKeys]
      geminiKeys[slot] = null
      return { geminiKeys }
    }),
  openSettings: () => set({ isDialogOpen: true }),
  closeSettings: () => set({ isDialogOpen: false }),
  toggleSettings: () => set(s => ({ isDialogOpen: !s.isDialogOpen })),
}))
