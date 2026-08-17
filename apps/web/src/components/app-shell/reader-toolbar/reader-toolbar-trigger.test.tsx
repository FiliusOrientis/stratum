import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { getAnimation } from './reader-toolbar.helpers'
import { ToolbarTrigger } from './reader-toolbar-trigger'

describe('ToolbarTrigger', () => {
  it('renders a show-toolbar button', () => {
    render(<ToolbarTrigger isTop={true} anim={getAnimation(true)} onShow={vi.fn()} />)
    expect(screen.getByRole('button', { name: 'Show toolbar' })).toBeInTheDocument()
  })

  it('calls onShow when pressed', async () => {
    const onShow = vi.fn()
    render(<ToolbarTrigger isTop={true} anim={getAnimation(true)} onShow={onShow} />)
    await userEvent.click(screen.getByRole('button', { name: 'Show toolbar' }))
    expect(onShow).toHaveBeenCalledOnce()
  })
})
