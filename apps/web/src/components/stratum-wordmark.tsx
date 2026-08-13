interface StratumWordmarkProps {
  className?: string
}

export function StratumWordmark({ className }: StratumWordmarkProps) {
  return (
    <span className={className}>
      <img src="/icons/wordmark-light.svg" alt="Stratum" className="h-10 w-auto dark:hidden" />
      <img src="/icons/wordmark-dark.svg" alt="Stratum" className="hidden h-10 w-auto dark:block" />
    </span>
  )
}
