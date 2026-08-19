import type { RefObject } from 'react'
import type { UrlFormSubmitLike } from '@/hooks/use-url-import'

export interface UrlImportPanelProps {
  scope: RefObject<HTMLDivElement | null>
  urlValue: string
  urlError: string | null
  isLoading: boolean
  handleUrlSubmit: (e: UrlFormSubmitLike) => Promise<void>
  handlePaste: () => Promise<void>
  handleClear: () => void
  setUrlValue: (value: string) => void
  isUrlOpen: boolean
}
