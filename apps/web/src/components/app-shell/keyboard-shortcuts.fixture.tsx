import { KeyboardShortcuts } from './keyboard-shortcuts'

export const Default = () => (
  <KeyboardShortcuts
    shortcuts={[
      { keys: ['Ctrl', 'O'], description: 'to open a file' },
      { keys: ['D'], description: 'to toggle dark mode' },
    ]}
  />
)

export default { Default }
