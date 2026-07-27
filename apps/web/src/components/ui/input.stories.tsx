import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './input'

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: { layout: 'centered' },
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = { args: { placeholder: 'Enter text...' } }
export const WithValue: Story = { args: { value: 'Some value', onChange: () => {} } }
export const Disabled: Story = { args: { placeholder: 'Disabled', disabled: true } }
export const Password: Story = { args: { type: 'password', placeholder: 'Password', defaultValue: 'secret' } }
export const Email: Story = { args: { type: 'email', placeholder: 'email@example.com' } }
