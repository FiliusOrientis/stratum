import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { KeyboardHint } from './keyboard-hint'

describe('KeyboardHint', () => {
  it('renders a single-key hint', () => {
    render(<KeyboardHint keys={['D']} description="to toggle dark mode" />)
    expect(screen.getByText('Press')).toBeInTheDocument()
    expect(screen.getByText('D')).toBeInTheDocument()
    expect(screen.getByText('to toggle dark mode')).toBeInTheDocument()
    expect(screen.queryByText('+')).not.toBeInTheDocument()
  })

  it('renders a multi-key hint joined with plus', () => {
    render(<KeyboardHint keys={['Ctrl', 'O']} description="to open a file" />)
    expect(screen.getByText('Ctrl')).toBeInTheDocument()
    expect(screen.getByText('O')).toBeInTheDocument()
    expect(screen.getAllByText('+')).toHaveLength(1)
  })
})
