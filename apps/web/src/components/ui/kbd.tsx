import { motion } from 'motion/react'
import type * as React from 'react'

import { cn } from '@/lib/utils'

type KbdVariant = 'default' | 'click'

interface KbdProps {
  variant?: KbdVariant
  className?: string
  children?: React.ReactNode
}

const MotionKbd = motion.create('kbd')

function Kbd({ variant = 'default', className, ...props }: KbdProps) {
  if (variant === 'click') {
    return (
      <MotionKbd
        data-slot="kbd"
        data-variant="click"
        style={{ borderBottomWidth: 2 }}
        whileTap={{
          borderBottomWidth: 1,
          transition: { type: 'spring', stiffness: 800, damping: 25, mass: 0.3 },
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 25, mass: 0.5 }}
        className={cn(
          'inline-flex h-5 w-fit min-w-5 cursor-pointer select-none items-center justify-center gap-1 rounded-sm border border-border bg-muted px-1 font-sans text-xs font-semibold not-italic text-neutral-600 dark:text-muted-foreground',
          className,
        )}
        {...props}
      />
    )
  }

  return (
    <kbd
      data-slot="kbd"
      data-variant="default"
      className={cn(
        'inline-flex h-5 min-w-5 items-center justify-center rounded-sm border border-border bg-muted px-1 font-sans text-[0.6875rem] font-medium not-italic text-neutral-600 dark:text-muted-foreground',
        className,
      )}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="kbd-group"
      className={cn('inline-flex items-center gap-0.5', className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }
export type { KbdVariant }
