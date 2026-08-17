import { MotionConfig } from 'motion/react'
import { useTheme } from 'next-themes'
import type { ReactNode } from 'react'
import { ThemeToggle } from '@/components/shared'
import { useKeyboardShortcut } from '@/hooks/use-keyboard-shortcut'

interface AppLayoutProps {
  header?: ReactNode
  children: ReactNode
}

export function AppLayout({ header, children }: AppLayoutProps) {
  const { setTheme, resolvedTheme } = useTheme()
  const toggle = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }, [resolvedTheme, setTheme])

  useKeyboardShortcut({ key: 'd' }, toggle)

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex h-dvh w-full flex-col bg-background text-foreground">
        {header && (
          <header className="flex items-center justify-between border-border border-b px-4 py-2">
            {header}
          </header>
        )}
        <ThemeToggle />
        <main className="relative flex flex-1 flex-col overflow-hidden">{children}</main>
      </div>
    </MotionConfig>
  )
}
