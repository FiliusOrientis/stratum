import type { Meta, StoryObj } from '@storybook/react'
import { StratumWordmark } from './stratum-wordmark'

const meta: Meta<typeof StratumWordmark> = {
  title: 'Shared/StratumWordmark',
  component: StratumWordmark,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof StratumWordmark>

export const Default: Story = {
  args: {},
}
