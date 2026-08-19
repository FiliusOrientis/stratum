import { MoonStar, Sun } from 'lucide'
import { MorphIcon } from 'morphicons/react'
import { useTheme } from 'next-themes'
import type { FabPosition } from './fab'
import { Fab } from './fab'

interface ThemeToggleProps {
  position?: FabPosition
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
      className={className}
      label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onPress={() => setTheme(isDark ? 'light' : 'dark')}
      icon={<MorphIcon icon={isDark ? MoonStar : Sun} spring="snappy" reducedMotion="user" />}
    />
  )
}
