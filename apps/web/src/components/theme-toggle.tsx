import { MoonStarsIcon, SunIcon } from '@phosphor-icons/react'
import { useTheme } from 'next-themes'
import type { FabPosition } from '@/components/fab'
import { Fab } from '@/components/fab'

export type ThemeTogglePosition = FabPosition

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
    <Fab
      position={position}
      size="icon-lg"
      className={className}
      label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onPress={() => setTheme(isDark ? 'light' : 'dark')}
      icon={isDark ? <SunIcon aria-hidden="true" /> : <MoonStarsIcon aria-hidden="true" />}
    />
  )
}
