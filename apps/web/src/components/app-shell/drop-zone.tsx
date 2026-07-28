import { FilePdfIcon } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'

interface DropZoneProps {
  onDrop: (file: File) => void
}

export function DropZone({ onDrop }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const dragCount = useRef(0)

  useEffect(() => {
    const handleDragEnter = (e: DragEvent) => {
      dragCount.current++
      if (e.dataTransfer?.types.includes('Files')) {
        setIsDragging(true)
      }
    }

    const handleDragLeave = () => {
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
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-150 ${
        isDragging ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-3 rounded-xl border-2 border-border border-dashed p-12">
          <FilePdfIcon className="size-8 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">Drop your PDF here</p>
        </div>
      </div>
    </div>
  )
}
