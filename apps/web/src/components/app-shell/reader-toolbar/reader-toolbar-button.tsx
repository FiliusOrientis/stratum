import { Button } from '@/components/ui/button'
import { Tooltip, TooltipTrigger } from '@/components/ui/tooltip'
import type { ToolbarButtonProps } from './reader-toolbar.types'

export function ToolbarButton({ label, ...props }: ToolbarButtonProps) {
  return (
    <TooltipTrigger delay={700}>
      <Button {...props} aria-label={label} />
      <Tooltip placement="bottom">{label}</Tooltip>
    </TooltipTrigger>
  )
}
