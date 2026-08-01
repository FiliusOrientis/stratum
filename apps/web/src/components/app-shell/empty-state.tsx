import { InfoIcon } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { StratumWordmark } from '@/components/stratum-wordmark'
import { Kbd, KbdGroup } from '@/components/ui/kbd'
import { useKeyboardShortcut } from '@/hooks/use-keyboard-shortcut'
import { easeOut } from '@/lib/animation'
import { DocumentImport } from './document-import'
import type { EmptyStateProps } from './empty-state.types'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.28, ease: easeOut },
  },
}

export function EmptyState({ variant = 'initial', onImport, onUrlImport }: EmptyStateProps) {
  useKeyboardShortcut({ key: 'o', ctrlOrMeta: true }, onImport)

  return (
    <motion.div
      className="mx-auto flex h-full w-fit flex-col items-center justify-center gap-8 px-6 md:px-10 lg:px-16"
      role="region"
      aria-label="Empty catalog"
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={fadeUp} className="flex justify-center">
        <StratumWordmark />
      </motion.div>

      <motion.div variants={fadeUp} className="w-full">
        <DocumentImport variant={variant} onImport={onImport} onUrlImport={onUrlImport} />
      </motion.div>

      <motion.p
        variants={fadeUp}
        className="items-center gap-1.5 text-xs italic max-md:hidden md:flex"
      >
        <InfoIcon aria-hidden="true" className="size-3.5 shrink-0" />
        <span>Press</span>
        <KbdGroup>
          <Kbd variant="click">Ctrl</Kbd>
          <span className="not-italic">+</span>
          <Kbd variant="click">O</Kbd>
        </KbdGroup>
        <span>to open a file</span>
      </motion.p>
    </motion.div>
  )
}
