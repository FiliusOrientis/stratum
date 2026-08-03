import { motion } from 'motion/react'
import { easeOut } from '@/lib/animation'
import type { KeyboardHintProps } from './keyboard-hint'
import { KeyboardHint } from './keyboard-hint'

const fadeUp = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.28, ease: easeOut },
  },
}

interface KeyboardShortcutsProps {
  shortcuts: KeyboardHintProps[]
}

export function KeyboardShortcuts({ shortcuts }: KeyboardShortcutsProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="pointer-events-auto overflow-hidden rounded-lg border border-border bg-card/50 px-4 py-3 max-md:hidden"
    >
      <div className="flex flex-col gap-1.5">
        {shortcuts.map(shortcut => (
          <KeyboardHint
            key={shortcut.keys.join('+')}
            keys={shortcut.keys}
            description={shortcut.description}
          />
        ))}
      </div>
    </motion.div>
  )
}
