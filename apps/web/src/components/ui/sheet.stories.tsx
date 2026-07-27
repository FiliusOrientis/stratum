import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'
import { Sheet, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './sheet'

const meta: Meta<typeof Sheet> = {
  title: 'UI/Sheet',
  component: Sheet,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Sheet>

export const Right: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <SheetTrigger onOpenChange={setOpen}>
        <Button>Open Right</Button>
        <Sheet isOpen={open} onOpenChange={setOpen} side="right" showCloseButton>
          <SheetHeader>
            <SheetTitle>Sheet Title</SheetTitle>
            <SheetDescription>Side panel from the right edge.</SheetDescription>
          </SheetHeader>
          <div className="flex-1 p-6 text-muted-foreground text-xs">
            Sheet content goes here.
          </div>
          <SheetFooter className="border-t pt-4">
            <Button variant="outline" onPress={() => setOpen(false)}>Close</Button>
          </SheetFooter>
        </Sheet>
      </SheetTrigger>
    )
  },
}

export const Left: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <SheetTrigger onOpenChange={setOpen}>
        <Button variant="outline">Open Left</Button>
        <Sheet isOpen={open} onOpenChange={setOpen} side="left">
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <div className="flex-1 p-6 text-muted-foreground text-xs">
            Left sidebar content.
          </div>
        </Sheet>
      </SheetTrigger>
    )
  },
}

export const Bottom: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <SheetTrigger onOpenChange={setOpen}>
        <Button variant="secondary">Open Bottom</Button>
        <Sheet isOpen={open} onOpenChange={setOpen} side="bottom" showCloseButton>
          <SheetHeader>
            <SheetTitle>Bottom Sheet</SheetTitle>
          </SheetHeader>
          <div className="p-6 text-muted-foreground text-xs">
            Mobile-friendly bottom panel.
          </div>
        </Sheet>
      </SheetTrigger>
    )
  },
}
