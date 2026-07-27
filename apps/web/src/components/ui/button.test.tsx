import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Button } from './button'

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('renders with default variant styles', () => {
    render(<Button>Default</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('data-variant', 'default')
    expect(button).toHaveAttribute('data-slot', 'button')
  })

  it('renders with variant classes', () => {
    render(<Button variant="destructive">Delete</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('data-variant', 'destructive')
  })

  it('renders with size classes', () => {
    render(<Button size="lg">Large</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('data-size', 'lg')
  })

  it('forwards className', () => {
    render(<Button className="custom-class">Styled</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('custom-class')
  })
})
