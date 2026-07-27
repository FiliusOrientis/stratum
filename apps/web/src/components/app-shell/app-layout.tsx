import type { ReactNode } from 'react'

interface AppLayoutProps {
  header?: ReactNode
  children: ReactNode
}

export function AppLayout({ header, children }: AppLayoutProps) {
  return (
    <div className="flex h-dvh w-full flex-col bg-background text-foreground">
      {header && (
        <header className="flex items-center justify-between border-border border-b px-4 py-2">
          {header}
        </header>
      )}
      <main className="relative flex-1 overflow-hidden">{children}</main>
    </div>
  )
}
