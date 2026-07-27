import {
  ArrowFatLineDownIcon,
  ArrowFatLineUpIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CornersOutIcon,
  EyeSlashIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useToolbarStore, useViewerStore } from '@/stores'

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

  if (position === 'hidden') {
    return null
  }

  const barClasses = position === 'top' ? 'fixed top-0 inset-x-0' : 'fixed bottom-0 inset-x-0'

  return (
    <div
      className={`${barClasses} z-50 flex items-center justify-center border-border bg-background/80 px-4 py-2 backdrop-blur-md`}
    >
      <div className="flex items-center gap-2">
        <Button size="icon" variant="ghost" aria-label="Previous page" onPress={prevPage}>
          <CaretLeftIcon />
        </Button>

        <div className="flex items-center gap-1 text-foreground text-sm">
          <Input
            type="number"
            aria-label="Page number"
            value={currentPage}
            min={1}
            max={pageCount}
            className="h-7 w-12 text-center tabular-nums"
            onChange={e => {
              const v = Number.parseInt(e.target.value, 10)
              if (v >= 1 && v <= pageCount) {
                setPage(v)
              }
            }}
          />
          <span className="text-muted-foreground">/ {pageCount}</span>
        </div>

        <Button size="icon" variant="ghost" aria-label="Next page" onPress={nextPage}>
          <CaretRightIcon />
        </Button>

        <Separator orientation="vertical" className="h-7" />

        <Button size="icon" variant="ghost" aria-label="Zoom out" onPress={zoomOut}>
          <MagnifyingGlassMinusIcon />
        </Button>
        <Button size="icon" variant="ghost" aria-label="Zoom in" onPress={zoomIn}>
          <MagnifyingGlassPlusIcon />
        </Button>

        <Separator orientation="vertical" className="h-7" />

        <Button size="icon" variant="ghost" aria-label="Fullscreen" onPress={toggleFullscreen}>
          <CornersOutIcon />
        </Button>

        <Separator orientation="vertical" className="h-7" />

        <Button
          size="icon"
          variant="ghost"
          aria-label={position === 'top' ? 'Move to bottom' : 'Move to top'}
          onPress={() => setPosition(position === 'top' ? 'bottom' : 'top')}
        >
          {position === 'top' ? <ArrowFatLineDownIcon /> : <ArrowFatLineUpIcon />}
        </Button>
        <Button
          size="icon"
          variant="ghost"
          aria-label="Hide toolbar"
          onPress={() => setPosition('hidden')}
        >
          <EyeSlashIcon />
        </Button>
      </div>
    </div>
  )
}
