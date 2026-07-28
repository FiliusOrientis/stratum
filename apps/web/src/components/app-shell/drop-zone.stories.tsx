import type { Meta, StoryObj } from '@storybook/react'
import type { ReactNode } from 'react'
import { DropZone } from './drop-zone'

const meta: Meta<typeof DropZone> = {
  title: 'App Shell/DropZone',
  component: DropZone,
  parameters: { layout: 'fullscreen' },
  decorators: [(Story: () => ReactNode) => <div className="flex h-dvh flex-col">{<Story />}</div>],
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DropZone>

export const Default: Story = {
  args: {
    onDrop: () => undefined,
    children: (
      <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
        Drop zone area
      </div>
    ),
  },
}
