import {
  ArrowFatLineDownIcon,
  ArrowFatLineUpIcon,
  CornersOutIcon,
  DotsThreeIcon,
  EyeClosedIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
} from '@phosphor-icons/react'
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
          <CornersOutIcon aria-hidden="true" />
        </ToolbarButton>
        <Separator variant="soft" orientation="vertical" className="h-7" />
        <ToolbarButton label="Zoom out" size="icon" variant="ghost" onPress={zoomOut}>
          <MagnifyingGlassMinusIcon aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton label="Zoom in" size="icon" variant="ghost" onPress={zoomIn}>
          <MagnifyingGlassPlusIcon aria-hidden="true" />
        </ToolbarButton>
        <Separator variant="soft" orientation="vertical" className="h-7" />
        <ToolbarButton
          label={isTop ? 'Move to bottom' : 'Move to top'}
          size="icon"
          variant="ghost"
          onPress={() => setPosition(isTop ? 'bottom' : 'top')}
        >
          {isTop ? (
            <ArrowFatLineDownIcon aria-hidden="true" />
          ) : (
            <ArrowFatLineUpIcon aria-hidden="true" />
          )}
        </ToolbarButton>
        <ToolbarButton label="Hide toolbar" size="icon" variant="ghost" onPress={hide}>
          <EyeClosedIcon aria-hidden="true" />
        </ToolbarButton>
      </div>

      <div className="flex w-full items-center justify-between gap-2 md:hidden">
        <ToolbarButton label="Fullscreen" size="icon" variant="ghost" onPress={toggleFullscreen}>
          <CornersOutIcon aria-hidden="true" />
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
            <DotsThreeIcon aria-hidden="true" weight="bold" />
          </Button>
          <DropdownMenu placement="bottom end">
            <DropdownMenuItem onAction={zoomIn}>
              <MagnifyingGlassPlusIcon aria-hidden="true" />
              Zoom in
            </DropdownMenuItem>
            <DropdownMenuItem onAction={zoomOut}>
              <MagnifyingGlassMinusIcon aria-hidden="true" />
              Zoom out
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onAction={() => setPosition(isTop ? 'bottom' : 'top')}>
              {isTop ? (
                <ArrowFatLineDownIcon aria-hidden="true" />
              ) : (
                <ArrowFatLineUpIcon aria-hidden="true" />
              )}
              {isTop ? 'Move to bottom' : 'Move to top'}
            </DropdownMenuItem>
            <DropdownMenuItem onAction={hide}>
              <EyeClosedIcon aria-hidden="true" />
              Hide toolbar
            </DropdownMenuItem>
          </DropdownMenu>
        </DropdownMenuTrigger>
      </div>
    </>
  )
}
