import { useState } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

import { useGetOrderOverview } from '@/apis/orderApi'

import { cn, currencyFormatter } from '@/lib/utils'
import { getOrderTimeLabel, getPaymentMethodLabel, getStatusLabel, orderTimeOptions } from '@/lib/constants'
import { Order } from '@/types'

const OrderMetrics = () => {
  const [orderTimeOption, setOrderTimeOption] = useState<string>('today')
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const { orderOverview, orders, isLoading } = useGetOrderOverview({ orderTimeOption })

  // Thay đổi hàm getOrdersByStatus để hỗ trợ phân trang
  const getOrdersByStatus = (status: string) => {
    let filteredOrders: Order[] = []

    if (!orders) return { orders: [], totalPages: 0, totalItems: 0 }

    switch (status) {
      case 'Pending':
        filteredOrders = orders.filter((order) => order.status === 'Pending')
        break
      case 'Processing':
        filteredOrders = orders.filter((order) => order.status === 'Processing')
        break
      case 'Delivering':
        filteredOrders = orders.filter((order) => order.status === 'Delivering')
        break
      case 'Delivered':
        filteredOrders = orders.filter((order) => order.status === 'Delivered')
        break
      case 'Cancelled':
        filteredOrders = orders.filter((order) => order.status === 'Cancelled')
        break
      default:
        filteredOrders = []
    }

    // Tính toán tổng số trang
    const totalPages = Math.ceil(filteredOrders.length / pageSize)

    // Trả về các đơn hàng cho trang hiện tại
    const startIndex = (page - 1) * pageSize
    const paginatedOrders = filteredOrders.slice(startIndex, startIndex + pageSize)

    return {
      orders: paginatedOrders,
      totalPages,
      totalItems: filteredOrders.length
    }
  }

  // Get status title for modal
  const getStatusTitle = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Số đơn hàng chưa giải quyết'
      case 'processing':
        return 'Số đơn hàng đang được xử lý'
      case 'shipping':
        return 'Số đơn hàng đang vận chuyển'
      case 'completed':
        return 'Số đơn hàng thành công'
      case 'cancelled':
        return 'Số đơn hàng đã hủy'
      default:
        return ''
    }
  }

  // Thêm hàm để reset trang khi mở modal mới
  const handleCardClick = (status: string) => {
    setSelectedStatus(status)
    setPage(1) // Reset về trang đầu tiên khi mở modal mới
    setIsModalOpen(true)
  }

  // Thêm hàm để xử lý chuyển trang
  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  return (
    <>
      <div className='space-y-4'>
        <div className='flex flex-wrap items-center justify-between gap-2'>
          <h2 className='text-2xl font-semibold'>Kho hàng ({getOrderTimeLabel(orderTimeOption)})</h2>

          <Select
            disabled={isLoading}
            value={orderTimeOption}
            defaultValue='all'
            onValueChange={(val: string) => setOrderTimeOption(val)}
          >
            <SelectTrigger className='w-[120px]'>
              <SelectValue placeholder='Lọc theo phương thức' />
            </SelectTrigger>
            <SelectContent>
              {orderTimeOptions.map((item, index) => (
                <SelectItem key={index} value={item}>
                  {getOrderTimeLabel(item)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {isLoading &&
            [...Array(6)].map((_, index) => (
              <Card key={index} className='h-[128.5px]'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-4'>
                  <Skeleton className='h-6 w-24' />
                </CardHeader>

                <CardContent className='flex justify-between items-center'>
                  <div className='flex flex-col gap-2'>
                    <Skeleton className='h-8 w-20' />
                  </div>
                </CardContent>
              </Card>
            ))}

          {orderOverview && (
            <>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium min-h-[2rem] leading-snug text-orange-500'>
                    Doanh thu
                  </CardTitle>
                </CardHeader>

                <CardContent className='flex justify-between items-center'>
                  <div className='flex flex-col gap-2'>
                    <div className='text-2xl font-bold'>{currencyFormatter(orderOverview.totalRevenue)}</div>
                  </div>
                </CardContent>
              </Card>

              <Card className='cursor-pointer' onClick={() => handleCardClick('Pending')}>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium min-h-[2rem] leading-snug'>
                    Số đơn hàng chưa giải quyết
                  </CardTitle>
                </CardHeader>

                <CardContent className='flex justify-between items-center'>
                  <div className='flex flex-col gap-2'>
                    <div className='text-2xl font-bold'>{orderOverview.pendingOrders}</div>
                  </div>
                </CardContent>
              </Card>

              <Card className='cursor-pointer' onClick={() => handleCardClick('Processing')}>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium min-h-[2rem] leading-snug text-yellow-500'>
                    Số đơn hàng đang được xử lý
                  </CardTitle>
                </CardHeader>

                <CardContent className='flex justify-between items-center'>
                  <div className='flex flex-col gap-2'>
                    <div className='text-2xl font-bold'>{orderOverview.processingOrders}</div>
                  </div>
                </CardContent>
              </Card>

              <Card className='cursor-pointer' onClick={() => handleCardClick('Delivering')}>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium min-h-[2rem] leading-snug text-purple-500'>
                    Số đơn hàng đang vận chuyển
                  </CardTitle>
                </CardHeader>

                <CardContent className='flex justify-between items-center'>
                  <div className='flex flex-col gap-2'>
                    <div className='text-2xl font-bold'>{orderOverview.onTheWayOrders}</div>
                  </div>
                </CardContent>
              </Card>

              <Card className='cursor-pointer' onClick={() => handleCardClick('Delivered')}>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium min-h-[2rem] leading-snug text-pink-500'>
                    Số đơn hàng thành công
                  </CardTitle>
                </CardHeader>

                <CardContent className='flex justify-between items-center'>
                  <div className='flex flex-col gap-2'>
                    <div className='text-2xl font-bold'>{orderOverview.deliveredOrders}</div>
                  </div>
                </CardContent>
              </Card>

              <Card className='cursor-pointer' onClick={() => handleCardClick('Cancelled')}>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium min-h-[2rem] leading-snug text-red-500'>
                    Số đơn hàng đã hủy
                  </CardTitle>
                </CardHeader>

                <CardContent className='flex justify-between items-center'>
                  <div className='flex flex-col gap-2'>
                    <div className='text-2xl font-bold'>{orderOverview.cancelledOrders}</div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className='max-w-4xl max-h-[80vh]'>
          <DialogHeader>
            <DialogTitle>
              {selectedStatus && getStatusTitle(selectedStatus)}
              {selectedStatus && (
                <span className='ml-2 text-sm font-normal text-muted-foreground'>
                  (Tổng số: {getOrdersByStatus(selectedStatus).totalItems})
                </span>
              )}
            </DialogTitle>
          </DialogHeader>
          <div className='overflow-y-auto max-h-[calc(80vh-10rem)]'>
            <Table>
              <TableHeader className='sticky top-0 bg-background'>
                <TableRow>
                  <TableHead>Tên khách hàng</TableHead>
                  <TableHead>Số điện thoại</TableHead>
                  <TableHead>Địa chỉ</TableHead>
                  <TableHead>Thanh toán</TableHead>
                  <TableHead>TT đơn hàng</TableHead>
                  <TableHead>Phương thức TT</TableHead>
                  <TableHead>Tổng giá</TableHead>
                  <TableHead>Ngày mua</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedStatus &&
                  getOrdersByStatus(selectedStatus).orders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell>{order.shippingAddress.name}</TableCell>
                      <TableCell>{order.shippingAddress.phone}</TableCell>
                      <TableCell>{order.shippingAddress.provinceName}</TableCell>
                      <TableCell>
                        <Badge
                          variant='outline'
                          className={cn(
                            'font-normal',
                            order.isPaid
                              ? 'border-green-200 bg-green-100 text-green-800 hover:bg-green-100/80'
                              : 'border-red-200 bg-red-100 text-red-800 hover:bg-red-100/80'
                          )}
                        >
                          {order.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant='outline'
                          className={cn(
                            'font-normal',
                            order.status !== 'Cancelled'
                              ? 'border-green-200 bg-green-100 text-green-800 hover:bg-green-100/80'
                              : 'border-red-200 bg-red-100 text-red-800 hover:bg-red-100/80'
                          )}
                        >
                          {getStatusLabel(order.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>{getPaymentMethodLabel(order.paymentMethod)}</TableCell>
                      <TableCell>{currencyFormatter(order.totalPrice)}</TableCell>
                      <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {selectedStatus && getOrdersByStatus(selectedStatus).totalPages > 1 && (
            <div className='flex items-center justify-center space-x-2 py-4'>
              <Button variant='outline' size='sm' onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                Trước
              </Button>
              <div className='flex items-center space-x-1'>
                {Array.from({ length: getOrdersByStatus(selectedStatus).totalPages }, (_, i) => i + 1).map(
                  (pageNumber) => (
                    <Button
                      key={pageNumber}
                      variant={pageNumber === page ? 'default' : 'outline'}
                      size='sm'
                      className='w-8 h-8 p-0'
                      onClick={() => handlePageChange(pageNumber)}
                    >
                      {pageNumber}
                    </Button>
                  )
                )}
              </div>
              <Button
                variant='outline'
                size='sm'
                onClick={() => handlePageChange(page + 1)}
                disabled={page === getOrdersByStatus(selectedStatus).totalPages}
              >
                Sau
              </Button>
            </div>
          )}

          <div className='flex items-center justify-between mt-2'>
            <div className='flex items-center space-x-2'>
              <span className='text-sm text-muted-foreground'>Số dòng mỗi trang:</span>
              <Select
                value={pageSize.toString()}
                onValueChange={(value) => {
                  setPageSize(Number.parseInt(value))
                  setPage(1)
                }}
              >
                <SelectTrigger className='w-16 h-8'>
                  <SelectValue placeholder={pageSize} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='5'>5</SelectItem>
                  <SelectItem value='10'>10</SelectItem>
                  <SelectItem value='15'>15</SelectItem>
                  <SelectItem value='20'>20</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedStatus && getOrdersByStatus(selectedStatus).totalItems > 0 && (
              <div className='text-sm text-muted-foreground'>
                Hiển thị {(page - 1) * pageSize + 1} đến{' '}
                {Math.min(page * pageSize, getOrdersByStatus(selectedStatus).totalItems)}
                trong tổng số {getOrdersByStatus(selectedStatus).totalItems} đơn hàng
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default OrderMetrics
