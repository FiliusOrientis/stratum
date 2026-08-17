import { createRef } from 'react'
import { UrlImportPanel } from './url-import-panel'

function makeHandlers() {
  return {
    scope: createRef<HTMLDivElement>(),
    handleUrlSubmit: async () => undefined,
    handlePaste: async () => undefined,
    handleClear: () => undefined,
    setUrlValue: () => undefined,
  }
}

export const Collapsed = () => {
  const base = makeHandlers()
  return (
    <UrlImportPanel {...base} isUrlOpen={false} urlValue="" urlError={null} isLoading={false} />
  )
}

export const Open = () => {
  const base = makeHandlers()
  return <UrlImportPanel {...base} isUrlOpen={true} urlValue="" urlError={null} isLoading={false} />
}

export const WithUrl = () => {
  const base = makeHandlers()
  return (
    <UrlImportPanel
      {...base}
      isUrlOpen={true}
      urlValue="https://example.com/document.pdf"
      urlError={null}
      isLoading={false}
    />
  )
}

export const Loading = () => {
  const base = makeHandlers()
  return (
    <UrlImportPanel
      {...base}
      isUrlOpen={true}
      urlValue="https://example.com/document.pdf"
      urlError={null}
      isLoading={true}
    />
  )
}

export const ErrorState = () => {
  const base = makeHandlers()
  return (
    <UrlImportPanel
      {...base}
      isUrlOpen={true}
      urlValue="https://example.com/bad.pdf"
      urlError="Could not reach this URL"
      isLoading={false}
    />
  )
}

export default { Collapsed, Open, WithUrl, Loading, ErrorState }
