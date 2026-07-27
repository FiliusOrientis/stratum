import type { Meta, StoryObj } from '@storybook/react'
import { SettingsDialog } from './settings-dialog'

const meta: Meta<typeof SettingsDialog> = {
  title: 'App Shell/SettingsDialog',
  component: SettingsDialog,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SettingsDialog>

export const Default: Story = {}
