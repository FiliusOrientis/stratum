import {
  ArrowFatLineDownIcon,
  ArrowFatLineUpIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CornersOutIcon,
  DotsThreeVerticalIcon,
  EyeSlashIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { ToolbarButton } from './reader-toolbar-button'

interface ControlsProps {
  currentPage: number
  pageCount: number
  isTop: boolean
  onPrevPage: () => void
  onNextPage: () => void
  onSetPage: (page: number) => void
  onZoomOut: () => void
  onZoomIn: () => void
  onToggleFullscreen: () => void
  onMovePosition: () => void
  onHide: () => void
}

export function ToolbarControls({
  currentPage,
  pageCount,
  isTop,
  onPrevPage,
  onNextPage,
  onSetPage,
  onZoomOut,
  onZoomIn,
  onToggleFullscreen,
  onMovePosition,
  onHide,
}: ControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <ToolbarButton
        label="Previous page"
        size="icon"
        variant="ghost"
        isDisabled={currentPage <= 1}
        onPress={onPrevPage}
      >
        <CaretLeftIcon />
      </ToolbarButton>

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
              onSetPage(v)
            }
          }}
        />
        <span className="text-muted-foreground text-xs">/ {pageCount}</span>
      </div>

      <ToolbarButton
        label="Next page"
        size="icon"
        variant="ghost"
        isDisabled={currentPage >= pageCount}
        onPress={onNextPage}
      >
        <CaretRightIcon />
      </ToolbarButton>

      <Separator orientation="vertical" className="h-7" />

      <ToolbarButton label="Fullscreen" size="icon" variant="ghost" onPress={onToggleFullscreen}>
        <CornersOutIcon />
      </ToolbarButton>

      <Separator orientation="vertical" className="hidden h-7 md:block" />

      <div className="hidden items-center gap-2 md:flex">
        <ToolbarButton label="Zoom out" size="icon" variant="ghost" onPress={onZoomOut}>
          <MagnifyingGlassMinusIcon />
        </ToolbarButton>
        <ToolbarButton label="Zoom in" size="icon" variant="ghost" onPress={onZoomIn}>
          <MagnifyingGlassPlusIcon />
        </ToolbarButton>
      </div>

      <Separator orientation="vertical" className="hidden h-7 md:block" />

      <div className="hidden items-center gap-2 md:flex">
        <ToolbarButton
          label={isTop ? 'Move to bottom' : 'Move to top'}
          size="icon"
          variant="ghost"
          onPress={onMovePosition}
        >
          {isTop ? <ArrowFatLineDownIcon /> : <ArrowFatLineUpIcon />}
        </ToolbarButton>
        <ToolbarButton label="Hide toolbar" size="icon" variant="ghost" onPress={onHide}>
          <EyeSlashIcon />
        </ToolbarButton>
      </div>

      <div className="md:hidden">
        <DropdownMenuTrigger>
          <Button size="icon" variant="ghost" aria-label="More controls">
            <DotsThreeVerticalIcon />
          </Button>
          <DropdownMenu placement="bottom end">
            <DropdownMenuItem onAction={onZoomIn}>
              <MagnifyingGlassPlusIcon />
              Zoom in
            </DropdownMenuItem>
            <DropdownMenuItem onAction={onZoomOut}>
              <MagnifyingGlassMinusIcon />
              Zoom out
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onAction={onMovePosition}>
              {isTop ? <ArrowFatLineDownIcon /> : <ArrowFatLineUpIcon />}
              {isTop ? 'Move to bottom' : 'Move to top'}
            </DropdownMenuItem>
            <DropdownMenuItem onAction={onHide}>
              <EyeSlashIcon />
              Hide toolbar
            </DropdownMenuItem>
          </DropdownMenu>
        </DropdownMenuTrigger>
      </div>
    </div>
  )
}
