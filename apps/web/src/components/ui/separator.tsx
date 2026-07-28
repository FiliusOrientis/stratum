'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { Separator as SeparatorPrimitive } from 'react-aria-components'

import { cn } from '@/lib/utils'

const separatorVariants = cva(
  'shrink-0 aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:border-t aria-[orientation=vertical]:self-stretch aria-[orientation=vertical]:border-r',
  {
    variants: {
      variant: {
        default: 'border-border',
        muted: 'border-border/75',
        soft: 'border-border/50',
        faint: 'border-border/25',
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
