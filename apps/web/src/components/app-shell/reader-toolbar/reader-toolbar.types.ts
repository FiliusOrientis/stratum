import type { ComponentProps } from 'react'
import type { Button } from '@/components/ui/button'

export type ToolbarButtonProps = { label: string } & ComponentProps<typeof Button>
