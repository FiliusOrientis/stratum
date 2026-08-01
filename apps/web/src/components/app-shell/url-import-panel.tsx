import { ArrowRightIcon, ClipboardIcon, SpinnerGapIcon, XIcon } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import type { RefObject, SubmitEvent } from 'react'
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

export interface UrlImportPanelProps {
  scope: RefObject<HTMLDivElement | null>
  urlValue: string
  urlError: string | null
  isLoading: boolean
  handleUrlSubmit: (e: SubmitEvent<HTMLFormElement>) => Promise<void>
  handlePaste: () => Promise<void>
  handleClear: () => void
  setUrlValue: (value: string) => void
  isUrlOpen: boolean
}

function importAddonIcon(urlError: string | null, urlValue: string, isLoading: boolean) {
  if (urlError) {
    return <XIcon aria-hidden="true" />
  }
  if (isLoading) {
    return <SpinnerGapIcon aria-hidden="true" className="-mr-0.5 size-4 animate-spin" />
  }
  if (urlValue.trim()) {
    return <ArrowRightIcon aria-hidden="true" />
  }
  return null
}

function buildActionProps(
  urlError: string | null,
  urlValue: string,
  isLoading: boolean,
  handleClear: () => void,
  handlePaste: () => Promise<void>,
) {
  const addonIcon = importAddonIcon(urlError, urlValue, isLoading)
  const showAction = !!(urlError || urlValue.trim() || isLoading)
  if (showAction) {
    return {
      type: (urlError ? 'button' : 'submit') as 'button' | 'submit',
      'aria-label': urlError ? 'Clear input' : 'Submit URL',
      isDisabled: !urlError && (!urlValue.trim() || isLoading),
      onPress: urlError ? handleClear : undefined,
      children: addonIcon,
    } as const
  }
  return {
    size: 'xs' as const,
    'aria-label': 'Paste URL from clipboard',
    onPress: handlePaste,
    children: <ClipboardIcon aria-hidden="true" />,
  } as const
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
        <form onSubmit={handleUrlSubmit} noValidate={true}>
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
                <InputGroupButton
                  className="mr-[-0.5px]"
                  variant="ghost"
                  {...buildActionProps(urlError, urlValue, isLoading, handleClear, handlePaste)}
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
