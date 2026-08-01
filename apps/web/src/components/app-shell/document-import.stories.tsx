import type { Meta, StoryObj } from '@storybook/react'
import { expect, fn, userEvent, waitFor, within } from '@storybook/test'
import { DocumentImport } from './document-import'

const meta: Meta<typeof DocumentImport> = {
  title: 'App Shell/DocumentImport',
  component: DocumentImport,
  parameters: { layout: 'centered' },
  decorators: [
    Story => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DocumentImport>

const noop = fn()

export const Closed: Story = {
  args: { onImport: noop, onUrlImport: noop },
}

export const Cleared: Story = {
  args: { variant: 'cleared', onImport: noop, onUrlImport: noop },
}

export const Open: Story = {
  args: { onImport: noop, onUrlImport: noop },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const toggle = canvas.getByRole('button', { name: 'Import from URL' })
    await userEvent.click(toggle)
  },
}

export const WithUrl: Story = {
  args: { onImport: noop, onUrlImport: noop },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Import from URL' }))
    await userEvent.type(
      canvas.getByPlaceholderText('Paste a PDF link'),
      'https://example.com/document.pdf',
    )
  },
}

export const Loading: Story = {
  args: { onImport: noop, onUrlImport: noop },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Import from URL' }))
    await userEvent.type(
      canvas.getByPlaceholderText('Paste a PDF link'),
      'https://example.com/document.pdf',
    )

    globalThis.fetch = () =>
      new Promise(() => {
        /* never resolves — keeps spinner visible */
      })

    const submit = canvas.getByRole('button', { name: 'Submit URL' })
    await userEvent.click(submit)
    await expect(canvas.getByRole('button', { name: 'Submit URL' })).toBeDisabled()
  },
}

export const ErrorState: Story = {
  args: { onImport: noop, onUrlImport: noop },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Import from URL' }))
    await userEvent.type(
      canvas.getByPlaceholderText('Paste a PDF link'),
      'https://example.com/bad.pdf',
    )

    const originalFetch = globalThis.fetch
    globalThis.fetch = () => Promise.reject(new Error('Network error'))

    await userEvent.click(canvas.getByRole('button', { name: 'Submit URL' }))
    await waitFor(() => {
      expect(canvas.getByText('Could not reach this URL')).toBeInTheDocument()
    })

    globalThis.fetch = originalFetch
  },
}
