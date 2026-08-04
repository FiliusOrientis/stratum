const OPFS_DIR = 'stratum-pdfs'

async function getPdfDir(): Promise<FileSystemDirectoryHandle> {
  const root = await navigator.storage.getDirectory()
  return await root.getDirectoryHandle(OPFS_DIR, { create: true })
}

export async function savePdf(id: string, file: File): Promise<void> {
  const dir = await getPdfDir()
  const handle = await dir.getFileHandle(id, { create: true })
  const writable = await handle.createWritable()
  await writable.write(file)
  await writable.close()
}
