import type { ReactNode } from 'react'
import { ErrorBoundary } from './error-boundary'

function ThrowOnRender(): ReactNode {
  throw new Error('Something went wrong while rendering this component')
}

export const ErrorState = () => (
  <ErrorBoundary>
    <ThrowOnRender />
  </ErrorBoundary>
)

export const NormalState = () => (
  <ErrorBoundary>
    <div className="flex h-20 items-center justify-center p-4">
      <p className="text-muted-foreground text-sm">Normal content — no error</p>
    </div>
  </ErrorBoundary>
)
