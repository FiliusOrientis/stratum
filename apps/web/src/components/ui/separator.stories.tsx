import type { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Separator } from './separator'

const meta: Meta<typeof Separator> = {
  title: 'UI/Separator',
  component: Separator,
  parameters: { layout: 'centered' },
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    variant: { control: 'select', options: ['default', 'muted', 'soft', 'faint'] },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Separator>

export const Horizontal: Story = { args: { className: 'w-40' } }

export const Vertical: Story = {
  args: { orientation: 'vertical', className: 'h-10', variant: 'default' },
  decorators: [(Story: () => ReactNode) => <div className="flex h-10 items-center gap-3">{<Story />}</div>],
}

export const Muted: Story = { args: { className: 'w-40', variant: 'muted' } }

export const Soft: Story = { args: { className: 'w-40', variant: 'soft' } }

export const Faint: Story = { args: { className: 'w-40', variant: 'faint' } }
