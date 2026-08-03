import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { KeyboardShortcuts } from './keyboard-shortcuts'

const shortcuts = [
  { keys: ['Ctrl', 'O'], description: 'to open a file' },
  { keys: ['D'], description: 'to toggle dark mode' },
]

describe('KeyboardShortcuts', () => {
  it('renders all shortcut hints stacked', () => {
    render(<KeyboardShortcuts shortcuts={shortcuts} />)
    expect(screen.getByText('to open a file')).toBeInTheDocument()
    expect(screen.getByText('to toggle dark mode')).toBeInTheDocument()
    expect(screen.getByText('Ctrl')).toBeInTheDocument()
    expect(screen.getByText('D')).toBeInTheDocument()
  })

  it('hides on mobile viewports', () => {
    const { container } = render(<KeyboardShortcuts shortcuts={shortcuts} />)
    expect(container.firstChild).toHaveClass('max-md:hidden')
  })
})
