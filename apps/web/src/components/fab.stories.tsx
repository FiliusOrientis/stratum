import type { Meta, StoryObj } from '@storybook/react'
import { CircleHelp } from 'lucide-react'
import { Fab } from './fab'

const meta: Meta<typeof Fab> = {
  title: 'Shared/Fab',
  component: Fab,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Fab>

export const Default: Story = {
  args: {
    icon: <CircleHelp aria-hidden="true" />,
    label: 'Keyboard shortcuts',
    onPress: () => undefined,
  },
}

export const Expanded: Story = {
  args: {
    icon: <CircleHelp aria-hidden="true" />,
    label: 'Keyboard shortcuts',
    isExpanded: true,
    onPress: () => undefined,
  },
}

export const Positioned: Story = {
  args: {
    icon: <CircleHelp aria-hidden="true" />,
    label: 'Keyboard shortcuts',
    position: 'bottom-right',
    onPress: () => undefined,
  },
}
