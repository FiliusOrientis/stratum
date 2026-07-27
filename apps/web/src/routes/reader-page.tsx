import { AppLayout } from '@/components/app-shell/app-layout'
import { ReaderToolbar } from '@/components/app-shell/reader-toolbar'

export function ReaderPage() {
  return (
    <AppLayout>
      <div className="flex h-full items-center justify-center">
        <div className="text-center text-muted-foreground text-sm">
          <p>3D Flipbook coming soon</p>
        </div>
      </div>
      <ReaderToolbar />
    </AppLayout>
  )
}
