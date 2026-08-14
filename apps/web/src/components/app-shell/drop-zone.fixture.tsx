import { DropZone } from './drop-zone'

export const Default = () => (
  <div className="h-96 w-full">
    <DropZone onDrop={() => undefined}>
      <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
        Drop zone area
      </div>
    </DropZone>
  </div>
)

export default { Default }
