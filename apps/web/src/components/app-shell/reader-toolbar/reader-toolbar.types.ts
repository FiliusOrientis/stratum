import type { ComponentProps } from 'react'
import type { Button } from '@/components/ui/button'
import { toolbarAnimation } from '@/lib/animation'

export type ToolbarButtonProps = { label: string } & ComponentProps<typeof Button>

export interface ToolbarAnimation {
  slideDir: number
  triggerSlide: number
  edge: 'top-0' | 'bottom-0'
}

export function getAnimation(isTop: boolean): ToolbarAnimation {
  const dir = isTop ? -1 : 1
  return {
    slideDir: dir * toolbarAnimation.slideDir,
    triggerSlide: dir * toolbarAnimation.triggerSlide,
    edge: isTop ? 'top-0' : 'bottom-0',
  }
}
