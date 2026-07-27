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

export async function loadPdf(id: string): Promise<File | null> {
  try {
    const root = await getPdfDir()
    const handle = await root.getFileHandle(id)
    return await handle.getFile()
  } catch {
    return null
  }
}

export async function deletePdf(id: string): Promise<void> {
  try {
    const root = await getPdfDir()
    await root.removeEntry(id)
  } catch {
    // file may not exist
  }
}

export async function getStorageUsage(): Promise<{ usage: number; quota: number }> {
  if (!navigator.storage?.estimate) {
    return { usage: 0, quota: 0 }
  }
  const estimate = await navigator.storage.estimate()
  return {
    usage: estimate.usage ?? 0,
    quota: estimate.quota ?? 0,
  }
}
