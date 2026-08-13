import { CircleHelp } from 'lucide-react'
import { Fab } from './fab'

const noop = () => undefined

export const Default = () => (
  <Fab icon={<CircleHelp aria-hidden="true" />} label="Keyboard shortcuts" onPress={noop} />
)

export const Expanded = () => (
  <Fab
    icon={<CircleHelp aria-hidden="true" />}
    label="Keyboard shortcuts"
    isExpanded={true}
    onPress={noop}
  />
)

export const Positioned = () => (
  <Fab
    icon={<CircleHelp aria-hidden="true" />}
    label="Keyboard shortcuts"
    position="bottom-right"
    onPress={noop}
  />
)
