import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import type { ComponentProps, SubmitEvent } from 'react'
import { useState } from 'react'
import { UrlImportPanel } from './url-import-panel'

function PanelWrapper(props: Partial<ComponentProps<typeof UrlImportPanel>>) {
  const [urlValue, setUrlValue] = useState('')
  return (
    <div className="w-80">
      <UrlImportPanel
        scope={{ current: null } as never}
        urlValue={urlValue}
        urlError={null}
        isLoading={false}
        isUrlOpen={true}
        handleUrlSubmit={(e: SubmitEvent<HTMLFormElement>) => {
          e.preventDefault()
          return Promise.resolve()
        }}
        handlePaste={fn()}
        handleClear={() => setUrlValue('')}
        setUrlValue={setUrlValue}
        {...props}
      />
    </div>
  )
}

const meta: Meta<typeof UrlImportPanel> = {
  title: 'App Shell/UrlImportPanel',
  component: UrlImportPanel,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof UrlImportPanel>

export const Collapsed: Story = {
  render: () => (
    <div className="w-80">
      <UrlImportPanel
        scope={{ current: null } as never}
        urlValue=""
        urlError={null}
        isLoading={false}
        isUrlOpen={false}
        handleUrlSubmit={fn()}
        handlePaste={fn()}
        handleClear={fn()}
        setUrlValue={fn()}
      />
    </div>
  ),
}

export const Open: Story = {
  render: () => <PanelWrapper isUrlOpen={true} />,
}

export const WithUrl: Story = {
  render: () => <PanelWrapper isUrlOpen={true} urlValue="example.com/document.pdf" />,
}

export const Loading: Story = {
  render: () => <PanelWrapper isUrlOpen={true} urlValue="example.com/doc.pdf" isLoading={true} />,
}

export const ErrorState: Story = {
  render: () => (
    <PanelWrapper isUrlOpen={true} urlValue="bad-url" urlError="Could not reach this URL" />
  ),
}
