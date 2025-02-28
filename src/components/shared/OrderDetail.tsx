import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { getStatusLabel } from '@/lib/constants'

import { currencyFormatter } from '@/lib/utils'
import { Order } from '@/types'

interface OrderDetailProps {
  isOpen: boolean
  onClose: () => void
  order: Order
}

const OrderDetail: React.FC<OrderDetailProps> = ({ isOpen, onClose, order }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-2xl overflow-y-scroll max-h-[95%] custom-dialog'>
        <DialogHeader>
          <DialogTitle>Chi tiết đơn hàng</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        {/* Recipient Information */}
        <div className='space-y-4'>
          <div className='rounded-lg border p-4'>
            <h3 className='font-semibold mb-3'>Thông tin người nhận</h3>
            <div className='space-y-2 text-sm'>
              <p>
                <span className='text-muted-foreground'>Tên người nhận:</span> {order.shippingAddress.name}
              </p>
              <p>
                <span className='text-muted-foreground'>Số điện thoại:</span> {order.shippingAddress.phone}
              </p>
              <p>
                <span className='text-muted-foreground'>Địa chỉ nhận hàng:</span>{' '}
                {`${order.shippingAddress.address}, ${order.shippingAddress.wardName}, ${order.shippingAddress.districtName}, ${order.shippingAddress.provinceName}`}
              </p>
              <p>
                <span className='text-muted-foreground'>Thời điểm đặt hàng:</span>{' '}
                {new Date(order.createdAt).toLocaleString()}
              </p>
              {/* {order.recipient.note && (
                <p>
                  <span className='text-muted-foreground'>Ghi chú đơn hàng:</span> {order.recipient.note}
                </p>
              )} */}
            </div>
          </div>

          {/* Order Information */}
          <div className='rounded-lg border p-4'>
            <h3 className='font-semibold mb-3'>Thông tin đơn hàng</h3>
            <p className='text-sm text-muted-foreground mb-4'>Mã đơn hàng: {order._id}</p>

            <div className='space-y-4'>
              {order.orderItems.map((item, index) => (
                <div key={index} className='flex gap-4'>
                  <div className='relative h-20 w-20 flex-shrink-0'>
                    <img src={item.image} alt={item.title} className='object-cover rounded-md' />
                  </div>
                  <div className='flex-grow'>
                    <h4 className='font-medium'>{item.title}</h4>
                    <p className='text-sm text-muted-foreground'>Kích thước: {item.size}</p>
                    <div className='flex justify-between items-center mt-2'>
                      <p className='text-sm'>Số lượng: x{item.amount}</p>
                      <p className='text-red-500'>{currencyFormatter(item.price)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator className='my-4' />

            <div className='space-y-2'>
              <div className='flex justify-between text-sm'>
                <span>Tổng tiền hàng</span>
                <span>{currencyFormatter(order.totalPrice)}</span>
              </div>
              <div className='flex justify-between text-sm'>
                <span>Phí vận chuyển</span>
                <span>{currencyFormatter(order.shippingFee)}</span>
              </div>
              <Separator className='my-2' />
              <div className='flex justify-between font-medium'>
                <span>Thành tiền</span>
                <span className='text-red-500'>{currencyFormatter(order.totalPrice + order.shippingFee)}</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className='rounded-lg border p-4'>
            <h3 className='font-semibold mb-3'>Phương thức thanh toán</h3>
            <p className='text-sm'>{order.paymentMethod}</p>
          </div>

          {/* Order Status */}
          <div className='rounded-lg border p-4'>
            <h3 className='font-semibold mb-3'>Trạng thái đơn hàng</h3>
            <p className='text-sm'>
              {getStatusLabel(order.status)}
              {order.isDelivered && ` - Đã giao hàng vào ${new Date(order.deliveredAt).toLocaleString()}`}
              {order.isPaid && ` - Đã thanh toán vào ${new Date(order.paidAt).toLocaleString()}`}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default OrderDetail
