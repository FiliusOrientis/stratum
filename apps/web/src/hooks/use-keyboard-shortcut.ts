function isEditableTarget(target: EventTarget | null): boolean {
  if (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement
  ) {
    return true
  }
  return target instanceof HTMLElement && target.isContentEditable
}

function hasModifierMismatch(e: KeyboardEvent, requiresModifier: boolean | undefined): boolean {
  if (requiresModifier) {
    return !(e.ctrlKey || e.metaKey)
  }
  return e.ctrlKey || e.metaKey || e.altKey
}

export function useKeyboardShortcut(
  shortcut: { key: string; requiresModifier?: boolean },
  handler: (e: KeyboardEvent) => void,
) {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (isEditableTarget(e.target)) {
        return
      }
      if (hasModifierMismatch(e, shortcut.requiresModifier)) {
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
  }, [shortcut.key, shortcut.requiresModifier, handler])
}
