import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { KeyboardShortcuts } from './keyboard-shortcuts'
import { DEFAULT_SHORTCUTS } from './keyboard-shortcuts-fab'

describe('KeyboardShortcuts', () => {
  it('renders all shortcut hints stacked', () => {
    render(<KeyboardShortcuts shortcuts={DEFAULT_SHORTCUTS} />)
    expect(screen.getByText('to open a file')).toBeInTheDocument()
    expect(screen.getByText('to toggle dark mode')).toBeInTheDocument()
    expect(screen.getByText('Ctrl')).toBeInTheDocument()
    expect(screen.getByText('D')).toBeInTheDocument()
  })
})
