import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { EmptyState } from './empty-state'

describe('EmptyState', () => {
  it('renders title and description', () => {
    render(<EmptyState onImport={() => {}} onOpenUrl={() => {}} />)
    expect(screen.getByText('No books yet')).toBeInTheDocument()
    expect(screen.getByText(/Import a PDF/)).toBeInTheDocument()
  })

  it('renders both action buttons', () => {
    render(<EmptyState onImport={() => {}} onOpenUrl={() => {}} />)
    expect(screen.getByText('Import PDF')).toBeInTheDocument()
    expect(screen.getByText('Open from URL')).toBeInTheDocument()
  })

  it('calls onImport when Import PDF is clicked', () => {
    const onImport = vi.fn()
    render(<EmptyState onImport={onImport} onOpenUrl={() => {}} />)
    screen.getByText('Import PDF').click()
    expect(onImport).toHaveBeenCalledOnce()
  })

  it('calls onOpenUrl when Open from URL is clicked', () => {
    const onOpenUrl = vi.fn()
    render(<EmptyState onImport={() => {}} onOpenUrl={onOpenUrl} />)
    screen.getByText('Open from URL').click()
    expect(onOpenUrl).toHaveBeenCalledOnce()
  })
})
