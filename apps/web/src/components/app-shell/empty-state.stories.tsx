import type { Meta, StoryObj } from '@storybook/react'
import type { ReactNode } from 'react'
import { EmptyState } from './empty-state'

const meta: Meta<typeof EmptyState> = {
  title: 'App Shell/EmptyState',
  component: EmptyState,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story: () => ReactNode, { viewMode }: { viewMode: string }) =>
      viewMode === 'docs' ? (
        <div className="p-8">{<Story />}</div>
      ) : (
        <div className="h-dvh">{<Story />}</div>
      ),
  ],
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof EmptyState>

export const Default: Story = {
  args: { onImport: () => undefined, onOpenUrl: () => undefined },
}
