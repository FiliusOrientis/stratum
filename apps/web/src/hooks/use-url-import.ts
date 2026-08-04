import { useAnimate } from 'motion/react'
import type { SubmitEvent } from 'react'
import { easeOut } from '@/lib/animation'

const URL_PROTOCOL_RE = /^https?:\/\//i

function normaliseUrl(raw: string): string {
  const trimmed = raw.trim()
  if (!trimmed) {
    return ''
  }
  return URL_PROTOCOL_RE.test(trimmed) ? trimmed : `https://${trimmed}`
}

async function fetchAndValidate(url: string): Promise<{ file?: File; error?: string }> {
  const res = await fetch(url)
  if (!res.ok) {
    return { error: `Server responded with ${String(res.status)}` }
  }
  const ct = res.headers.get('content-type') ?? ''
  if (!(ct.includes('pdf') || ct.includes('application/octet-stream') || ct.includes('binary'))) {
    return { error: 'URL does not point to a PDF' }
  }
  const blob = await res.blob()
  const name = url.split('/').pop()?.split('?')[0] ?? 'document.pdf'
  return { file: new File([blob], name, { type: 'application/pdf' }) }
}

export function useUrlImport(onUrlImport: (file: File) => void) {
  const [scope, animate] = useAnimate()
  const [urlValue, setUrlValue] = useState('')
  const [urlError, setUrlError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const triggerShake = useCallback(() => {
    animate(scope.current, { x: [0, 6, -6, 4, 0] }, { duration: 0.28, ease: easeOut })
  }, [animate, scope])

  const handleUrlSubmit = useCallback(
    async (e: SubmitEvent<HTMLFormElement>) => {
      e.preventDefault()
      setUrlError(null)
      const url = normaliseUrl(urlValue)
      if (!url) {
        return
      }

      setIsLoading(true)
      try {
        const { file, error } = await fetchAndValidate(url)
        if (error) {
          setUrlError(error)
          triggerShake()
        } else if (file) {
          onUrlImport(file)
        }
      } catch {
        setUrlError('Could not reach this URL')
        triggerShake()
      } finally {
        setIsLoading(false)
      }
    },
    [urlValue, onUrlImport, triggerShake],
  )

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText()
      if (text) {
        setUrlValue(text)
        setUrlError(null)
      }
    } catch {
      // Clipboard read denied or unavailable
    }
  }, [])

  const handleClear = useCallback(() => {
    setUrlValue('')
    setUrlError(null)
  }, [])

  const updateUrlValue = useCallback((value: string) => {
    setUrlValue(value)
    setUrlError(null)
  }, [])

  return {
    scope,
    urlValue,
    urlError,
    isLoading,
    setUrlValue: updateUrlValue,
    handleUrlSubmit,
    handlePaste,
    handleClear,
  }
}
