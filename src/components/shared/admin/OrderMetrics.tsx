import { useState } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { useGetOrderOverview } from '@/apis/orderApi'

import { currencyFormatter } from '@/lib/utils'
import { getOrderTimeLabel, orderTimeOptions } from '@/lib/constants'

const OrderMetrics = () => {
  const [orderTimeOption, setOrderTimeOption] = useState<string>('today')
  const { orderOverview, isLoading } = useGetOrderOverview({ orderTimeOption })

  return (
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
            <Card key={index}>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <Skeleton className='h-6 w-24' />
              </CardHeader>

              <CardContent className='flex justify-between items-center'>
                <div className='flex flex-col gap-2'>
                  <Skeleton className='h-8 w-20' />
                  <Skeleton className='h-3 w-16' />
                </div>

                <div className='flex flex-col gap-2'>
                  <Skeleton className='h-7 w-16' />
                  <Skeleton className='h-3 w-24' />
                </div>
              </CardContent>
            </Card>
          ))}

        {orderOverview && (
          <>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium text-orange-500'>Doanh thu</CardTitle>
              </CardHeader>

              <CardContent className='flex justify-between items-center'>
                <div className='flex flex-col gap-2'>
                  <div className='text-2xl font-bold'>{currencyFormatter(orderOverview.totalRevenue)}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>Số đơn hàng chưa giải quyết</CardTitle>
              </CardHeader>

              <CardContent className='flex justify-between items-center'>
                <div className='flex flex-col gap-2'>
                  <div className='text-2xl font-bold'>{orderOverview.pendingOrders}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium text-yellow-500'>Số đơn hàng đang được xử lý</CardTitle>
              </CardHeader>

              <CardContent className='flex justify-between items-center'>
                <div className='flex flex-col gap-2'>
                  <div className='text-2xl font-bold'>{orderOverview.processingOrders}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium text-purple-500'>Số đơn hàng đang vận chuyển</CardTitle>
              </CardHeader>

              <CardContent className='flex justify-between items-center'>
                <div className='flex flex-col gap-2'>
                  <div className='text-2xl font-bold'>{orderOverview.onTheWayOrders}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium text-pink-500'>Số đơn hàng thành công</CardTitle>
              </CardHeader>

              <CardContent className='flex justify-between items-center'>
                <div className='flex flex-col gap-2'>
                  <div className='text-2xl font-bold'>{orderOverview.deliveredOrders}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium text-red-500'>Số đơn hàng đã hủy</CardTitle>
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
  )
}

export default OrderMetrics
