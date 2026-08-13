import { FileText } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import type { ReactNode } from 'react'
import { useDropzone } from 'react-dropzone'
import { easeOut } from '@/lib/animation'

interface DropZoneProps {
  onDrop: (file: File) => void
  children: ReactNode
}

export function DropZone({ onDrop, children }: DropZoneProps) {
  const { getRootProps, getInputProps, isDragGlobal } = useDropzone({
    onDrop: acceptedFiles => {
      if (acceptedFiles[0]) {
        onDrop(acceptedFiles[0])
      }
    },
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false,
    noClick: true,
  })

  return (
    <div {...getRootProps({ className: 'relative flex flex-1 flex-col' })}>
      <label className="sr-only">
        PDF file drop zone
        <input {...getInputProps()} />
      </label>
      {children}

      <AnimatePresence>
        {isDragGlobal && (
          <motion.div
            key="drop-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: easeOut }}
            className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm"
          >
            <div className="flex flex-col items-center gap-3 rounded-xl border-2 border-border border-dashed p-12">
              <FileText aria-hidden="true" className="size-8 text-muted-foreground" />
              <p className="text-muted-foreground text-sm">Drop your PDF here</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
