import { CollapseToggle } from './collapse-toggle'

const noop = () => undefined

export const TopClosed = () => (
  <CollapseToggle isOpen={false} edge="top" labelClosed="Show toolbar" onPress={noop} />
)

export const TopOpen = () => (
  <CollapseToggle
    isOpen={true}
    edge="top"
    labelOpen="Hide toolbar"
    labelClosed="Show toolbar"
    onPress={noop}
  />
)

export const BottomClosed = () => (
  <CollapseToggle isOpen={false} edge="bottom" labelClosed="Show toolbar" onPress={noop} />
)
