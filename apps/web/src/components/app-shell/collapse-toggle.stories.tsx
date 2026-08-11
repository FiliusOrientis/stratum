import type { Meta, StoryObj } from '@storybook/react'
import { CollapseToggle } from './collapse-toggle'

const meta: Meta<typeof CollapseToggle> = {
  title: 'App Shell/CollapseToggle',
  component: CollapseToggle,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CollapseToggle>

export const TopClosed: Story = {
  args: { isOpen: false, edge: 'top', labelClosed: 'Show toolbar', onPress: () => undefined },
}

export const TopOpen: Story = {
  args: {
    isOpen: true,
    edge: 'top',
    labelOpen: 'Hide toolbar',
    labelClosed: 'Show toolbar',
    onPress: () => undefined,
  },
}

export const BottomClosed: Story = {
  args: { isOpen: false, edge: 'bottom', labelClosed: 'Show toolbar', onPress: () => undefined },
}
