import { KeyboardShortcutsFab } from './keyboard-shortcuts-fab'

export const Default = () => (
  <KeyboardShortcutsFab
    shortcuts={[
      { keys: ['Ctrl', 'O'], description: 'to open a file' },
      { keys: ['D'], description: 'to toggle dark mode' },
    ]}
  />
)

export default { Default }
