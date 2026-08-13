import type { Meta, StoryObj } from '@storybook/react'
import { KeyboardShortcutsFab } from './keyboard-shortcuts-fab'

const meta: Meta<typeof KeyboardShortcutsFab> = {
  title: 'App Shell/KeyboardShortcutsFab',
  component: KeyboardShortcutsFab,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof KeyboardShortcutsFab>

export const Default: Story = {
  args: {
    shortcuts: [
      { keys: ['Ctrl', 'O'], description: 'to open a file' },
      { keys: ['D'], description: 'to toggle dark mode' },
    ],
  },
}
