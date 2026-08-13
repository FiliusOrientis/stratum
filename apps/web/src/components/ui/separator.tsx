"use client"

import { cva, type VariantProps } from 'class-variance-authority'
import { Separator as SeparatorPrimitive } from 'react-aria-components'

import { cn } from '@/lib/utils'

const separatorVariants = cva(
  'block shrink-0 border-0 bg-border aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=vertical]:w-px aria-[orientation=vertical]:self-stretch [:is(hr)]:h-px [:is(hr)]:w-full',
  {
    variants: {
      variant: {
        default: '',
        muted: 'bg-border/75',
        soft: 'bg-border/50',
        faint: 'bg-border/25',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Separator({
  className,
  variant,
  orientation = 'horizontal',
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive> &
  VariantProps<typeof separatorVariants>) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(separatorVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Separator, separatorVariants }
