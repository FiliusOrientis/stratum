import { ArrowRight, Clipboard, Loader2, X } from 'lucide-react'
import { motion } from 'motion/react'
import { FieldError } from '@/components/ui/field-error'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { easeOut } from '@/lib/animation'
import type { UrlImportPanelProps } from './url-import-panel.types'

interface UrlActionButtonProps {
  urlError: string | null
  urlValue: string
  isLoading: boolean
  handleClear: () => void
  handlePaste: () => Promise<void>
}

function UrlActionButton({
  urlError,
  urlValue,
  isLoading,
  handleClear,
  handlePaste,
}: UrlActionButtonProps) {
  const buttonClass = 'mr-[-0.5px]'
  if (urlError) {
    return (
      <InputGroupButton
        className={buttonClass}
        variant="ghost"
        type="button"
        aria-label="Clear input"
        onPress={handleClear}
      >
        <X aria-hidden="true" />
      </InputGroupButton>
    )
  }
  if (isLoading) {
    return (
      <InputGroupButton
        className={buttonClass}
        variant="ghost"
        type="submit"
        aria-label="Submit URL"
        isDisabled={true}
      >
        <Loader2 aria-hidden="true" className="-mr-0.5 size-4 animate-spin" />
      </InputGroupButton>
    )
  }
  if (urlValue.trim()) {
    return (
      <InputGroupButton
        className={buttonClass}
        variant="ghost"
        type="submit"
        aria-label="Submit URL"
      >
        <ArrowRight aria-hidden="true" />
      </InputGroupButton>
    )
  }
  return (
    <InputGroupButton
      className={buttonClass}
      variant="ghost"
      type="button"
      aria-label="Paste URL from clipboard"
      onPress={() => {
        void handlePaste()
      }}
    >
      <Clipboard aria-hidden="true" />
    </InputGroupButton>
  )
}

export function UrlImportPanel({
  scope,
  urlValue,
  urlError,
  isLoading,
  handleUrlSubmit,
  handlePaste,
  handleClear,
  setUrlValue,
  isUrlOpen,
}: UrlImportPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isUrlOpen) {
      inputRef.current?.focus()
    }
  }, [isUrlOpen])

  return (
    <motion.div
      initial={false}
      animate={{
        height: isUrlOpen ? 'auto' : 0,
        opacity: isUrlOpen ? 1 : 0,
      }}
      transition={{ duration: 0.25, ease: easeOut }}
      className="overflow-hidden"
    >
      <div className="rounded-b-lg border border-border bg-card/50 p-4 pb-2 text-card-foreground text-xs/relaxed">
        <form
          onSubmit={e => {
            void handleUrlSubmit(e)
          }}
        >
          <Label htmlFor="url-input" className="sr-only">
            URL of a PDF document
          </Label>
          <div ref={scope}>
            <InputGroup>
              <InputGroupInput
                ref={inputRef}
                id="url-input"
                type="text"
                inputMode="url"
                value={urlValue}
                placeholder="Paste a PDF link"
                required={true}
                aria-invalid={!!urlError || undefined}
                aria-describedby={urlError ? 'url-error' : undefined}
                onChange={e => setUrlValue(e.target.value)}
              />
              <InputGroupAddon align="inline-start">
                <InputGroupText className="text-muted-foreground">https://</InputGroupText>
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <UrlActionButton
                  urlError={urlError}
                  urlValue={urlValue}
                  isLoading={isLoading}
                  handleClear={handleClear}
                  handlePaste={handlePaste}
                />
              </InputGroupAddon>
            </InputGroup>
          </div>
        </form>
        <p className="mt-1.5 text-center text-2xs text-muted-foreground">
          e.g. example.com/document.pdf
        </p>
        {urlError && <FieldError id="url-error">{urlError}</FieldError>}
      </div>
    </motion.div>
  )
}
