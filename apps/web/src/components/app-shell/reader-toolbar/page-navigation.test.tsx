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

  it('renders prev/next buttons, page input, and page count', () => {
    const h = handlers()
    render(
      <PageNavigation
        currentPage={5}
        pageCount={10}
        onPrev={h.onPrev}
        onNext={h.onNext}
        onPageChange={h.onPageChange}
      />,
    )
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next page' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Page number' })).toHaveValue('5')
    expect(screen.getByText('/ 10')).toBeInTheDocument()
  })

  it('disables previous button on first page', () => {
    const h = handlers()
    render(
      <PageNavigation
        currentPage={1}
        pageCount={10}
        onPrev={h.onPrev}
        onNext={h.onNext}
        onPageChange={h.onPageChange}
      />,
    )
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Next page' })).not.toBeDisabled()
  })

  it('disables next button on last page', () => {
    const h = handlers()
    render(
      <PageNavigation
        currentPage={10}
        pageCount={10}
        onPrev={h.onPrev}
        onNext={h.onNext}
        onPageChange={h.onPageChange}
      />,
    )
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Previous page' })).not.toBeDisabled()
  })

  it('calls onPrev when previous button is clicked', async () => {
    const h = handlers()
    render(
      <PageNavigation
        currentPage={5}
        pageCount={10}
        onPrev={h.onPrev}
        onNext={h.onNext}
        onPageChange={h.onPageChange}
      />,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Previous page' }))
    expect(h.onPrev).toHaveBeenCalledOnce()
  })

  it('calls onNext when next button is clicked', async () => {
    const h = handlers()
    render(
      <PageNavigation
        currentPage={5}
        pageCount={10}
        onPrev={h.onPrev}
        onNext={h.onNext}
        onPageChange={h.onPageChange}
      />,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Next page' }))
    expect(h.onNext).toHaveBeenCalledOnce()
  })

  it('calls onPageChange with a valid typed page', () => {
    const h = handlers()
    render(
      <PageNavigation
        currentPage={5}
        pageCount={10}
        onPrev={h.onPrev}
        onNext={h.onNext}
        onPageChange={h.onPageChange}
      />,
    )
    const input = screen.getByRole('textbox', { name: 'Page number' })
    fireEvent.change(input, { target: { value: '7' } })
    expect(h.onPageChange).toHaveBeenCalledWith(7)
  })

  it('ignores page numbers below 1', () => {
    const h = handlers()
    render(
      <PageNavigation
        currentPage={5}
        pageCount={10}
        onPrev={h.onPrev}
        onNext={h.onNext}
        onPageChange={h.onPageChange}
      />,
    )
    const input = screen.getByRole('textbox', { name: 'Page number' })
    fireEvent.change(input, { target: { value: '0' } })
    expect(h.onPageChange).not.toHaveBeenCalled()
  })

  it('ignores page numbers above page count', () => {
    const h = handlers()
    render(
      <PageNavigation
        currentPage={5}
        pageCount={10}
        onPrev={h.onPrev}
        onNext={h.onNext}
        onPageChange={h.onPageChange}
      />,
    )
    const input = screen.getByRole('textbox', { name: 'Page number' })
    fireEvent.change(input, { target: { value: '99' } })
    expect(h.onPageChange).not.toHaveBeenCalled()
  })

  it('ignores non-numeric input', () => {
    const h = handlers()
    render(
      <PageNavigation
        currentPage={5}
        pageCount={10}
        onPrev={h.onPrev}
        onNext={h.onNext}
        onPageChange={h.onPageChange}
      />,
    )
    const input = screen.getByRole('textbox', { name: 'Page number' })
    fireEvent.change(input, { target: { value: 'abc' } })
    expect(h.onPageChange).not.toHaveBeenCalled()
  })
})
