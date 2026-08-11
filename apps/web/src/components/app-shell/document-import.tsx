import { ChevronDown, Library } from 'lucide-react'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { Tooltip, TooltipTrigger } from '@/components/ui/tooltip'
import { useUrlImport } from '@/hooks/use-url-import'
import { easeInOut } from '@/lib/animation'
import { cn } from '@/lib/utils'

import { UrlImportPanel } from './url-import-panel'

const MotionCaret = motion.create(ChevronDown)

interface DocumentImportProps {
  onImport: () => void
  onUrlImport: (file: File) => void
}

export function DocumentImport({ onImport, onUrlImport }: DocumentImportProps) {
  const [isUrlOpen, setIsUrlOpen] = useState(false)
  const {
    scope,
    urlValue,
    urlError,
    isLoading,
    setUrlValue,
    handleUrlSubmit,
    handlePaste,
    handleClear,
  } = useUrlImport(onUrlImport)

  return (
    <div>
      <ButtonGroup
        className={cn(
          'w-full',
          isUrlOpen && '[&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-none!',
        )}
      >
        <Button
          variant="outline"
          onPress={onImport}
          aria-label="Open or drop a PDF file"
          className={cn(
            'h-auto min-w-0 flex-1 shrink justify-start overflow-hidden p-2',
            isUrlOpen ? 'rounded-b-none border-b-0' : 'rounded-lg',
          )}
        >
          <div className="flex min-w-0 flex-row items-center gap-3 pr-3 text-muted-foreground">
            <Library aria-hidden="true" className="size-11 shrink-0" strokeWidth={1.5} />
            <div className="min-w-0 text-left">
              <h3 className="font-heading text-base text-foreground">Open a document</h3>
              <p className="truncate font-light text-[11px]">Drop a PDF or click here to browse</p>
            </div>
          </div>
        </Button>
        <TooltipTrigger delay={700}>
          <Button
            variant="outline"
            onPress={() => setIsUrlOpen(prev => !prev)}
            aria-label={isUrlOpen ? 'Hide URL input' : 'Import from URL'}
            aria-expanded={isUrlOpen}
            className={cn('h-auto w-12 shrink-0 text-muted-foreground', isUrlOpen && 'border-b-0')}
          >
            <MotionCaret
              aria-hidden="true"
              initial={false}
              animate={{ scaleY: isUrlOpen ? -1 : 1 }}
              transition={{ duration: 0.15, ease: easeInOut }}
            />
          </Button>
          <Tooltip>{isUrlOpen ? 'Hide URL input' : 'Import from URL'}</Tooltip>
        </TooltipTrigger>
      </ButtonGroup>

      <UrlImportPanel
        scope={scope}
        urlValue={urlValue}
        urlError={urlError}
        isLoading={isLoading}
        handleUrlSubmit={handleUrlSubmit}
        handlePaste={handlePaste}
        handleClear={handleClear}
        setUrlValue={setUrlValue}
        isUrlOpen={isUrlOpen}
      />
    </div>
  )
}
