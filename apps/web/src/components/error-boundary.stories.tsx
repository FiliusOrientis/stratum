import type { Meta, StoryObj } from '@storybook/react'
import type { ReactNode } from 'react'
import { ErrorBoundary } from './error-boundary'

const meta: Meta<typeof ErrorBoundary> = {
  title: 'Components/ErrorBoundary',
  component: ErrorBoundary,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ErrorBoundary>

function ThrowOnRender(): ReactNode {
  throw new Error('Something went wrong while rendering this component')
}

export const ErrorState: Story = {
  render: () => (
    <ErrorBoundary>
      <ThrowOnRender />
    </ErrorBoundary>
  ),
}

export const NormalState: Story = {
  render: () => (
    <ErrorBoundary>
      <div className="flex h-20 items-center justify-center p-4">
        <p className="text-muted-foreground text-sm">Normal content — no error</p>
      </div>
    </ErrorBoundary>
  ),
}
