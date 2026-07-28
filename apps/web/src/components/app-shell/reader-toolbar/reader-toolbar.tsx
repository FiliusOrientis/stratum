import { AnimatePresence, motion } from 'motion/react'
import { useToolbarStore, useViewerStore } from '@/stores'
import { getAnimation } from './reader-toolbar.types'
import { ToolbarControls } from './reader-toolbar-controls'
import { ToolbarTrigger } from './reader-toolbar-trigger'

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
  const anim = getAnimation(isTop)

  return (
    <AnimatePresence mode="wait" initial={false}>
      {isHidden ? (
        <ToolbarTrigger isTop={isTop} anim={anim} onShow={show} />
      ) : (
        <motion.div
          key={`toolbar-${position}`}
          initial={{ y: anim.slideDir, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: anim.slideDir, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={`fixed ${anim.edge} inset-x-0 z-50 flex items-center justify-center border-border bg-background/80 px-2 md:px-4 py-1.5 md:py-2 backdrop-blur-md`}
        >
          <ToolbarControls
            currentPage={currentPage}
            pageCount={pageCount}
            isTop={isTop}
            onPrevPage={prevPage}
            onNextPage={nextPage}
            onSetPage={setPage}
            onZoomOut={zoomOut}
            onZoomIn={zoomIn}
            onToggleFullscreen={toggleFullscreen}
            onMovePosition={() => setPosition(isTop ? 'bottom' : 'top')}
            onHide={hide}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
