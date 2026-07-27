import type { ComponentProps, ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card'
import { Badge } from './badge'

type CardProps = ComponentProps<typeof Card>

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['default', 'sm'] },
  },
  tags: ['autodocs'],
  decorators: [(Story: () => ReactNode) => <div className="w-80">{<Story />}</div>],
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: (args: CardProps) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>Main content area for the card body.</CardContent>
      <CardFooter>
        <Button size="sm">Action</Button>
      </CardFooter>
    </Card>
  ),
}

export const Small: Story = {
  args: { size: 'sm' },
  render: (args: CardProps) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Compact</CardTitle>
        <CardDescription>Small variant</CardDescription>
      </CardHeader>
      <CardContent>Tighter spacing.</CardContent>
    </Card>
  ),
}

export const WithBadge: Story = {
  render: (args: CardProps) => (
    <Card {...args}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Notifications</CardTitle>
          <Badge variant="destructive">3</Badge>
        </div>
      </CardHeader>
      <CardContent>You have unread notifications.</CardContent>
    </Card>
  ),
}
