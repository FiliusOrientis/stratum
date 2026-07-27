'use client'

import { Separator as SeparatorPrimitive } from 'react-aria-components'

import { cn } from '@/lib/utils'

function Separator({
  className,
  orientation = 'horizontal',
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive>) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        'shrink-0 border-border aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:border-t aria-[orientation=vertical]:self-stretch aria-[orientation=vertical]:border-r',
        className,
      )}
      {...props}
    />
  )
}

export { Separator }
