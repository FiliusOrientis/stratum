import { afterEach, describe, expect, it, vi } from 'vitest'
import { deletePdf, savePdf } from './opfs'

interface OpfsMocks {
  dir: { getFileHandle: ReturnType<typeof vi.fn>; removeEntry: ReturnType<typeof vi.fn> }
  writable: { write: ReturnType<typeof vi.fn>; close: ReturnType<typeof vi.fn> }
}

function mockOpfs(): OpfsMocks {
  const writable = { write: vi.fn(), close: vi.fn() }
  const handle = { createWritable: vi.fn().mockResolvedValue(writable) }
  const dir = {
    getFileHandle: vi.fn().mockResolvedValue(handle),
    removeEntry: vi.fn().mockResolvedValue(undefined),
  }
  const root = { getDirectoryHandle: vi.fn().mockResolvedValue(dir) }
  vi.stubGlobal('navigator', { storage: { getDirectory: vi.fn().mockResolvedValue(root) } })
  return { dir, writable }
}

describe('opfs', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('saves a PDF under the given id', async () => {
    const { dir, writable } = mockOpfs()
    const data = new Blob(['pdf'], { type: 'application/pdf' })

    await savePdf('fp-1', data)

    expect(dir.getFileHandle).toHaveBeenCalledWith('fp-1', { create: true })
    expect(writable.write).toHaveBeenCalledWith(data)
    expect(writable.close).toHaveBeenCalledOnce()
  })

  it('closes the writable when the write fails', async () => {
    const { writable } = mockOpfs()
    writable.write.mockRejectedValue(new Error('write failed'))

    await expect(savePdf('fp-1', new Blob(['pdf']))).rejects.toThrow('write failed')
    expect(writable.close).toHaveBeenCalledOnce()
  })

  it('deletes a stored PDF', async () => {
    const { dir } = mockOpfs()

    await deletePdf('fp-1')

    expect(dir.removeEntry).toHaveBeenCalledWith('fp-1')
  })

  it('ignores missing files when deleting', async () => {
    const { dir } = mockOpfs()
    dir.removeEntry.mockRejectedValue(new DOMException('not found', 'NotFoundError'))

    await expect(deletePdf('fp-1')).resolves.toBeUndefined()
  })

  it('rethrows unexpected delete errors', async () => {
    const { dir } = mockOpfs()
    dir.removeEntry.mockRejectedValue(new Error('io failure'))

    await expect(deletePdf('fp-1')).rejects.toThrow('io failure')
  })
})
