import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useKeyboardShortcut } from './use-keyboard-shortcut'

function pressKey(target: EventTarget, init: KeyboardEventInit = {}) {
  const event = new KeyboardEvent('keydown', { bubbles: true, ...init })
  target.dispatchEvent(event)
}

describe('useKeyboardShortcut', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('calls the handler for a matching key', () => {
    const handler = vi.fn()
    renderHook(() => useKeyboardShortcut({ key: 'd' }, handler))
    pressKey(document, { key: 'd' })
    expect(handler).toHaveBeenCalledOnce()
  })

  it('requires the modifier for modifier shortcuts', () => {
    const handler = vi.fn()
    renderHook(() => useKeyboardShortcut({ key: 'o', requiresModifier: true }, handler))
    pressKey(document, { key: 'o' })
    expect(handler).not.toHaveBeenCalled()
    pressKey(document, { key: 'o', ctrlKey: true })
    expect(handler).toHaveBeenCalledOnce()
  })

  it('ignores non-modifier shortcuts when ctrl, meta, or alt is held', () => {
    const handler = vi.fn()
    renderHook(() => useKeyboardShortcut({ key: 'd' }, handler))
    pressKey(document, { key: 'd', ctrlKey: true })
    pressKey(document, { key: 'd', metaKey: true })
    pressKey(document, { key: 'd', altKey: true })
    expect(handler).not.toHaveBeenCalled()
  })

  it('ignores events from editable targets', () => {
    const handler = vi.fn()
    renderHook(() => useKeyboardShortcut({ key: 'd' }, handler))

    const input = document.createElement('input')
    document.body.append(input)
    pressKey(input, { key: 'd' })

    const select = document.createElement('select')
    document.body.append(select)
    pressKey(select, { key: 'd' })

    const editable = document.createElement('div')
    // jsdom does not implement contentEditable — simulate the browser getter
    Object.defineProperty(editable, 'isContentEditable', { value: true })
    document.body.append(editable)
    pressKey(editable, { key: 'd' })

    expect(handler).not.toHaveBeenCalled()
  })

  it('removes the listener on unmount', () => {
    const handler = vi.fn()
    const { unmount } = renderHook(() => useKeyboardShortcut({ key: 'd' }, handler))
    unmount()
    pressKey(document, { key: 'd' })
    expect(handler).not.toHaveBeenCalled()
  })
})
