import { DocumentImport } from './document-import'

const noop = () => undefined

// URL import states are internal to DocumentImport (useUrlImport). The Open,
// WithUrl, Loading and Error visuals are covered by the UrlImportPanel
// fixtures; the interactions are covered by document-import.test.tsx.
export const Closed = () => <DocumentImport onImport={noop} onUrlImport={noop} />
