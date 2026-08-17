const OPFS_DIR = 'stratum-pdfs'

async function getPdfDir(): Promise<FileSystemDirectoryHandle> {
  const root = await navigator.storage.getDirectory()
  return await root.getDirectoryHandle(OPFS_DIR, { create: true })
}

export async function savePdf(id: string, data: Blob): Promise<void> {
  const dir = await getPdfDir()
  const handle = await dir.getFileHandle(id, { create: true })
  const writable = await handle.createWritable()
  try {
    await writable.write(data)
  } finally {
    await writable.close()
  }
}

export async function deletePdf(id: string): Promise<void> {
  const dir = await getPdfDir()
  try {
    await dir.removeEntry(id)
  } catch (error) {
    if (error instanceof DOMException && error.name === 'NotFoundError') {
      return
    }
    throw error
  }
}
