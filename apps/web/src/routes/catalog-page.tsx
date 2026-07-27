import { PlusIcon } from '@phosphor-icons/react'
import { AppLayout } from '@/components/app-shell/app-layout'
import { Button } from '@/components/ui/button'
import { importPdf } from '@/lib/pdf-import'
import { useViewerStore } from '@/stores'

export function CatalogPage() {
  const setPageCount = useViewerStore(s => s.setPageCount)

  const handleImport = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.pdf,application/pdf'
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) {
        return
      }
      const metadata = await importPdf(file)
      setPageCount(metadata.pageCount)
    }
    input.click()
  }

  return (
    <AppLayout
      header={
        <>
          <span className="font-heading font-medium text-base">Stratum</span>
          <Button size="sm" variant="ghost" aria-label="Import PDF" onPress={handleImport}>
            <PlusIcon />
            Import
          </Button>
        </>
      }
    >
      <div className="flex h-full items-center justify-center">
        <div className="text-center text-muted-foreground text-sm">
          <p>3D Bookshelf coming soon</p>
          <p className="mt-1 text-xs">Import a PDF to get started</p>
        </div>
      </div>
    </AppLayout>
  )
}
