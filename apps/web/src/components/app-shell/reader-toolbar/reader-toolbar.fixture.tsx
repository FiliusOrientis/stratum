import { useEffect } from 'react'
import { useToolbarStore } from '@/stores/toolbar.store'
import { useViewerStore } from '@/stores/viewer.store'
import { ReaderToolbar } from './reader-toolbar'

function useSeedStores(currentPage: number, pageCount: number, position: 'top' | 'bottom') {
  useEffect(() => {
    useViewerStore.setState({ currentPage, pageCount })
    useToolbarStore.setState({ position, previousPosition: position })
  }, [currentPage, pageCount, position])
}

export const Default = () => {
  useSeedStores(1, 42, 'top')
  return <ReaderToolbar />
}

export const BottomPosition = () => {
  useSeedStores(5, 100, 'bottom')
  return <ReaderToolbar />
}

export default { Default, BottomPosition }
