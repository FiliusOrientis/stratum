import { BooksIcon } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { useUrlImport } from '@/hooks/use-url-import'
import { cn } from '@/lib/utils'

import { CollapseToggle } from './collapse-toggle'
import type { EmptyStateVariant } from './empty-state.types'
import { UrlImportPanel } from './url-import-panel'

interface DocumentImportProps {
  variant?: EmptyStateVariant
  onImport: () => void
  onUrlImport: (file: File) => void
}

export function DocumentImport({
  variant = 'initial',
  onImport,
  onUrlImport,
}: DocumentImportProps) {
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
      <Button
        variant="outline"
        onPress={onImport}
        aria-label="Open or drop a PDF file"
        className={cn(
          'h-auto w-full justify-start overflow-hidden p-2',
          isUrlOpen ? 'rounded-b-none border-b-0' : 'rounded-lg',
        )}
      >
        <div className="flex flex-row items-center gap-3 text-muted-foreground">
          <BooksIcon aria-hidden="true" weight="thin-duotone" className="size-11" />
          <div className="text-left">
            <h3 className="font-heading text-base text-foreground">
              {variant === 'cleared' ? 'Start again?' : 'Open a document'}
            </h3>
            <p className="font-light text-[11px]">Drop a PDF or click here to browse</p>
          </div>
        </div>
      </Button>

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

      <div className="flex w-fit justify-self-center">
        <CollapseToggle
          edge="top"
          isOpen={isUrlOpen}
          labelOpen="Hide URL input"
          labelClosed="Import from URL"
          onPress={() => setIsUrlOpen(prev => !prev)}
        />
      </div>
    </div>
  )
}
