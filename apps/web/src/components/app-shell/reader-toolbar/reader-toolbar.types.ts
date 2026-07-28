import type { ComponentProps } from 'react'
import type { Button } from '@/components/ui/button'

export type ToolbarButtonProps = { label: string } & ComponentProps<typeof Button>

export interface ToolbarAnimation {
  slideDir: number
  triggerSlide: number
  edge: 'top-0' | 'bottom-0'
}

export function getAnimation(isTop: boolean): ToolbarAnimation {
  return {
    slideDir: isTop ? -80 : 80,
    triggerSlide: isTop ? -40 : 40,
    edge: isTop ? 'top-0' : 'bottom-0',
  }
}
