import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Fab } from './fab'

const icon = <span aria-hidden="true">?</span>

describe('Fab', () => {
  it('renders a button with the label', () => {
    render(<Fab icon={icon} label="Keyboard shortcuts" onPress={vi.fn()} />)
    expect(screen.getByRole('button', { name: 'Keyboard shortcuts' })).toBeInTheDocument()
  })

  it('calls onPress on click', async () => {
    const onPress = vi.fn()
    render(<Fab icon={icon} label="Toggle" onPress={onPress} />)
    await userEvent.click(screen.getByRole('button', { name: 'Toggle' }))
    expect(onPress).toHaveBeenCalledOnce()
  })

  it('applies fixed positioning classes for a position', () => {
    render(<Fab icon={icon} label="Toggle" onPress={vi.fn()} position="bottom-left" />)
    const button = screen.getByRole('button')
    expect(button.className).toContain('fixed')
    expect(button.className).toContain('bottom-4')
    expect(button.className).toContain('left-4')
  })

  it('renders inline without fixed classes when no position', () => {
    render(<Fab icon={icon} label="Toggle" onPress={vi.fn()} />)
    expect(screen.getByRole('button').className).not.toContain('fixed')
  })

  it('reflects aria-expanded', () => {
    render(<Fab icon={icon} label="Toggle" onPress={vi.fn()} isExpanded={true} />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true')
  })

  it('shows a tooltip with the label', async () => {
    render(<Fab icon={icon} label="Toggle" onPress={vi.fn()} />)
    await userEvent.hover(screen.getByRole('button'))
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Toggle')
  })

  it('omits aria-expanded when not provided', () => {
    render(<Fab icon={icon} label="Toggle" onPress={vi.fn()} />)
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-expanded')
  })
})
