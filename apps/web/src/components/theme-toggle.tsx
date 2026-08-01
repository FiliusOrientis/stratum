import { MoonStarsIcon, SunIcon } from '@phosphor-icons/react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type ThemeTogglePosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'middle-left'
  | 'center'
  | 'middle-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

const POSITION_CLASSES: Record<ThemeTogglePosition, string> = {
  'top-left': 'top-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'top-right': 'top-4 right-4',
  'middle-left': 'top-1/2 left-4 -translate-y-1/2',
  center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  'middle-right': 'top-1/2 right-4 -translate-y-1/2',
  'bottom-left': 'bottom-4 left-4',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-4 right-4',
}

interface ThemeToggleProps {
  position?: ThemeTogglePosition
  className?: string
}

export function ThemeToggle({ position = 'top-right', className }: ThemeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme()

  if (!resolvedTheme) {
    return null
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <Button
      variant="ghost"
      size="icon-lg"
      className={cn('fixed z-50', POSITION_CLASSES[position], className)}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onPress={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? <SunIcon aria-hidden="true" /> : <MoonStarsIcon aria-hidden="true" />}
    </Button>
  )
}
