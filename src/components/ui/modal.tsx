// Custom modal component

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './dialog'

interface ModalProps {
  title: string
  description: string
  isOpen: boolean
  onChange: React.Dispatch<React.SetStateAction<boolean>>
  children?: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({ title, description, isOpen, onChange, children }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div>{children}</div>
      </DialogContent>
    </Dialog>
  )
}
