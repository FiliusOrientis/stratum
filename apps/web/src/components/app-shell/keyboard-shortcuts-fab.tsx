import { CircleHelp } from 'lucide-react'
import { AnimatePresence } from 'motion/react'
import { Fab } from '@/components/shared'
import type { KeyboardHintProps } from './keyboard-hint'
import { KeyboardShortcuts } from './keyboard-shortcuts'

export const DEFAULT_SHORTCUTS: KeyboardHintProps[] = [
  { keys: ['Ctrl', 'O'], description: 'to open a file' },
  { keys: ['D'], description: 'to toggle dark mode' },
]

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
