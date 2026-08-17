import { useAnimate } from 'motion/react'
import { easeOut } from '@/lib/animation'

const URL_PROTOCOL_RE = /^https?:\/\//i
const ALLOWED_CONTENT_TYPES = ['application/pdf', 'application/octet-stream', 'binary'] as const
const MAX_PDF_BYTES = 100 * 1024 * 1024
const FETCH_TIMEOUT_MS = 30_000
const DEFAULT_PDF_NAME = 'document.pdf'

export interface UrlFormSubmitLike {
  preventDefault: () => void
}

type FetchResult = { ok: true; file: File } | { ok: false; error: string }

function normalizeUrl(raw: string): string {
  const trimmed = raw.trim()
  if (!trimmed) {
    return ''
  }
  return URL_PROTOCOL_RE.test(trimmed) ? trimmed : `https://${trimmed}`
}

function decodeFilename(raw: string): string {
  try {
    return decodeURIComponent(raw)
  } catch {
    return raw
  }
}

async function fetchAndValidate(url: string, signal: AbortSignal): Promise<FetchResult> {
  const res = await fetch(url, { signal })
  if (!res.ok) {
    return { ok: false, error: `Server responded with ${String(res.status)}` }
  }
  const contentType = res.headers.get('content-type') ?? ''
  const isPdf = ALLOWED_CONTENT_TYPES.some(type => contentType.toLowerCase().includes(type))
  if (!isPdf) {
    return { ok: false, error: 'URL does not point to a PDF' }
  }
  const contentLength = Number.parseInt(res.headers.get('content-length') ?? '', 10)
  if (contentLength > MAX_PDF_BYTES) {
    return { ok: false, error: 'File is too large to import' }
  }
  const blob = await res.blob()
  if (blob.size > MAX_PDF_BYTES) {
    return { ok: false, error: 'File is too large to import' }
  }
  const rawName = url.split('/').pop()?.split('?')[0] ?? DEFAULT_PDF_NAME
  const name = decodeFilename(rawName)
  return { ok: true, file: new File([blob], name, { type: 'application/pdf' }) }
}

export function useUrlImport(onUrlImport: (file: File) => void) {
  const [scope, animate] = useAnimate()
  const [urlValue, setUrlValueState] = useState('')
  const [urlError, setUrlError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

  const triggerShake = useCallback(() => {
    animate(scope.current, { x: [0, 6, -6, 4, 0] }, { duration: 0.28, ease: easeOut })
  }, [animate, scope])

  const setUrlValue = useCallback((value: string) => {
    setUrlValueState(value)
    setUrlError(null)
  }, [])

  useEffect(
    () => () => {
      abortRef.current?.abort()
    },
    [],
  )

  const handleUrlSubmit = useCallback(
    async (e: UrlFormSubmitLike) => {
      e.preventDefault()
      setUrlError(null)
      const url = normalizeUrl(urlValue)
      if (!url) {
        setUrlError('Enter a URL')
        triggerShake()
        return
      }

      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller
      const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
      setIsLoading(true)

      let result: FetchResult
      try {
        result = await fetchAndValidate(url, controller.signal)
      } catch {
        if (abortRef.current === controller) {
          setUrlError(
            controller.signal.aborted ? 'The request timed out' : 'Could not reach this URL',
          )
          triggerShake()
        }
        return
      } finally {
        clearTimeout(timeout)
        setIsLoading(false)
      }

      if (!result.ok) {
        setUrlError(result.error)
        triggerShake()
        return
      }
      onUrlImport(result.file)
    },
    [urlValue, onUrlImport, triggerShake],
  )

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText()
      if (text) {
        setUrlValue(text)
      }
    } catch {
      // ponytail: clipboard read denied or unavailable — paste stays a no-op
    }
  }, [setUrlValue])

  const handleClear = useCallback(() => {
    setUrlValueState('')
    setUrlError(null)
  }, [])

  return {
    scope,
    urlValue,
    urlError,
    isLoading,
    setUrlValue,
    handleUrlSubmit,
    handlePaste,
    handleClear,
  }
}
