import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AppLayout } from './app-layout'

describe('AppLayout', () => {
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
})
