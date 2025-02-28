import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Badge } from '../ui/badge'
import OrderDetail from './OrderDetail'
import Pagination from './Pagination'

import { useCancelOrder, useGetMyOrders } from '@/apis/orderApi'

import { getStatusLabel } from '@/lib/constants'
import { cn, currencyFormatter } from '@/lib/utils'
import { Order } from '@/types'

const UserOrder = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [totalPages, setTotalPages] = useState(1)
  const { orders, pagination, isLoading } = useGetMyOrders({ page: 1, limit: 5 })
  const { cancelOrder, isPending } = useCancelOrder()
  const location = useLocation()
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search])
  const currentPage = parseInt(queryParams.get('page') || '1', 10)

  useEffect(() => {
    if (pagination?.totalPages) {
      setTotalPages(pagination.totalPages)
      localStorage.setItem('totalOrderPages', JSON.stringify(pagination.totalPages))
    } else {
      const storedPages = localStorage.getItem('totalOrderPages')
      if (storedPages) setTotalPages(Number(storedPages))
    }
  }, [pagination])

  if (isLoading) {
    return (
      <Card className='max-w-4xl mx-auto p-6'>
        <h1 className='text-xl font-semibold mb-6'>Đơn hàng của tôi</h1>
        <div className='flex justify-center'>
          <div className='animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full'></div>
        </div>
      </Card>
    )
  }

  if (!orders || orders.length === 0) {
    return (
      <Card className='max-w-4xl mx-auto p-6'>
        <h1 className='text-xl font-semibold mb-6'>Đơn mua của bạn</h1>
        <p className='text-muted-foreground'>Bạn chưa có đơn mua nào.</p>
      </Card>
    )
  }

  return (
    <>
      <Card className='max-w-4xl mx-auto p-6'>
        <h1 className='text-xl font-semibold mb-6'>Đơn hàng của tôi ({pagination?.totalOrders || 0})</h1>

        <div className='space-y-6'>
          {orders.map((order) => (
            <div key={order._id} className='border rounded-md overflow-hidden'>
              <div className='bg-muted p-3 flex justify-between items-center'>
                <div className='text-sm'>
                  Mã đơn hàng: <span className='font-medium'>{order._id}</span>
                </div>
                <Badge
                  variant='outline'
                  className={cn(
                    order.status === 'Cancelled'
                      ? 'bg-red-100 text-red-600 hover:bg-red-100'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  )}
                >
                  {getStatusLabel(order.status)}
                </Badge>
              </div>

              <div className='p-4'>
                {order.orderItems.map((orderItem) => (
                  <div key={orderItem.product.toString()} className='flex items-start py-3 border-b last:border-b-0'>
                    <div className='w-16 h-16 relative mr-4 flex-shrink-0'>
                      <img src={orderItem.image} alt={orderItem.title} className='object-cover' />
                    </div>
                    <div className='flex-grow'>
                      <h3 className='font-medium'>{orderItem.title}</h3>
                      <p className='text-sm text-muted-foreground'>Kích thước: {orderItem.size}</p>
                      <p className='text-sm text-muted-foreground'>Số lượng: x{orderItem.amount}</p>
                    </div>
                    <div className='text-right'>
                      <p className='text-red-500 font-medium'>{currencyFormatter(orderItem.price)}</p>
                    </div>
                  </div>
                ))}

                <div className='mt-4 space-y-2'>
                  <div className='flex justify-between text-sm'>
                    <span>Tiền ship:</span>
                    <span>{currencyFormatter(order.shippingFee)}</span>
                  </div>
                  <div className='flex justify-between font-medium'>
                    <span>Tổng số tiền:</span>
                    <span className='text-red-500'>{currencyFormatter(order.totalPrice + 3000)}</span>
                  </div>
                </div>

                <div className='mt-4 flex gap-3 justify-end'>
                  {order.status !== 'Cancelled' && (
                    <Button
                      variant='outline'
                      size='sm'
                      className='border-blue-500 text-blue-500 hover:bg-blue-50'
                      onClick={() => cancelOrder(order._id)}
                      disabled={isPending}
                    >
                      Hủy đơn hàng
                    </Button>
                  )}
                  <Button
                    variant='outline'
                    disabled={isPending}
                    size='sm'
                    className='border-blue-500 text-blue-500 hover:bg-blue-50'
                    onClick={() => setSelectedOrder(order)}
                  >
                    Xem chi tiết
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='pt-8'>
          <Pagination totalPages={totalPages} currentPage={currentPage} />
        </div>
      </Card>

      {selectedOrder && (
        <OrderDetail isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} order={selectedOrder} />
      )}
    </>
  )
}

export default UserOrder
