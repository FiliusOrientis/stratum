import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { PageNavigation } from './page-navigation'

describe('PageNavigation', () => {
  const handlers = () => ({
    onPrev: vi.fn(),
    onNext: vi.fn(),
    onPageChange: vi.fn(),
  })

  const renderPage = (currentPage: number, pageCount: number, h = handlers()) => {
    render(
      <PageNavigation
        currentPage={currentPage}
        pageCount={pageCount}
        onPrev={h.onPrev}
        onNext={h.onNext}
        onPageChange={h.onPageChange}
      />,
    )
    return h
  }

  it('renders prev/next buttons, page input, and page count', () => {
    renderPage(5, 10)
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next page' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Page number' })).toHaveValue('5')
    expect(screen.getByText('/ 10')).toBeInTheDocument()
  })

  it('disables previous button on first page', () => {
    renderPage(1, 10)
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Next page' })).not.toBeDisabled()
  })

  it('disables next button on last page', () => {
    renderPage(10, 10)
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Previous page' })).not.toBeDisabled()
  })

  it('calls onPrev when previous button is clicked', async () => {
    const h = renderPage(5, 10)
    await userEvent.click(screen.getByRole('button', { name: 'Previous page' }))
    expect(h.onPrev).toHaveBeenCalledOnce()
  })

  it('calls onNext when next button is clicked', async () => {
    const h = renderPage(5, 10)
    await userEvent.click(screen.getByRole('button', { name: 'Next page' }))
    expect(h.onNext).toHaveBeenCalledOnce()
  })

  it('allows editing intermediate digits without committing', () => {
    const h = renderPage(5, 100)
    const input = screen.getByRole('textbox', { name: 'Page number' })
    fireEvent.change(input, { target: { value: '52' } })
    expect(h.onPageChange).not.toHaveBeenCalled()
    expect(input).toHaveValue('52')
  })

  it('commits a valid typed page on blur', () => {
    const h = renderPage(5, 10)
    const input = screen.getByRole('textbox', { name: 'Page number' })
    fireEvent.change(input, { target: { value: '7' } })
    fireEvent.blur(input)
    expect(h.onPageChange).toHaveBeenCalledWith(7)
  })

  it('commits a valid typed page on Enter', () => {
    const h = renderPage(5, 10)
    const input = screen.getByRole('textbox', { name: 'Page number' })
    fireEvent.change(input, { target: { value: '7' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(h.onPageChange).toHaveBeenCalledWith(7)
  })

  it('reverts out-of-range input on blur', () => {
    const h = renderPage(5, 10)
    const input = screen.getByRole('textbox', { name: 'Page number' })
    fireEvent.change(input, { target: { value: '99' } })
    fireEvent.blur(input)
    expect(h.onPageChange).not.toHaveBeenCalled()
    expect(input).toHaveValue('5')
  })

  it('reverts empty input on blur', () => {
    const h = renderPage(5, 10)
    const input = screen.getByRole('textbox', { name: 'Page number' })
    fireEvent.change(input, { target: { value: '' } })
    fireEvent.blur(input)
    expect(h.onPageChange).not.toHaveBeenCalled()
    expect(input).toHaveValue('5')
  })

  it('rejects non-numeric input on blur', () => {
    const h = renderPage(5, 10)
    const input = screen.getByRole('textbox', { name: 'Page number' })
    fireEvent.change(input, { target: { value: '2abc' } })
    fireEvent.blur(input)
    expect(h.onPageChange).not.toHaveBeenCalled()
    expect(input).toHaveValue('5')
  })

  it('syncs the draft when the current page changes externally', () => {
    const h = handlers()
    const { rerender } = render(
      <PageNavigation
        currentPage={5}
        pageCount={10}
        onPrev={h.onPrev}
        onNext={h.onNext}
        onPageChange={h.onPageChange}
      />,
    )
    const input = screen.getByRole('textbox', { name: 'Page number' })
    fireEvent.change(input, { target: { value: '8' } })
    rerender(
      <PageNavigation
        currentPage={8}
        pageCount={10}
        onPrev={h.onPrev}
        onNext={h.onNext}
        onPageChange={h.onPageChange}
      />,
    )
    expect(screen.getByRole('textbox', { name: 'Page number' })).toHaveValue('8')
  })
})
