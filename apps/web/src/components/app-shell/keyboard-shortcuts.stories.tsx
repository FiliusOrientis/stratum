import type { Meta, StoryObj } from '@storybook/react'
import { KeyboardShortcuts } from './keyboard-shortcuts'

const meta: Meta<typeof KeyboardShortcuts> = {
  title: 'App Shell/KeyboardShortcuts',
  component: KeyboardShortcuts,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof KeyboardShortcuts>

export const Default: Story = {
  args: {
    shortcuts: [
      { keys: ['Ctrl', 'O'], description: 'to open a file' },
      { keys: ['D'], description: 'to toggle dark mode' },
    ],
  },
}
