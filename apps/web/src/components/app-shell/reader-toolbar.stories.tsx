import type { Meta, StoryObj } from '@storybook/react'
import { ReaderToolbar } from './reader-toolbar'

const meta: Meta<typeof ReaderToolbar> = {
  title: 'App Shell/ReaderToolbar',
  component: ReaderToolbar,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ReaderToolbar>

export const Default: Story = {}

export const Bottom: Story = {
  parameters: {
    toolbar: { position: 'bottom' },
  },
}
