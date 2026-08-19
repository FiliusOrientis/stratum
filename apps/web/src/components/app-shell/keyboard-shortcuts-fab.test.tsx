import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { DEFAULT_SHORTCUTS, KeyboardShortcutsFab } from './keyboard-shortcuts-fab'

describe('KeyboardShortcutsFab', () => {
  it('renders the question FAB collapsed', () => {
    render(<KeyboardShortcutsFab shortcuts={DEFAULT_SHORTCUTS} />)
    const button = screen.getByRole('button', { name: 'Keyboard shortcuts' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('hides the panel by default', () => {
    render(<KeyboardShortcutsFab shortcuts={DEFAULT_SHORTCUTS} />)
    expect(screen.queryByText('to open a file')).not.toBeInTheDocument()
  })

  it('opens the panel on click', async () => {
    render(<KeyboardShortcutsFab shortcuts={DEFAULT_SHORTCUTS} />)
    await userEvent.click(screen.getByRole('button', { name: 'Keyboard shortcuts' }))
    expect(screen.getByText('to open a file')).toBeInTheDocument()
    expect(screen.getByText('to toggle dark mode')).toBeInTheDocument()
  })

  it('closes the panel on second click', async () => {
    render(<KeyboardShortcutsFab shortcuts={DEFAULT_SHORTCUTS} />)
    const button = screen.getByRole('button', { name: 'Keyboard shortcuts' })
    await userEvent.click(button)
    expect(screen.getByText('to open a file')).toBeInTheDocument()
    await userEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'false')
    await waitFor(() => expect(screen.queryByText('to open a file')).not.toBeInTheDocument())
  })
})
