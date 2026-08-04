import type { Meta, StoryObj } from '@storybook/react'
import { KeyboardHint } from './keyboard-hint'

const meta: Meta<typeof KeyboardHint> = {
  title: 'App Shell/KeyboardHint',
  component: KeyboardHint,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof KeyboardHint>

export const OpenFile: Story = {
  args: { keys: ['Ctrl', 'O'], description: 'to open a file' },
}

export const ToggleTheme: Story = {
  args: { keys: ['D'], description: 'to toggle dark mode' },
}
