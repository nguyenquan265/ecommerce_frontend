import { useEffect, useState } from 'react'
import lodash from 'lodash'

import { ChevronDown, Filter } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import OrderMetrics from '@/components/shared/admin/OrderMetrics'
import CellAction from '@/components/shared/admin/CellAction'
import OrderModal from '@/components/modals/admin/OrderModal'
import AdminPagination from '@/components/shared/admin/AdminPagination'

import { useGetAdminOrders } from '@/apis/orderApi'

import { SortOption, cn, currencyFormatter, getSortLabel } from '@/lib/utils'
import { Order } from '@/types'
import { getPaymentMethodLabel, getStatusLabel, orderPaymentMethodOptions } from '@/lib/constants'

const sortOptions: SortOption[] = ['desc', 'asc', 'a-z', 'z-a']

const Orders = () => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState<SortOption>('desc')
  const [paymentMethod, setPaymentMethod] = useState<string>('all')
  const [searchString, setSearchString] = useState('')
  const { orders, pagination, isLoading } = useGetAdminOrders({
    page,
    limit: 10,
    searchString,
    sortBy,
    paymentMethod
  })

  useEffect(() => {
    if (!dialogOpen) {
      setSelectedOrder(null)
    }
  }, [dialogOpen])

  const handleSearch = lodash.debounce((value: string) => {
    setSearchString(value)
    setPage(1)
  }, 800)

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value)
  }

  return (
    <div className='space-y-6'>
      <OrderMetrics />

      <div className='space-y-4'>
        <div className='flex flex-wrap items-center justify-between'>
          <h2 className='text-2xl font-semibold'>Đơn hàng ({pagination?.totalOrders || 0})</h2>

          <div className='flex flex-wrap items-center gap-2'>
            <Select
              disabled={isLoading}
              value={paymentMethod}
              defaultValue='all'
              onValueChange={(val: string) => setPaymentMethod(val)}
            >
              <SelectTrigger className='w-[120px]'>
                <SelectValue placeholder='Lọc theo phương thức' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>tất cả</SelectItem>
                {orderPaymentMethodOptions.map((item, index) => (
                  <SelectItem key={index} value={item}>
                    {getPaymentMethodLabel(item)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <DropdownMenu>
              <DropdownMenuTrigger asChild disabled={isLoading}>
                <Button variant='outline'>
                  <Filter className='mr-2 h-4 w-4' />
                  <p className='font-normal'>Sắp Xếp</p>
                  <ChevronDown className='ml-2 h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {sortOptions.map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => setSortBy(option)}
                    className={sortBy === option ? 'bg-accent' : ''}
                  >
                    {getSortLabel(option)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className='flex items-center gap-4'>
          <div className='md:w-96 max-w-96'>
            <Input placeholder='Tìm kiếm đơn hàng' className='w-full' onChange={onSearchChange} />
          </div>
        </div>

        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên khách hàng</TableHead>
                <TableHead>Số điện thoại</TableHead>
                <TableHead>Địa chỉ</TableHead>
                <TableHead>Thanh toán</TableHead>
                <TableHead>TT đơn hàng</TableHead>
                <TableHead>Phương thức TT</TableHead>
                <TableHead>Tổng giá</TableHead>
                <TableHead>Ngày mua</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={9} className='h-24 text-center'>
                    Đang tải...
                  </TableCell>
                </TableRow>
              )}

              {orders?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className='h-24 text-center'>
                    Không tìm thấy sản phẩm nào
                  </TableCell>
                </TableRow>
              )}

              {orders?.map((order) => (
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
                  <TableCell>
                    <CellAction
                      data={order}
                      type='order'
                      onOpenChange={setDialogOpen}
                      setSelectedOrderObject={setSelectedOrder}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <AdminPagination page={page} setPage={setPage} pagination={pagination} isLoading={isLoading} />

        <OrderModal open={dialogOpen} onOpenChange={setDialogOpen} selectedOrder={selectedOrder} />
      </div>
    </div>
  )
}

export default Orders
