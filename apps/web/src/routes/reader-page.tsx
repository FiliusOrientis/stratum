import { AppLayout, ReaderToolbar } from '@/components/app-shell'

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
