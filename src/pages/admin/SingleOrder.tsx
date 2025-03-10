import { useParams } from 'react-router-dom'

import { ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import SingleOrderSkeleton from '@/components/skeletons/admin/SingleOrderSkeleton'

import { useGetSingleOrder } from '@/apis/orderApi'
import { getPaymentMethodLabel, getStatusLabel } from '@/lib/constants'
import { currencyFormatter } from '@/lib/utils'

const SingleOrder = () => {
  const { orderId } = useParams()
  const { order, isLoading } = useGetSingleOrder(orderId)

  if (isLoading) {
    return <SingleOrderSkeleton />
  }

  if (!order) {
    return <div>Không tìm thấy đơn hàng</div>
  }

  return (
    <div className='space-y-4 max-w-6xl mx-auto'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Customer Information */}
        <Card>
          <CardHeader className='bg-gray-50 border-b'>
            <CardTitle className='text-lg font-medium'>Thông tin khách hàng</CardTitle>
          </CardHeader>
          <CardContent className='p-0'>
            <div className='divide-y'>
              <div className='grid grid-cols-[200px_1fr] p-4'>
                <div className='font-medium'>Tên khách hàng:</div>
                <div>{order.shippingAddress.name}</div>
              </div>
              <div className='grid grid-cols-[200px_1fr] p-4'>
                <div className='font-medium'>Email:</div>
                <div className='truncate'>{order.shippingAddress.email}</div>
              </div>
              <div className='grid grid-cols-[200px_1fr] p-4'>
                <div className='font-medium'>Số điện thoại:</div>
                <div>{order.shippingAddress.phone}</div>
              </div>
              <div className='grid grid-cols-[200px_1fr] p-4'>
                <div className='font-medium'>Địa chỉ giao hàng:</div>
                <div>
                  {`${order.shippingAddress.address}, ${order.shippingAddress.wardName}, ${order.shippingAddress.districtName}, ${order.shippingAddress.provinceName}`}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Details */}
        <Card>
          <CardHeader className='bg-gray-50 border-b'>
            <CardTitle className='text-lg font-medium'>Chi tiết đơn hàng</CardTitle>
          </CardHeader>
          <CardContent className='p-0'>
            <div className='divide-y'>
              <div className='grid grid-cols-[200px_1fr] p-4'>
                <div className='font-medium'>Mã đơn hàng:</div>
                <div className='truncate'>{order._id}</div>
              </div>
              <div className='grid grid-cols-[200px_1fr] p-4'>
                <div className='font-medium'>Ngày đặt hàng:</div>
                <div>{new Date(order.createdAt).toLocaleDateString()}</div>
              </div>
              <div className='grid grid-cols-[200px_1fr] p-4'>
                <div className='font-medium'>Trạng thái đơn hàng:</div>
                <div>{getStatusLabel(order.status)}</div>
              </div>
              <div className='grid grid-cols-[200px_1fr] p-4'>
                <div className='font-medium'>Phương thức thanh toán:</div>
                <div>{getPaymentMethodLabel(order.paymentMethod)}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products */}
      <Card>
        <CardHeader className='bg-gray-50 border-b'>
          <CardTitle className='text-lg font-medium'>Sản phẩm</CardTitle>
        </CardHeader>
        <CardContent className='p-0'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-12'>#</TableHead>
                <TableHead>Tên</TableHead>
                <TableHead>Hình ảnh</TableHead>
                <TableHead>Kích thước</TableHead>
                <TableHead>Số lượng</TableHead>
                <TableHead className='text-right'>Giá</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.orderItems.map((order, index) => (
                <TableRow key={order.product.toString()}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{order.title}</TableCell>
                  <TableCell>
                    <img src={order.image} alt={order.title} className='w-16 h-16 object-cover' />
                  </TableCell>
                  <TableCell>{order.size}</TableCell>
                  <TableCell className='text-orange-500 font-medium'>{order.amount}</TableCell>
                  <TableCell className='text-right'>{currencyFormatter(order.price)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Order Summary */}
          <div className='border-t'>
            <div className='flex justify-end p-4'>
              <div className='w-full max-w-xs space-y-2'>
                <div className='flex justify-between'>
                  <span className='font-medium'>Tổng tiền hàng:</span>
                  <span>{currencyFormatter(order.totalPrice)}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='font-medium'>Phí vận chuyển:</span>
                  <span>{currencyFormatter(3000)}</span>
                </div>
                <div className='flex justify-between text-lg font-bold'>
                  <span>Tổng tiền:</span>
                  <span className='text-red-600'>{currencyFormatter(order.totalPrice + 3000)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className='flex justify-end gap-4'>
        <Button type='submit' className='bg-[#1570EF] hover:bg-[#1f4375]'>
          <ArrowLeft className='mr-2 h-4 w-4' />
          Quay lại
        </Button>
      </div>
    </div>
  )
}

export default SingleOrder
