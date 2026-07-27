import type { ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'

type ButtonProps = ComponentProps<typeof Button>

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['default', 'destructive', 'ghost', 'outline', 'secondary', 'link'] },
    size: { control: 'select', options: ['default', 'xs', 'sm', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'] },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = { args: { children: 'Button' } }
export const Destructive: Story = { args: { variant: 'destructive', children: 'Delete' } }
export const Ghost: Story = { args: { variant: 'ghost', children: 'Cancel' } }
export const Outline: Story = { args: { variant: 'outline', children: 'Outline' } }
export const Secondary: Story = { args: { variant: 'secondary', children: 'Secondary' } }
export const Link: Story = { args: { variant: 'link', children: 'Link' } }
export const Disabled: Story = { args: { children: 'Disabled', isDisabled: true } }
export const Small: Story = { args: { size: 'sm', children: 'Small' } }
export const Large: Story = { args: { size: 'lg', children: 'Large' } }
export const Icon: Story = {
  args: { size: 'icon', 'aria-label': 'Search' },
  render: (args: ButtonProps) => <Button {...args}>🔍</Button>,
}
