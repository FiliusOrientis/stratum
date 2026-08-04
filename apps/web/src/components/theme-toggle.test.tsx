import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useTheme } from 'next-themes'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ThemeToggle } from './theme-toggle'

const mockUseTheme = vi.mocked(useTheme)

describe('ThemeToggle', () => {
  beforeEach(() => {
    mockUseTheme.mockReturnValue({
      theme: 'dark',
      setTheme: vi.fn(),
      resolvedTheme: 'dark',
      themes: ['dark', 'light'],
    })
  })

  it('renders the sun icon in dark mode', () => {
    render(<ThemeToggle />)
    expect(screen.getByRole('button', { name: 'Switch to light mode' })).toBeInTheDocument()
  })

  it('toggles to light mode on click in dark mode', async () => {
    const setTheme = vi.fn()
    mockUseTheme.mockReturnValue({
      theme: 'dark',
      setTheme,
      resolvedTheme: 'dark',
      themes: ['dark', 'light'],
    })
    render(<ThemeToggle />)
    await userEvent.click(screen.getByRole('button', { name: 'Switch to light mode' }))
    expect(setTheme).toHaveBeenCalledWith('light')
  })

  it('renders the moon icon in light mode', () => {
    mockUseTheme.mockReturnValue({
      theme: 'light',
      setTheme: vi.fn(),
      resolvedTheme: 'light',
      themes: ['dark', 'light'],
    })
    render(<ThemeToggle />)
    expect(screen.getByRole('button', { name: 'Switch to dark mode' })).toBeInTheDocument()
  })

  it('toggles to dark mode on click in light mode', async () => {
    const setTheme = vi.fn()
    mockUseTheme.mockReturnValue({
      theme: 'light',
      setTheme,
      resolvedTheme: 'light',
      themes: ['dark', 'light'],
    })
    render(<ThemeToggle />)
    await userEvent.click(screen.getByRole('button', { name: 'Switch to dark mode' }))
    expect(setTheme).toHaveBeenCalledWith('dark')
  })

  it('renders nothing before the theme resolves', () => {
    mockUseTheme.mockReturnValue({
      theme: undefined,
      setTheme: vi.fn(),
      resolvedTheme: undefined,
      themes: [],
    })
    render(<ThemeToggle />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('applies the default top-right position', () => {
    render(<ThemeToggle />)
    const button = screen.getByRole('button')
    expect(button.className).toContain('top-4')
    expect(button.className).toContain('right-4')
  })

  it('applies a custom position', () => {
    render(<ThemeToggle position="bottom-left" />)
    const button = screen.getByRole('button')
    expect(button.className).toContain('bottom-4')
    expect(button.className).toContain('left-4')
  })
})
