import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface FieldErrorProps {
  children: ReactNode
  id?: string
  className?: string
}

function FieldError({ children, id, className }: FieldErrorProps) {
  return (
    <p data-slot="field-error" role="alert" id={id} className={cn('mt-1 text-center text-destructive text-xs', className)}>
      {children}
    </p>
  )
}

export { FieldError }
