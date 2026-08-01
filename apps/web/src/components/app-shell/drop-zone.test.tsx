import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { DropZone } from './drop-zone'

describe('DropZone', () => {
  it('renders children', () => {
    render(
      <DropZone onDrop={vi.fn()}>
        <div data-testid="child">child content</div>
      </DropZone>,
    )
    expect(screen.getByTestId('child')).toBeInTheDocument()
    expect(screen.getByTestId('child').textContent).toBe('child content')
  })

  it('renders as a flex column container', () => {
    const { container } = render(
      <DropZone onDrop={vi.fn()}>
        <span>inner</span>
      </DropZone>,
    )
    const root = container.firstChild as HTMLElement
    expect(root.className).toContain('flex')
    expect(root.className).toContain('flex-col')
  })

  it('does not show drag overlay by default', () => {
    render(
      <DropZone onDrop={vi.fn()}>
        <span>inner</span>
      </DropZone>,
    )
    expect(screen.queryByText('Drop your PDF here')).not.toBeInTheDocument()
  })

  it('calls onDrop with the dropped file', async () => {
    const onDrop = vi.fn()
    render(
      <DropZone onDrop={onDrop}>
        <span>inner</span>
      </DropZone>,
    )
    const file = new File(['pdf'], 'test.pdf', { type: 'application/pdf' })
    await userEvent.upload(screen.getByLabelText('PDF file drop zone'), file)
    expect(onDrop).toHaveBeenCalledWith(file)
  })
})
