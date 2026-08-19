import { AppLayout } from './app-layout'

export const Default = () => (
  <AppLayout>
    <div className="flex h-full items-center justify-center p-4">
      <p className="text-muted-foreground text-sm">App content</p>
    </div>
  </AppLayout>
)

export const WithHeader = () => (
  <AppLayout header={<h1 className="font-heading text-base">Stratum</h1>}>
    <div className="flex h-full items-center justify-center p-4">
      <p className="text-muted-foreground text-sm">App content</p>
    </div>
  </AppLayout>
)

export default { Default, WithHeader }
