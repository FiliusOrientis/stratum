import {
  ArrowFatLineDownIcon,
  ArrowFatLineUpIcon,
  CaretDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CaretUpIcon,
  CornersOutIcon,
  EyeSlashIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
} from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useToolbarStore, useViewerStore } from '@/stores'

export function ReaderToolbar() {
  const position = useToolbarStore(s => s.position)
  const previousPosition = useToolbarStore(s => s.previousPosition)
  const setPosition = useToolbarStore(s => s.setPosition)
  const show = useToolbarStore(s => s.show)
  const hide = useToolbarStore(s => s.hide)
  const currentPage = useViewerStore(s => s.currentPage)
  const pageCount = useViewerStore(s => s.pageCount)
  const setPage = useViewerStore(s => s.setPage)
  const nextPage = useViewerStore(s => s.nextPage)
  const prevPage = useViewerStore(s => s.prevPage)
  const zoomIn = useViewerStore(s => s.zoomIn)
  const zoomOut = useViewerStore(s => s.zoomOut)
  const toggleFullscreen = useViewerStore(s => s.toggleFullscreen)

  const isHidden = position === 'hidden'
  const isTop = isHidden ? previousPosition === 'top' : position === 'top'
  const slideDir = isTop ? -80 : 80
  const triggerSlide = isTop ? -40 : 40
  const triggerEdge = isTop ? 'top-0' : 'bottom-0'
  const barEdge = isTop ? 'top-0' : 'bottom-0'

  return (
    <AnimatePresence mode="wait" initial={false}>
      {isHidden ? (
        <motion.div
          key="trigger"
          initial={{ y: triggerSlide, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: triggerSlide, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={`fixed ${triggerEdge} inset-x-0 z-50 flex justify-center`}
        >
          <Button
            size="sm"
            variant="outline"
            aria-label="Show toolbar"
            className={
              previousPosition === 'top' ? 'rounded-t-none shadow-sm' : 'rounded-b-none shadow-sm'
            }
            onPress={show}
          >
            {previousPosition === 'top' ? <CaretDownIcon /> : <CaretUpIcon />}
          </Button>
        </motion.div>
      ) : (
        <motion.div
          key={`toolbar-${position}`}
          initial={{ y: slideDir, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: slideDir, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={`fixed ${barEdge} inset-x-0 z-50 flex items-center justify-center border-border bg-background/80 px-4 py-2 backdrop-blur-md`}
        >
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              aria-label="Previous page"
              isDisabled={currentPage <= 1}
              onPress={prevPage}
            >
              <CaretLeftIcon />
            </Button>

            <div className="flex items-center gap-1 text-foreground text-sm">
              <Input
                type="text"
                inputMode="numeric"
                aria-label="Page number"
                value={currentPage}
                className="h-7 w-12 text-center tabular-nums"
                onChange={e => {
                  const v = Number.parseInt(e.target.value, 10)
                  if (v >= 1 && v <= pageCount) {
                    setPage(v)
                  }
                }}
              />
              <span className="text-muted-foreground text-xs">/ {pageCount}</span>
            </div>

            <Button
              size="icon"
              variant="ghost"
              aria-label="Next page"
              isDisabled={currentPage >= pageCount}
              onPress={nextPage}
            >
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
            <Button size="icon" variant="ghost" aria-label="Hide toolbar" onPress={hide}>
              <EyeSlashIcon />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
