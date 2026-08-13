import { ChevronDown } from 'lucide-react'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { easeInOut } from '@/lib/animation'
import { cn } from '@/lib/utils'

const MotionCaret = motion.create(ChevronDown)

interface CollapseToggleProps {
  isOpen: boolean
  edge: 'top' | 'bottom'
  labelOpen?: string
  labelClosed: string
  onPress: () => void
  className?: string
}

export function CollapseToggle({
  isOpen,
  edge,
  labelOpen,
  labelClosed,
  onPress,
  className,
}: CollapseToggleProps) {
  const isUpsideDown = edge === 'top' ? isOpen : !isOpen
  return (
    <Button
      size="sm"
      variant="outline"
      aria-label={isOpen ? (labelOpen ?? labelClosed) : labelClosed}
      aria-expanded={isOpen}
      onPress={onPress}
      className={cn(
        'px-3.5',
        edge === 'top' ? 'rounded-t-none border-t-0' : 'rounded-b-none border-b-0',
        className,
      )}
    >
      <MotionCaret
        aria-hidden="true"
        initial={false}
        animate={{ scaleY: isUpsideDown ? -1 : 1 }}
        transition={{ duration: 0.15, ease: easeInOut }}
      />
    </Button>
  )
}
