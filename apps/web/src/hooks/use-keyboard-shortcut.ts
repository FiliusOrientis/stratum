import { useEffect } from 'react'

export function useKeyboardShortcut(
  shortcut: { key: string; ctrlOrMeta?: boolean },
  handler: (e: KeyboardEvent) => void,
) {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }
      if (shortcut.ctrlOrMeta && !(e.ctrlKey || e.metaKey)) {
        return
      }
      if (e.key.toLowerCase() !== shortcut.key.toLowerCase()) {
        return
      }
      e.preventDefault()
      handler(e)
    }
    document.addEventListener('keydown', listener)
    return () => document.removeEventListener('keydown', listener)
  }, [shortcut.key, shortcut.ctrlOrMeta, handler])
}
