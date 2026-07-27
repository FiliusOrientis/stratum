import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './dialog'

const meta: Meta<typeof Dialog> = {
  title: 'UI/Dialog',
  component: Dialog,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Dialog>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <DialogTrigger onOpenChange={setOpen}>
        <Button>Open Dialog</Button>
        <Dialog isOpen={open} onOpenChange={setOpen}>
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogDescription>Are you sure you want to proceed? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onPress={() => setOpen(false)}>Cancel</Button>
            <Button variant="destructive" onPress={() => setOpen(false)}>Confirm</Button>
          </DialogFooter>
        </Dialog>
      </DialogTrigger>
    )
  },
}

export const NonDismissable: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <DialogTrigger onOpenChange={setOpen}>
        <Button variant="outline">Non-dismissable</Button>
        <Dialog isOpen={open} onOpenChange={setOpen} isDismissable={false}>
          <DialogHeader>
            <DialogTitle>Action Required</DialogTitle>
            <DialogDescription>You must confirm to continue.</DialogDescription>
          </DialogHeader>
          <DialogFooter showCloseButton>
            <Button onPress={() => setOpen(false)}>OK</Button>
          </DialogFooter>
        </Dialog>
      </DialogTrigger>
    )
  },
}
