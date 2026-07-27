import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { useSettingsStore } from '@/stores'
import { SettingsDialog } from './settings-dialog'

describe('SettingsDialog', () => {
  beforeEach(() => {
    useSettingsStore.setState({
      geminiKeys: Array.from({ length: 10 }, () => null),
      isDialogOpen: false,
    })
  })

  it('renders closed', () => {
    const { container } = render(<SettingsDialog />)
    expect(container.innerHTML).toBe('')
  })

  it('renders when open', () => {
    useSettingsStore.setState({ isDialogOpen: true })
    render(<SettingsDialog />)
    expect(screen.getByText('Settings')).toBeInTheDocument()
    expect(screen.getByText('Reading')).toBeInTheDocument()
    expect(screen.getByText('Appearance')).toBeInTheDocument()
    expect(screen.getByText('Storage')).toBeInTheDocument()
  })

  it('closes on close button', () => {
    useSettingsStore.setState({ isDialogOpen: true })
    render(<SettingsDialog />)
    const closeButton = screen.getByRole('button', { name: 'Close' })
    closeButton.click()
    expect(useSettingsStore.getState().isDialogOpen).toBe(false)
  })
})
