import { EmptyState } from './empty-state'

const noop = () => undefined

export const Initial = () => (
  <div className="h-96 w-full">
    <EmptyState onImport={noop} onUrlImport={noop} />
  </div>
)

export default { Initial }
