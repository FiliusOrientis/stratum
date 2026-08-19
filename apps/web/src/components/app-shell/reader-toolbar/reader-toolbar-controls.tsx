import {
  ArrowDownToLine,
  ArrowUpToLine,
  Ellipsis,
  EyeOff,
  Maximize,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'
import { useShallow } from 'zustand/react/shallow'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { useToolbarStore } from '@/stores/toolbar.store'
import { useViewerStore } from '@/stores/viewer.store'
import { PageNavigation } from './page-navigation'
import { ToolbarButton } from './reader-toolbar-button'

export function ToolbarControls({ isTop }: { isTop: boolean }) {
  const { currentPage, pageCount, setPage, prevPage, nextPage, zoomIn, zoomOut, toggleFullscreen } =
    useViewerStore(
      useShallow(s => ({
        currentPage: s.currentPage,
        pageCount: s.pageCount,
        setPage: s.setPage,
        prevPage: s.prevPage,
        nextPage: s.nextPage,
        zoomIn: s.zoomIn,
        zoomOut: s.zoomOut,
        toggleFullscreen: s.toggleFullscreen,
      })),
    )
  const { setPosition, hide } = useToolbarStore(
    useShallow(s => ({ setPosition: s.setPosition, hide: s.hide })),
  )
  const moveEdgeLabel = isTop ? 'Move to bottom' : 'Move to top'
  const moveEdgeIcon = isTop ? (
    <ArrowDownToLine aria-hidden="true" />
  ) : (
    <ArrowUpToLine aria-hidden="true" />
  )
  const moveToOppositeEdge = () => setPosition(isTop ? 'bottom' : 'top')

  return (
    <>
      <div className="hidden items-center gap-2 md:flex">
        <PageNavigation
          currentPage={currentPage}
          pageCount={pageCount}
          onPrev={prevPage}
          onNext={nextPage}
          onPageChange={setPage}
        />
        <Separator variant="soft" orientation="vertical" className="h-7" />
        <ToolbarButton label="Fullscreen" size="icon" variant="ghost" onPress={toggleFullscreen}>
          <Maximize aria-hidden="true" />
        </ToolbarButton>
        <Separator variant="soft" orientation="vertical" className="h-7" />
        <ToolbarButton label="Zoom out" size="icon" variant="ghost" onPress={zoomOut}>
          <ZoomOut aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton label="Zoom in" size="icon" variant="ghost" onPress={zoomIn}>
          <ZoomIn aria-hidden="true" />
        </ToolbarButton>
        <Separator variant="soft" orientation="vertical" className="h-7" />
        <ToolbarButton
          label={moveEdgeLabel}
          size="icon"
          variant="ghost"
          onPress={moveToOppositeEdge}
        >
          {moveEdgeIcon}
        </ToolbarButton>
        <ToolbarButton label="Hide toolbar" size="icon" variant="ghost" onPress={hide}>
          <EyeOff aria-hidden="true" />
        </ToolbarButton>
      </div>

      <div className="flex w-full items-center justify-between gap-2 md:hidden">
        <ToolbarButton label="Fullscreen" size="icon" variant="ghost" onPress={toggleFullscreen}>
          <Maximize aria-hidden="true" />
        </ToolbarButton>

        <div className="flex flex-1 items-center justify-center gap-2">
          <PageNavigation
            currentPage={currentPage}
            pageCount={pageCount}
            onPrev={prevPage}
            onNext={nextPage}
            onPageChange={setPage}
          />
        </div>

        <DropdownMenuTrigger>
          <Button size="icon" variant="ghost" aria-label="More controls">
            <Ellipsis aria-hidden="true" />
          </Button>
          <DropdownMenu placement="bottom end">
            <DropdownMenuItem onAction={zoomIn}>
              <ZoomIn aria-hidden="true" />
              Zoom in
            </DropdownMenuItem>
            <DropdownMenuItem onAction={zoomOut}>
              <ZoomOut aria-hidden="true" />
              Zoom out
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onAction={moveToOppositeEdge}>
              {moveEdgeIcon}
              {moveEdgeLabel}
            </DropdownMenuItem>
            <DropdownMenuItem onAction={hide}>
              <EyeOff aria-hidden="true" />
              Hide toolbar
            </DropdownMenuItem>
          </DropdownMenu>
        </DropdownMenuTrigger>
      </div>
    </>
  )
}
