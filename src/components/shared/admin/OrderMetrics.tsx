import { useGetOrderOverview } from '@/apis/orderApi'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const OrderMetrics = () => {
  const { orderOverview, isLoading } = useGetOrderOverview()

  return (
    <div className='space-y-4'>
      <h2 className='text-2xl font-semibold'>Tổng kho</h2>

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
                <CardTitle className='text-sm font-medium text-orange-500'>Tổng doanh thu</CardTitle>
              </CardHeader>

              <CardContent className='flex justify-between items-center'>
                <div className='flex flex-col gap-2'>
                  <div className='text-2xl font-bold'>{orderOverview.totalRevenue}</div>

                  <p className='text-xs text-muted-foreground'>7 ngày qua</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>Chưa giải quyết</CardTitle>
              </CardHeader>

              <CardContent className='flex justify-between items-center'>
                <div className='flex flex-col gap-2'>
                  <div className='text-2xl font-bold'>{orderOverview.pendingOrders}</div>

                  <p className='text-xs text-muted-foreground'>7 ngày qua</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium text-yellow-500'>Đang xử lý</CardTitle>
              </CardHeader>

              <CardContent className='flex justify-between items-center'>
                <div className='flex flex-col gap-2'>
                  <div className='text-2xl font-bold'>{orderOverview.processingOrders}</div>

                  <p className='text-xs text-muted-foreground'>7 ngày qua</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium text-purple-500'>Trên đường đi</CardTitle>
              </CardHeader>

              <CardContent className='flex justify-between items-center'>
                <div className='flex flex-col gap-2'>
                  <div className='text-2xl font-bold'>{orderOverview.onTheWayOrders}</div>

                  <p className='text-xs text-muted-foreground'>7 ngày qua</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium text-pink-500'>Vận chuyển thành công</CardTitle>
              </CardHeader>

              <CardContent className='flex justify-between items-center'>
                <div className='flex flex-col gap-2'>
                  <div className='text-2xl font-bold'>{orderOverview.deliveredOrders}</div>

                  <p className='text-xs text-muted-foreground'>7 ngày qua</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium text-red-500'>Đã hủy</CardTitle>
              </CardHeader>

              <CardContent className='flex justify-between items-center'>
                <div className='flex flex-col gap-2'>
                  <div className='text-2xl font-bold'>{orderOverview.cancelledOrders}</div>

                  <p className='text-xs text-muted-foreground'>7 ngày qua</p>
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
