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
    <div className="flex items-center gap-1 md:gap-2">
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
          className="h-7 w-10 md:w-12 text-center tabular-nums"
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

      <Separator orientation="vertical" className="hidden md:block h-7" />

      <div className="hidden md:flex items-center gap-1 md:gap-2">
        <ToolbarButton label="Zoom out" size="icon" variant="ghost" onPress={onZoomOut}>
          <MagnifyingGlassMinusIcon />
        </ToolbarButton>
        <ToolbarButton label="Zoom in" size="icon" variant="ghost" onPress={onZoomIn}>
          <MagnifyingGlassPlusIcon />
        </ToolbarButton>
      </div>

      <Separator orientation="vertical" className="h-7" />

      <ToolbarButton label="Fullscreen" size="icon" variant="ghost" onPress={onToggleFullscreen}>
        <CornersOutIcon />
      </ToolbarButton>

      <Separator orientation="vertical" className="hidden md:block h-7" />

      <div className="hidden md:flex items-center gap-1 md:gap-2">
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
    </div>
  )
}
