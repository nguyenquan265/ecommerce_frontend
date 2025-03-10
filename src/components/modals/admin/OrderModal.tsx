import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import OrderForm from '@/components/forms/admin/OrderForm'

import { Order } from '@/types'

interface OrderModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedOrder: Order | null
}

const OrderModal: React.FC<OrderModalProps> = ({ open, onOpenChange, selectedOrder }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Chỉnh sửa đơn hàng</DialogTitle>
          <DialogDescription>Chỉnh sửa thông tin đơn hàng</DialogDescription>
        </DialogHeader>

        <OrderForm onOpenChange={onOpenChange} selectedOrder={selectedOrder} />
      </DialogContent>
    </Dialog>
  )
}

export default OrderModal
