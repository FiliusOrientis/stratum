import { CircleHelp } from 'lucide-react'
import { AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { Fab } from '@/components/fab'
import type { KeyboardHintProps } from './keyboard-hint'
import { KeyboardShortcuts } from './keyboard-shortcuts'

interface KeyboardShortcutsFabProps {
  shortcuts: KeyboardHintProps[]
}

export function KeyboardShortcutsFab({ shortcuts }: KeyboardShortcutsFabProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="pointer-events-auto flex flex-col items-start gap-2">
      <AnimatePresence>{isOpen && <KeyboardShortcuts shortcuts={shortcuts} />}</AnimatePresence>
      <Fab
        label="Keyboard shortcuts"
        isExpanded={isOpen}
        onPress={() => setIsOpen(open => !open)}
        icon={<CircleHelp aria-hidden="true" />}
      />
    </div>
  )
}
