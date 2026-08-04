import { motion } from 'motion/react'
import { StratumWordmark } from '@/components/stratum-wordmark'
import { useKeyboardShortcut } from '@/hooks/use-keyboard-shortcut'
import { fadeUp } from '@/lib/animation'
import { DocumentImport } from './document-import'
import type { EmptyStateProps } from './empty-state.types'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
}

export function EmptyState({ onImport, onUrlImport }: EmptyStateProps) {
  useKeyboardShortcut({ key: 'o', ctrlOrMeta: true }, onImport)

  return (
    <motion.div
      className="mx-auto flex h-full w-fit max-w-full flex-col items-center justify-center gap-8 px-4 md:px-10 lg:px-16"
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
        <DocumentImport onImport={onImport} onUrlImport={onUrlImport} />
      </motion.div>
    </motion.div>
  )
}
