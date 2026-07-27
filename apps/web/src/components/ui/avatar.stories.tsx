import type { ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from './avatar'

type AvatarProps = ComponentProps<typeof Avatar>

const meta: Meta<typeof Avatar> = {
  title: 'UI/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'default', 'lg'] },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  render: (args: AvatarProps) => (
    <Avatar {...args}>
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
}

export const WithImage: Story = {
  render: (args: AvatarProps) => (
    <Avatar {...args}>
      <AvatarImage src="https://i.pravatar.cc/80?u=1" alt="User" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
}

export const Small: Story = {
  args: { size: 'sm' },
  render: (args: AvatarProps) => (
    <Avatar {...args}>
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  ),
}

export const Large: Story = {
  args: { size: 'lg' },
  render: (args: AvatarProps) => (
    <Avatar {...args}>
      <AvatarImage src="https://i.pravatar.cc/120?u=2" alt="User" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
}

export const Group: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar><AvatarImage src="https://i.pravatar.cc/40?u=1" alt="A" /><AvatarFallback>A</AvatarFallback></Avatar>
      <Avatar><AvatarImage src="https://i.pravatar.cc/40?u=2" alt="B" /><AvatarFallback>B</AvatarFallback></Avatar>
      <Avatar><AvatarImage src="https://i.pravatar.cc/40?u=3" alt="C" /><AvatarFallback>C</AvatarFallback></Avatar>
      <AvatarGroupCount>+2</AvatarGroupCount>
    </AvatarGroup>
  ),
}

export const WithBadge: Story = {
  render: (args: AvatarProps) => (
    <Avatar {...args}>
      <AvatarImage src="https://i.pravatar.cc/80?u=4" alt="User" />
      <AvatarFallback>ON</AvatarFallback>
      <span slot="badge" className="absolute bottom-0 right-0 flex size-2.5 rounded-full bg-green-500 ring-2 ring-background" />
    </Avatar>
  ),
}
