import { fireEvent, render, screen } from '@testing-library/react'
import { useTheme } from 'next-themes'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AppLayout } from './app-layout'

const mockUseTheme = vi.mocked(useTheme)

describe('AppLayout', () => {
  beforeEach(() => {
    mockUseTheme.mockReturnValue({
      theme: 'dark',
      setTheme: vi.fn(),
      resolvedTheme: 'dark',
      themes: ['dark', 'light'],
    })
  })

  it('renders children', () => {
    render(
      <AppLayout>
        <div data-testid="child">content</div>
      </AppLayout>,
    )
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('renders header when provided', () => {
    render(
      <AppLayout header={<span>Header</span>}>
        <div>content</div>
      </AppLayout>,
    )
    expect(screen.getByText('Header')).toBeInTheDocument()
  })

  it('does not render header when omitted', () => {
    const { container } = render(
      <AppLayout>
        <div>content</div>
      </AppLayout>,
    )
    expect(container.querySelector('header')).toBeNull()
  })

  it('toggles to light mode with the d key in dark mode', () => {
    const setTheme = vi.fn()
    mockUseTheme.mockReturnValue({
      theme: 'dark',
      setTheme,
      resolvedTheme: 'dark',
      themes: ['dark', 'light'],
    })
    render(
      <AppLayout>
        <div>content</div>
      </AppLayout>,
    )
    fireEvent.keyDown(document, { key: 'd' })
    expect(setTheme).toHaveBeenCalledWith('light')
  })

  it('toggles to dark mode with the d key in light mode', () => {
    const setTheme = vi.fn()
    mockUseTheme.mockReturnValue({
      theme: 'light',
      setTheme,
      resolvedTheme: 'light',
      themes: ['dark', 'light'],
    })
    render(
      <AppLayout>
        <div>content</div>
      </AppLayout>,
    )
    fireEvent.keyDown(document, { key: 'd' })
    expect(setTheme).toHaveBeenCalledWith('dark')
  })

  it('ignores the d key when typing in an input', () => {
    const setTheme = vi.fn()
    mockUseTheme.mockReturnValue({
      theme: 'dark',
      setTheme,
      resolvedTheme: 'dark',
      themes: ['dark', 'light'],
    })
    render(
      <AppLayout>
        <input aria-label="search" />
      </AppLayout>,
    )
    const input = screen.getByRole('textbox', { name: 'search' })
    fireEvent.keyDown(input, { key: 'd' })
    expect(setTheme).not.toHaveBeenCalled()
  })

  it('ignores other keys', () => {
    const setTheme = vi.fn()
    mockUseTheme.mockReturnValue({
      theme: 'dark',
      setTheme,
      resolvedTheme: 'dark',
      themes: ['dark', 'light'],
    })
    render(
      <AppLayout>
        <div>content</div>
      </AppLayout>,
    )
    fireEvent.keyDown(document, { key: 'x' })
    expect(setTheme).not.toHaveBeenCalled()
  })

  it('ignores the d key when a modifier is held', () => {
    const setTheme = vi.fn()
    mockUseTheme.mockReturnValue({
      theme: 'dark',
      setTheme,
      resolvedTheme: 'dark',
      themes: ['dark', 'light'],
    })
    render(
      <AppLayout>
        <div>content</div>
      </AppLayout>,
    )
    fireEvent.keyDown(document, { key: 'd', ctrlKey: true })
    fireEvent.keyDown(document, { key: 'd', altKey: true })
    expect(setTheme).not.toHaveBeenCalled()
  })
})
