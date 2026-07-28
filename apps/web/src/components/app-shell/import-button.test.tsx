import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ImportButton } from './import-button'

describe('ImportButton', () => {
  it('renders both buttons', () => {
    render(<ImportButton onImportClick={() => {}} onUrlClick={() => {}} />)
    expect(screen.getByText('Import')).toBeInTheDocument()
    expect(screen.getByText('URL')).toBeInTheDocument()
  })

  it('calls onImportClick when Import is pressed', () => {
    const fn = vi.fn()
    render(<ImportButton onImportClick={fn} onUrlClick={() => {}} />)
    screen.getByText('Import').click()
    expect(fn).toHaveBeenCalledOnce()
  })

  it('calls onUrlClick when URL is pressed', () => {
    const fn = vi.fn()
    render(<ImportButton onImportClick={() => {}} onUrlClick={fn} />)
    screen.getByText('URL').click()
    expect(fn).toHaveBeenCalledOnce()
  })
})
