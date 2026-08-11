import type { Meta, StoryObj } from '@storybook/react'
import { useEffect } from 'react'
import { useToolbarStore } from '@/stores/toolbar.store'
import { useViewerStore } from '@/stores/viewer.store'
import { ToolbarControls } from './reader-toolbar-controls'

interface ControlsStoryProps {
  currentPage?: number
  pageCount?: number
  isTop?: boolean
}

function ControlsStory({ currentPage = 1, pageCount = 42, isTop = true }: ControlsStoryProps) {
  useEffect(() => {
    useViewerStore.setState({ currentPage, pageCount })
    useToolbarStore.setState({ position: isTop ? 'top' : 'bottom' })
  }, [currentPage, pageCount, isTop])

  return <ToolbarControls isTop={isTop} />
}

const meta: Meta<typeof ControlsStory> = {
  title: 'App Shell/ReaderToolbar/Controls',
  component: ControlsStory,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    currentPage: { control: 'number' },
    pageCount: { control: 'number' },
    isTop: { control: 'boolean' },
  },
  loaders: [
    () => {
      useViewerStore.setState({ currentPage: 1, pageCount: 42 })
      useToolbarStore.setState({ position: 'top' })
    },
  ],
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ControlsStory>

export const Top: Story = {
  args: { currentPage: 1, pageCount: 42, isTop: true },
}

export const Bottom: Story = {
  args: { currentPage: 5, pageCount: 100, isTop: false },
  loaders: [
    () => {
      useViewerStore.setState({ currentPage: 5, pageCount: 100 })
      useToolbarStore.setState({ position: 'bottom' })
    },
  ],
}
