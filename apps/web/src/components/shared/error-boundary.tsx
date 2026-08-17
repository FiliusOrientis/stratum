import type { ErrorInfo, ReactNode } from 'react'
import { Component, Fragment } from 'react'
import { Button } from '@/components/ui/button'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  resetKey: number
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null, resetKey: 0 }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info.componentStack)
  }

  resetErrorBoundary = () => {
    this.setState(s => ({ hasError: false, error: null, resetKey: s.resetKey + 1 }))
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-dvh flex-col items-center justify-center gap-4 p-8" role="alert">
          <h1 className="font-heading text-2xl">Something went wrong</h1>
          <p className="text-muted-foreground text-sm">{this.state.error?.message}</p>
          <div className="flex gap-3">
            <Button variant="default" onPress={this.resetErrorBoundary}>
              Try again
            </Button>
            <Button
              variant="outline"
              onPress={() => {
                window.location.reload()
              }}
            >
              Reload page
            </Button>
          </div>
        </div>
      )
    }
    return <Fragment key={this.state.resetKey}>{this.props.children}</Fragment>
  }
}
