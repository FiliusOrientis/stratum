import { FilePdfIcon } from '@phosphor-icons/react'
import { useDropzone } from 'react-dropzone'

interface DropZoneProps {
  onDrop: (file: File) => void
}

export function DropZone({ onDrop }: DropZoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: files => {
      if (files[0]) {
        onDrop(files[0])
      }
    },
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false,
    noClick: true,
  })

  return (
    <div
      {...getRootProps({
        className: `fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-150 ${
          isDragActive ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`,
      })}
    >
      <input {...getInputProps()} />
      <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-3 rounded-xl border-2 border-border border-dashed p-12">
          <FilePdfIcon className="size-8 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">Drop your PDF here</p>
        </div>
      </div>
    </div>
  )
}
