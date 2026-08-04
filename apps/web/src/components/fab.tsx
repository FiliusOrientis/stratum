import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type FabPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'middle-left'
  | 'center'
  | 'middle-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

const POSITION_CLASSES: Record<FabPosition, string> = {
  'top-left': 'top-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'top-right': 'top-4 right-4',
  'middle-left': 'top-1/2 left-4 -translate-y-1/2',
  center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  'middle-right': 'top-1/2 right-4 -translate-y-1/2',
  'bottom-left': 'bottom-4 left-4',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-4 right-4',
}

interface FabProps {
  icon: ReactNode
  label: string
  onPress: () => void
  position?: FabPosition
  isExpanded?: boolean
  size?: 'icon' | 'icon-lg'
  className?: string
}

export function Fab({
  icon,
  label,
  onPress,
  position,
  isExpanded,
  size = 'icon',
  className,
}: FabProps) {
  return (
    <Button
      variant="ghost"
      size={size}
      className={cn(position && 'fixed z-50', position && POSITION_CLASSES[position], className)}
      aria-label={label}
      aria-expanded={isExpanded}
      onPress={onPress}
    >
      {icon}
    </Button>
  )
}
