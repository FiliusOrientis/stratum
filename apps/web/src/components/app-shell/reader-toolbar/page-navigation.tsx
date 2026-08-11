import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ToolbarButton } from './reader-toolbar-button'

interface PageNavigationProps {
  currentPage: number
  pageCount: number
  onPrev: () => void
  onNext: () => void
  onPageChange: (page: number) => void
}

export function PageNavigation({
  currentPage,
  pageCount,
  onPrev,
  onNext,
  onPageChange,
}: PageNavigationProps) {
  return (
    <>
      <ToolbarButton
        label="Previous page"
        size="icon"
        variant="ghost"
        isDisabled={currentPage <= 1}
        onPress={onPrev}
      >
        <ChevronLeft aria-hidden="true" />
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
              onPageChange(v)
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
        onPress={onNext}
      >
        <ChevronRight aria-hidden="true" />
      </ToolbarButton>
    </>
  )
}
