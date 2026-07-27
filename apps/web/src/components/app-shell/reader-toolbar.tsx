import {
  ArrowFatLineDownIcon,
  ArrowFatLineUpIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CornersOutIcon,
  EyeSlashIcon,
  GearIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useSettingsStore, useToolbarStore, useViewerStore } from '@/stores'

export function ReaderToolbar() {
  const position = useToolbarStore(s => s.position)
  const setPosition = useToolbarStore(s => s.setPosition)
  const currentPage = useViewerStore(s => s.currentPage)
  const pageCount = useViewerStore(s => s.pageCount)
  const setPage = useViewerStore(s => s.setPage)
  const nextPage = useViewerStore(s => s.nextPage)
  const prevPage = useViewerStore(s => s.prevPage)
  const zoomIn = useViewerStore(s => s.zoomIn)
  const zoomOut = useViewerStore(s => s.zoomOut)
  const toggleFullscreen = useViewerStore(s => s.toggleFullscreen)
  const openSettings = useSettingsStore(s => s.openSettings)

  if (position === 'hidden') {
    return null
  }

  const barClasses = position === 'top' ? 'fixed top-0 inset-x-0' : 'fixed bottom-0 inset-x-0'

  return (
    <div
      className={`${barClasses} z-50 flex items-center justify-center gap-1 border-border bg-background/80 px-3 py-1.5 backdrop-blur-md`}
    >
      <div className="flex items-center gap-1">
        <Button size="icon-xs" variant="ghost" aria-label="Previous page" onPress={prevPage}>
          <CaretLeftIcon />
        </Button>

        <div className="mx-1 flex items-center gap-0.5 text-foreground text-xs">
          <input
            type="number"
            className="h-5 w-8 rounded border border-border bg-background text-center text-xs tabular-nums focus:outline-none focus:ring-1 focus:ring-ring/30"
            value={currentPage}
            min={1}
            max={pageCount}
            onChange={e => {
              const v = Number.parseInt(e.target.value, 10)
              if (v >= 1 && v <= pageCount) {
                setPage(v)
              }
            }}
          />
          <span className="text-muted-foreground">/ {pageCount}</span>
        </div>

        <Button size="icon-xs" variant="ghost" aria-label="Next page" onPress={nextPage}>
          <CaretRightIcon />
        </Button>
      </div>

      <Separator orientation="vertical" className="mx-1 h-5" />

      <div className="flex items-center gap-1">
        <Button size="icon-xs" variant="ghost" aria-label="Zoom out" onPress={zoomOut}>
          <MagnifyingGlassMinusIcon />
        </Button>
        <Button size="icon-xs" variant="ghost" aria-label="Zoom in" onPress={zoomIn}>
          <MagnifyingGlassPlusIcon />
        </Button>
      </div>

      <Separator orientation="vertical" className="mx-1 h-5" />

      <div className="flex items-center gap-1">
        <Button size="icon-xs" variant="ghost" aria-label="Fullscreen" onPress={toggleFullscreen}>
          <CornersOutIcon />
        </Button>
        <Button size="icon-xs" variant="ghost" aria-label="Settings" onPress={openSettings}>
          <GearIcon />
        </Button>

        <div className="ml-1 flex items-center border-border border-l pl-1">
          <Button
            size="icon-xs"
            variant="ghost"
            aria-label={position === 'top' ? 'Move to bottom' : 'Move to top'}
            onPress={() => setPosition(position === 'top' ? 'bottom' : 'top')}
          >
            {position === 'top' ? <ArrowFatLineDownIcon /> : <ArrowFatLineUpIcon />}
          </Button>
          <Button
            size="icon-xs"
            variant="ghost"
            aria-label="Hide toolbar"
            onPress={() => setPosition('hidden')}
          >
            <EyeSlashIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}
