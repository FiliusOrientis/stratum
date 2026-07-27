import type { ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './input'
import { Label } from './label'

type LabelProps = ComponentProps<typeof Label>

const meta: Meta<typeof Label> = {
  title: 'UI/Label',
  component: Label,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Label>

export const Default: Story = { args: { children: 'Username' } }

export const WithInput: Story = {
  render: (args: LabelProps) => (
    <div className="flex flex-col gap-1.5">
      <Label {...args}>Email</Label>
      <Input type="email" placeholder="email@example.com" />
    </div>
  ),
}

export const Disabled: Story = {
  render: (args: LabelProps) => (
    <div className="flex flex-col gap-1.5">
      <Label {...args}>Disabled Field</Label>
      <Input disabled placeholder="Can't type here" />
    </div>
  ),
}
