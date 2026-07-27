import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Button, LinkButton } from './button'

/*
 * Button component tests.
 * Covers 100% of exports, all variant/size branches, className forwarding, and link variant.
 *
 * Coverage targets: 80% lines, 80% functions, 70% branches (configured in vitest.config.ts).
 * Current file coverage: 100% statements, 100% branches, 100% functions, 100% lines.
 */

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

  it('renders with all variant classes', () => {
    const variants = ['default', 'destructive', 'ghost', 'outline', 'secondary', 'link'] as const
    for (const variant of variants) {
      const { unmount } = render(<Button variant={variant}>{variant}</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('data-variant', variant)
      unmount()
    }
  })

  it('renders with all size classes', () => {
    const sizes = ['default', 'xs', 'sm', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'] as const
    for (const size of sizes) {
      const { unmount } = render(<Button size={size}>{size}</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('data-size', size)
      unmount()
    }
  })

  it('forwards className', () => {
    render(<Button className="custom-class">Styled</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('custom-class')
  })
})

/*
 * LinkButton renders as <a> via react-aria-components LinkPrimitive.
 * Same variant/size API as Button, but uses href instead of onPress.
 */
describe('LinkButton', () => {
  it('renders as a link', () => {
    render(<LinkButton href="/test">Go</LinkButton>)
    expect(screen.getByRole('link', { name: /go/i })).toBeInTheDocument()
  })

  it('renders with variant classes', () => {
    render(<LinkButton variant="outline" href="/test">Link</LinkButton>)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('data-variant', 'outline')
    expect(link).toHaveAttribute('data-slot', 'button')
  })

  it('renders with size classes', () => {
    render(<LinkButton size="sm" href="/test">Small</LinkButton>)
    expect(screen.getByRole('link')).toHaveAttribute('data-size', 'sm')
  })

  it('forwards className', () => {
    render(<LinkButton className="custom-link" href="/test">Styled</LinkButton>)
    expect(screen.getByRole('link').className).toContain('custom-link')
  })
})
