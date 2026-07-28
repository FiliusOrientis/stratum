import { CaretDownIcon, CaretUpIcon } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
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
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`fixed ${anim.edge} inset-x-0 z-50 flex justify-center`}
    >
      <Button
        size="sm"
        variant="outline"
        aria-label="Show toolbar"
        className={isTop ? 'rounded-t-none shadow-sm' : 'rounded-b-none shadow-sm'}
        onPress={onShow}
      >
        {isTop ? <CaretDownIcon /> : <CaretUpIcon />}
      </Button>
    </motion.div>
  )
}
