import type { Meta, StoryObj } from '@storybook/react'
import { useEffect } from 'react'
import { useToolbarStore, useViewerStore } from '@/stores'
import { ReaderToolbar } from './reader-toolbar'

interface ToolbarStoryProps {
  currentPage?: number
  pageCount?: number
  position?: 'top' | 'bottom' | 'hidden'
}

function ToolbarStory({ currentPage = 1, pageCount = 42, position = 'top' }: ToolbarStoryProps) {
  useEffect(() => {
    useViewerStore.setState({ currentPage, pageCount })
    useToolbarStore.setState({ position })
  }, [currentPage, pageCount, position])

  return <ReaderToolbar embedded={true} />
}

const meta: Meta<typeof ToolbarStory> = {
  title: 'App Shell/ReaderToolbar',
  component: ToolbarStory,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'hidden'],
    },
    currentPage: { control: 'number' },
    pageCount: { control: 'number' },
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
type Story = StoryObj<typeof ToolbarStory>

export const Default: Story = {
  args: { currentPage: 1, pageCount: 42, position: 'top' },
}

export const BottomPosition: Story = {
  args: { currentPage: 5, pageCount: 100, position: 'bottom' },
  loaders: [
    () => {
      useViewerStore.setState({ currentPage: 5, pageCount: 100 })
      useToolbarStore.setState({ position: 'bottom' })
    },
  ],
}
