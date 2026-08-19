import { AnimatePresence, motion } from 'motion/react'
import { useShallow } from 'zustand/react/shallow'
import { springPreset } from '@/lib/animation'
import { cn } from '@/lib/utils'
import { useToolbarStore } from '@/stores/toolbar.store'
import { getAnimation } from './reader-toolbar.helpers'
import { ToolbarControls } from './reader-toolbar-controls'
import { ToolbarTrigger } from './reader-toolbar-trigger'

export function ReaderToolbar() {
  const { position, previousPosition, show } = useToolbarStore(
    useShallow(s => ({ position: s.position, previousPosition: s.previousPosition, show: s.show })),
  )

  const isHidden = position === 'hidden'
  const isTop = isHidden ? previousPosition === 'top' : position === 'top'
  const anim = getAnimation(isTop)

  return (
    <AnimatePresence mode="wait" initial={false}>
      {isHidden ? (
        <ToolbarTrigger key="trigger" isTop={isTop} anim={anim} onShow={show} />
      ) : (
        <motion.div
          key={`toolbar-${position}`}
          initial={{ y: anim.slideDir, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: anim.slideDir, opacity: 0 }}
          transition={springPreset}
          className={cn(
            'fixed inset-x-0 z-50 flex items-center justify-center border-border bg-background/80 p-2 backdrop-blur-md',
            anim.edge,
          )}
        >
          <ToolbarControls isTop={isTop} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
