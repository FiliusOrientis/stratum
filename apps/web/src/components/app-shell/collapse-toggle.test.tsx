import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { CollapseToggle } from './collapse-toggle'

const caret = () => screen.getByRole('button').querySelector('svg')
const flipped = () => ({ transform: `scaleY(${-1})` })

describe('CollapseToggle', () => {
  const props = () => ({
    isOpen: false,
    edge: 'top' as const,
    labelOpen: 'Hide URL input',
    labelClosed: 'Import from URL',
    onPress: vi.fn(),
  })

  it('uses the closed label and aria-expanded=false when closed', () => {
    render(<CollapseToggle {...props()} />)
    const button = screen.getByRole('button', { name: 'Import from URL' })
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('uses the open label and aria-expanded=true when open', () => {
    render(<CollapseToggle {...props()} isOpen={true} />)
    const button = screen.getByRole('button', { name: 'Hide URL input' })
    expect(button).toHaveAttribute('aria-expanded', 'true')
  })

  it('falls back to the closed label when open without labelOpen', () => {
    const { labelOpen: _labelOpen, ...rest } = props()
    render(<CollapseToggle {...rest} isOpen={true} />)
    expect(screen.getByRole('button', { name: 'Import from URL' })).toBeInTheDocument()
  })

  it('points down when closed at the top edge', () => {
    render(<CollapseToggle {...props()} />)
    expect(caret()).toBeInTheDocument()
    expect(caret()).not.toHaveStyle(flipped())
    expect(screen.getByRole('button')).toHaveClass('rounded-t-none', 'border-t-0')
  })

  it('points up when open at the top edge', () => {
    render(<CollapseToggle {...props()} isOpen={true} />)
    expect(caret()).toHaveStyle(flipped())
  })

  it('points up when closed at the bottom edge', () => {
    render(<CollapseToggle {...props()} edge="bottom" />)
    expect(caret()).toHaveStyle(flipped())
    expect(screen.getByRole('button')).toHaveClass('rounded-b-none', 'border-b-0')
  })

  it('points down when open at the bottom edge', () => {
    render(<CollapseToggle {...props()} edge="bottom" isOpen={true} />)
    expect(caret()).not.toHaveStyle(flipped())
  })

  it('calls onPress when clicked', async () => {
    const p = props()
    render(<CollapseToggle {...p} />)
    await userEvent.click(screen.getByRole('button', { name: 'Import from URL' }))
    expect(p.onPress).toHaveBeenCalledOnce()
  })

  it('merges extra classes with the edge styling', () => {
    render(<CollapseToggle {...props()} className="shadow-sm" />)
    expect(screen.getByRole('button')).toHaveClass('shadow-sm', 'rounded-t-none')
  })
})
