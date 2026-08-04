import { motion } from 'motion/react'
import { springPreset } from '@/lib/animation'
import { cn } from '@/lib/utils'
import { CollapseToggle } from '../collapse-toggle'
import type { ToolbarAnimation } from './reader-toolbar.types'

interface TriggerProps {
  isTop: boolean
  anim: ToolbarAnimation
  onShow: () => void
}

export function ToolbarTrigger({ isTop, anim, onShow }: TriggerProps) {
  return (
    <motion.div
      key="trigger"
      initial={{ y: anim.triggerSlide, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: anim.triggerSlide, opacity: 0 }}
      transition={springPreset}
      className={cn('fixed inset-x-0 z-50 flex justify-center', anim.edge)}
    >
      <CollapseToggle
        edge={isTop ? 'top' : 'bottom'}
        isOpen={false}
        labelClosed="Show toolbar"
        onPress={onShow}
        className="shadow-sm"
      />
    </motion.div>
  )
}
