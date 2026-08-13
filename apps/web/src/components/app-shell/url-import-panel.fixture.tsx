import { createRef } from 'react'
import { UrlImportPanel } from './url-import-panel'

const base = {
  scope: createRef<HTMLDivElement>(),
  handleUrlSubmit: async () => undefined,
  handlePaste: async () => undefined,
  handleClear: () => undefined,
  setUrlValue: () => undefined,
}

export const Collapsed = () => (
  <UrlImportPanel {...base} isUrlOpen={false} urlValue="" urlError={null} isLoading={false} />
)

export const Open = () => (
  <UrlImportPanel {...base} isUrlOpen={true} urlValue="" urlError={null} isLoading={false} />
)

export const WithUrl = () => (
  <UrlImportPanel
    {...base}
    isUrlOpen={true}
    urlValue="https://example.com/document.pdf"
    urlError={null}
    isLoading={false}
  />
)

export const Loading = () => (
  <UrlImportPanel
    {...base}
    isUrlOpen={true}
    urlValue="https://example.com/document.pdf"
    urlError={null}
    isLoading={true}
  />
)

export const ErrorState = () => (
  <UrlImportPanel
    {...base}
    isUrlOpen={true}
    urlValue="https://example.com/bad.pdf"
    urlError="Could not reach this URL"
    isLoading={false}
  />
)
