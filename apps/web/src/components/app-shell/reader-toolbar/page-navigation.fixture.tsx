import { PageNavigation } from './page-navigation'

const noop = () => undefined

export const FirstPage = () => (
  <PageNavigation currentPage={1} pageCount={10} onPrev={noop} onNext={noop} onPageChange={noop} />
)

export const LastPage = () => (
  <PageNavigation currentPage={10} pageCount={10} onPrev={noop} onNext={noop} onPageChange={noop} />
)

function NavWrapper({ currentPage: initial }: { currentPage: number }) {
  const [page, setPage] = useState(initial)
  return (
    <>
      <PageNavigation
        currentPage={page}
        pageCount={10}
        onPrev={() => setPage(p => Math.max(1, p - 1))}
        onNext={() => setPage(p => Math.min(10, p + 1))}
        onPageChange={setPage}
      />
      <span className="text-muted-foreground text-xs">(interactive)</span>
    </>
  )
}

export const Interactive = () => <NavWrapper currentPage={5} />
