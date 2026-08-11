import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { StratumWordmark } from './stratum-wordmark'

describe('StratumWordmark', () => {
  it('renders both theme images with alt text', () => {
    render(<StratumWordmark />)
    const images = screen.getAllByAltText('Stratum')
    expect(images).toHaveLength(2)
  })

  it('shows the light image in light mode', () => {
    render(<StratumWordmark />)
    expect(screen.getByAltText('Stratum')).toHaveClass('dark:hidden')
  })

  it('forwards className to the wrapper', () => {
    render(<StratumWordmark className="my-4" />)
    expect(screen.getAllByAltText('Stratum')[0]?.parentElement?.className).toContain('my-4')
  })
})
