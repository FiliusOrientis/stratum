import { motion } from 'motion/react'
import { fadeUp } from '@/lib/animation'
import type { KeyboardHintProps } from './keyboard-hint'
import { KeyboardHint } from './keyboard-hint'

interface KeyboardShortcutsProps {
  shortcuts: KeyboardHintProps[]
}

export function KeyboardShortcuts({ shortcuts }: KeyboardShortcutsProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeUp}
      className="overflow-hidden rounded-lg border border-border bg-card/50 px-4 py-3 max-md:hidden"
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
