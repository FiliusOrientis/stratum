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
  const [draft, setDraft] = useState(String(currentPage))

  useEffect(() => {
    setDraft(String(currentPage))
  }, [currentPage])

  const commit = useCallback(() => {
    const page = Number(draft)
    if (Number.isInteger(page) && page >= 1 && page <= pageCount) {
      onPageChange(page)
    } else {
      setDraft(String(currentPage))
    }
  }, [draft, pageCount, currentPage, onPageChange])

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
          value={draft}
          className="h-7 w-12 text-center tabular-nums"
          onChange={e => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              commit()
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
