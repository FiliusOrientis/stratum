import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { useState } from 'react'
import { PageNavigation } from './page-navigation'

const noop = fn()

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

const meta: Meta<typeof PageNavigation> = {
  title: 'Reader Toolbar/PageNavigation',
  component: PageNavigation,
  parameters: { layout: 'centered' },
  decorators: [
    Story => (
      <div className="flex items-center gap-2 p-4">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PageNavigation>

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    pageCount: 10,
    onPrev: noop,
    onNext: noop,
    onPageChange: noop,
  },
}

export const LastPage: Story = {
  args: {
    currentPage: 10,
    pageCount: 10,
    onPrev: noop,
    onNext: noop,
    onPageChange: noop,
  },
}

export const Interactive: Story = {
  render: () => <NavWrapper currentPage={5} />,
}
