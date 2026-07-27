import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './badge'

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'] },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = { args: { children: 'Badge' } }
export const Secondary: Story = { args: { variant: 'secondary', children: 'Secondary' } }
export const Destructive: Story = { args: { variant: 'destructive', children: 'Deleted' } }
export const Outline: Story = { args: { variant: 'outline', children: 'Outline' } }
export const Ghost: Story = { args: { variant: 'ghost', children: 'Ghost' } }
export const Link: Story = { args: { variant: 'link', children: 'Link' } }
