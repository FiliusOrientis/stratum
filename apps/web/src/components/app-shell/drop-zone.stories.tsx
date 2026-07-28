import type { Meta, StoryObj } from '@storybook/react'
import { DropZone } from './drop-zone'

const meta: Meta<typeof DropZone> = {
  title: 'App Shell/DropZone',
  component: DropZone,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DropZone>

export const Default: Story = {
  args: { onDrop: () => undefined },
}
