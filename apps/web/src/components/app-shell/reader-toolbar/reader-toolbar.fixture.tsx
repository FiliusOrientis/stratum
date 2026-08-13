import { useToolbarStore } from '@/stores/toolbar.store'
import { useViewerStore } from '@/stores/viewer.store'
import { ReaderToolbar } from './reader-toolbar'

export const Default = () => {
  useViewerStore.setState({ currentPage: 1, pageCount: 42 })
  useToolbarStore.setState({ position: 'top', previousPosition: 'top' })
  return <ReaderToolbar />
}

export const BottomPosition = () => {
  useViewerStore.setState({ currentPage: 5, pageCount: 100 })
  useToolbarStore.setState({ position: 'bottom', previousPosition: 'bottom' })
  return <ReaderToolbar />
}
