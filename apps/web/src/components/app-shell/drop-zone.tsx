import { FilePdfIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

interface DropZoneProps {
  onDrop: (file: File) => void
}

export function DropZone({ onDrop }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const dragCount = useRef(0)

  useEffect(() => {
    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault()
      dragCount.current++
      if (e.dataTransfer?.types.includes('Files')) {
        setIsDragging(true)
      }
    }

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault()
      dragCount.current--
      if (dragCount.current <= 0) {
        dragCount.current = 0
        setIsDragging(false)
      }
    }

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault()
    }

    const handleDrop = (e: DragEvent) => {
      e.preventDefault()
      dragCount.current = 0
      setIsDragging(false)
      const file = e.dataTransfer?.files[0]
      if (file && file.type === 'application/pdf') {
        onDrop(file)
      }
    }

    document.addEventListener('dragenter', handleDragEnter)
    document.addEventListener('dragleave', handleDragLeave)
    document.addEventListener('dragover', handleDragOver)
    document.addEventListener('drop', handleDrop)

    return () => {
      document.removeEventListener('dragenter', handleDragEnter)
      document.removeEventListener('dragleave', handleDragLeave)
      document.removeEventListener('dragover', handleDragOver)
      document.removeEventListener('drop', handleDrop)
    }
  }, [onDrop])

  return (
    <AnimatePresence>
      {isDragging && (
        <motion.div
          key="drop-zone"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm"
        >
          <div className="flex flex-col items-center gap-3 rounded-xl border-2 border-border border-dashed p-12">
            <FilePdfIcon className="size-8 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">Drop your PDF here</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
