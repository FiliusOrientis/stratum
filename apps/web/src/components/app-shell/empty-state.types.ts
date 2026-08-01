export type EmptyStateVariant = 'initial' | 'cleared'

export interface EmptyStateProps {
  variant?: EmptyStateVariant
  onImport: () => void
  onUrlImport: (file: File) => void
}
