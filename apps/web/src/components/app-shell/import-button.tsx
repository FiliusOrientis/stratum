import { LinkIcon, PlusIcon } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

interface ImportButtonProps {
  onImportClick: () => void
  onUrlClick: () => void
}

export function ImportButton({ onImportClick, onUrlClick }: ImportButtonProps) {
  return (
    <>
      <Button size="sm" variant="ghost" aria-label="Import PDF" onPress={onImportClick}>
        <PlusIcon />
        Import
      </Button>
      <Button size="sm" variant="ghost" aria-label="Open from URL" onPress={onUrlClick}>
        <LinkIcon />
        URL
      </Button>
    </>
  )
}
