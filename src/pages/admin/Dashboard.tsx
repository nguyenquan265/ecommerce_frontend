import { useState } from 'react'

import {
  Package2,
  TrendingUp,
  Wallet,
  Home,
  XCircle,
  Package,
  Clock,
  User2,
  Folder,
  Mail,
  MailMinus
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from '@/components/ui/calendar'
import { Skeleton } from '@/components/ui/skeleton'
import MetricsCard from '@/components/shared/admin/MetricsCard'
import OrderSummaryChart from '@/components/shared/admin/OrderSummaryChart'

import { useGetShopOverview } from '@/apis/orderApi'
import { currencyFormatter } from '@/lib/utils'
import PaymentSummaryChart from '@/components/shared/admin/PaymentSummaryChart'
import { useGetAllCategories } from '@/apis/categoryApi'

const Dashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const { shopOverview, isLoading } = useGetShopOverview()
  const { categories } = useGetAllCategories()

  return (
    <main className='flex-1 space-y-6'>
      <h2 className='text-2xl font-semibold'>Trang chủ</h2>

      <div className='grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8'>
        <MetricsCard
          isLoading={isLoading}
          label='Loại sản phẩm'
          value={shopOverview?.totalProducts}
          icon={Package2}
          iconColor='text-blue-500'
        />
        <MetricsCard
          isLoading={isLoading}
          label='Đơn hàng'
          value={shopOverview?.totalOrders}
          icon={Package}
          iconColor='text-purple-500'
        />
        <MetricsCard
          isLoading={isLoading}
          label='Người dùng'
          value={shopOverview?.totalUsers}
          icon={User2}
          iconColor='text-orange-500'
        />
        <MetricsCard
          isLoading={isLoading}
          label='Danh mục'
          value={categories?.length}
          icon={Folder}
          iconColor='text-green-500'
        />
      </div>

      <div className='grid gap-4 md:gap-8 grid-cols-1 lg:grid-cols-2 mb-8'>
        {isLoading ? (
          <Card>
            <CardHeader>
              <Skeleton className='h-7 w-48' /> {/* Skeleton for the title */}
            </CardHeader>
            <CardContent>
              <div className='grid gap-4 grid-cols-2'>
                {/* First metric skeleton */}
                <div className='flex items-center space-x-4'>
                  <Skeleton className='h-9 w-9 rounded-lg' /> {/* Skeleton for icon container */}
                  <div className='space-y-2'>
                    <Skeleton className='h-4 w-24' /> {/* Skeleton for label */}
                    <Skeleton className='h-7 w-16' /> {/* Skeleton for value */}
                  </div>
                </div>

                {/* Second metric skeleton */}
                <div className='flex items-center space-x-4'>
                  <Skeleton className='h-9 w-9 rounded-lg' />
                  <div className='space-y-2'>
                    <Skeleton className='h-4 w-36' /> {/* Wider for longer text */}
                    <Skeleton className='h-7 w-16' />
                  </div>
                </div>

                {/* Third metric skeleton */}
                <div className='flex items-center space-x-4'>
                  <Skeleton className='h-9 w-9 rounded-lg' />
                  <div className='space-y-2'>
                    <Skeleton className='h-4 w-20' />
                    <Skeleton className='h-7 w-16' />
                  </div>
                </div>

                {/* Fourth metric skeleton */}
                <div className='flex items-center space-x-4'>
                  <Skeleton className='h-9 w-9 rounded-lg' />
                  <div className='space-y-2'>
                    <Skeleton className='h-4 w-28' />
                    <Skeleton className='h-7 w-16' />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Tổng quan mua hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid gap-4 grid-cols-2'>
                <div className='flex items-center space-x-4'>
                  <div className='p-2 rounded-lg bg-blue-500 bg-opacity-10'>
                    <TrendingUp className='h-5 w-5 text-blue-500' />
                  </div>
                  <div>
                    <p className='text-sm font-medium text-muted-foreground'>Tổng thu</p>
                    <h3 className='text-2xl font-bold'>{currencyFormatter(shopOverview?.totalRevenue || 0)}</h3>
                  </div>
                </div>
                <div className='flex items-center space-x-4'>
                  <div className='p-2 rounded-lg bg-green-500 bg-opacity-10'>
                    <Home className='h-5 w-5 text-green-500' />
                  </div>
                  <div>
                    <p className='text-sm font-medium text-muted-foreground'>Số đơn hàng vận chuyển thành công</p>
                    <h3 className='text-2xl font-bold'>{shopOverview?.deliveredOrders}</h3>
                  </div>
                </div>
                <div className='flex items-center space-x-4'>
                  <div className='p-2 rounded-lg bg-purple-500 bg-opacity-10'>
                    <XCircle className='h-5 w-5 text-purple-500' />
                  </div>
                  <div>
                    <p className='text-sm font-medium text-muted-foreground'>Số đơn hàng đã hủy</p>
                    <h3 className='text-2xl font-bold'>{shopOverview?.cancelledOrders}</h3>
                  </div>
                </div>
                <div className='flex items-center space-x-4'>
                  <div className='p-2 rounded-lg bg-orange-500 bg-opacity-10'>
                    <Wallet className='h-5 w-5 text-orange-500' />
                  </div>
                  <div>
                    <p className='text-sm font-medium text-muted-foreground'>Số đơn hàng đã thanh toán</p>
                    <h3 className='text-2xl font-bold'>{shopOverview?.isPaidOrders}</h3>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className='grid gap-4 grid-cols-1'>
          <div className='grid gap-4 grid-cols-2'>
            <MetricsCard
              isLoading={isLoading}
              label='Số sản phẩm tồn kho'
              value={shopOverview?.totalProductInStock}
              icon={Package}
              iconColor='text-orange-500'
            />
            <MetricsCard
              isLoading={isLoading}
              label='Số sản phẩm đã xóa'
              value={shopOverview?.totalDeletedProducts}
              icon={Clock}
              iconColor='text-purple-500'
            />
          </div>

          {isLoading ? (
            <Card>
              <CardHeader>
                <Skeleton className='h-7 w-48' /> {/* Skeleton for the title */}
              </CardHeader>
              <CardContent>
                <div className='grid gap-4 grid-cols-2'>
                  {/* First metric skeleton */}
                  <div className='flex items-center space-x-4'>
                    <Skeleton className='h-9 w-9 rounded-lg' /> {/* Skeleton for icon container */}
                    <div className='space-y-2'>
                      <Skeleton className='h-4 w-32' /> {/* Skeleton for label */}
                      <Skeleton className='h-7 w-16' /> {/* Skeleton for value */}
                    </div>
                  </div>

                  {/* Second metric skeleton */}
                  <div className='flex items-center space-x-4'>
                    <Skeleton className='h-9 w-9 rounded-lg' />
                    <div className='space-y-2'>
                      <Skeleton className='h-4 w-36' /> {/* Wider for longer text */}
                      <Skeleton className='h-7 w-16' />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Tổng quan người dùng</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid gap-4 grid-cols-2'>
                  <div className='flex items-center space-x-4'>
                    <div className='p-2 rounded-lg bg-blue-500 bg-opacity-10'>
                      <Mail className='h-5 w-5 text-blue-500' />
                    </div>
                    <div>
                      <p className='text-sm font-medium text-muted-foreground'>Số người dùng email</p>
                      <h3 className='text-2xl font-bold'>{shopOverview?.totalEmailUsers}</h3>
                    </div>
                  </div>
                  <div className='flex items-center space-x-4'>
                    <div className='p-2 rounded-lg bg-purple-500 bg-opacity-10'>
                      <MailMinus className='h-5 w-5 text-purple-500' />
                    </div>
                    <div>
                      <p className='text-sm font-medium text-muted-foreground'>Số người dùng google</p>
                      <h3 className='text-2xl font-bold'>{shopOverview?.totalGoogleUsers}</h3>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className='grid gap-4 md:gap-8 grid-cols-1 lg:grid-cols-2 mb-8'>
        {isLoading ? (
          <Card>
            <CardHeader>
              <Skeleton className='h-7 w-24' /> {/* Skeleton for the title */}
            </CardHeader>
            <CardContent className='flex justify-center'>
              <div className='w-full'>
                {/* Month navigation skeleton */}
                <div className='flex justify-between items-center mb-4'>
                  <Skeleton className='h-6 w-24' /> {/* Month name */}
                  <div className='flex space-x-2'>
                    <Skeleton className='h-8 w-8 rounded-md' /> {/* Previous month button */}
                    <Skeleton className='h-8 w-8 rounded-md' /> {/* Next month button */}
                  </div>
                </div>

                {/* Weekday headers */}
                <div className='grid grid-cols-7 gap-1 mb-2'>
                  {Array(7)
                    .fill(0)
                    .map((_, i) => (
                      <Skeleton key={i} className='h-6 w-8 mx-auto' />
                    ))}
                </div>

                {/* Calendar days grid - 6 rows x 7 columns */}
                <div className='grid grid-cols-7 gap-1'>
                  {Array(42)
                    .fill(0)
                    .map((_, i) => (
                      <Skeleton
                        key={i}
                        className='h-10 w-10 rounded-md mx-auto'
                        // Make some days "empty" (transparent) to simulate a real calendar month
                        style={{
                          opacity: i < 5 || i > 32 ? 0.3 : 1
                        }}
                      />
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Lịch</CardTitle>
            </CardHeader>
            <CardContent className='flex justify-center'>
              <Calendar
                mode='single'
                selected={date}
                onSelect={setDate}
                className='h-full w-full flex'
                classNames={{
                  months: 'flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1',
                  month: 'space-y-4 w-full flex flex-col',
                  table: 'w-full h-full border-collapse space-y-1',
                  head_row: '',
                  row: 'w-full mt-2'
                }}
              />
            </CardContent>
          </Card>
        )}

        <OrderSummaryChart isLoading={isLoading} data={shopOverview?.orderChartData} />
      </div>

      <div className='grid gap-4 md:gap-8 grid-cols-1 lg:grid-cols-2 mb-8'>
        <PaymentSummaryChart isLoading={isLoading} data={shopOverview?.paymentMethodArr} />

        {isLoading ? (
          <Card>
            <CardHeader className='flex flex-row items-center justify-between'>
              <Skeleton className='h-7 w-72' /> {/* Skeleton for the title */}
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {/* Generate 3 skeleton product items */}
                {Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className='flex items-center justify-between'>
                      <div className='flex items-center space-x-4'>
                        <Skeleton className='h-12 w-12 rounded-lg' /> {/* Skeleton for product image */}
                        <div>
                          <Skeleton className='h-5 w-40 mb-2' /> {/* Skeleton for product title */}
                          <Skeleton className='h-4 w-48' /> {/* Skeleton for quantity text */}
                        </div>
                      </div>
                      <Skeleton className='h-6 w-14 rounded-full' /> {/* Skeleton for badge */}
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader className='flex flex-row items-center justify-between'>
              <CardTitle>Số lượng hàng tồn kho thấp ({shopOverview?.lowStockProducts.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {shopOverview?.lowStockProducts.map((product) => (
                  <div key={product._id} className='flex items-center justify-between'>
                    <div className='flex items-center space-x-4'>
                      <div className='h-12 w-12 rounded-lg overflow-hidden'>
                        <img
                          src={product.mainImage}
                          alt={product.title}
                          width={48}
                          height={48}
                          className='h-full w-full object-cover'
                        />
                      </div>
                      <div>
                        <h4 className='font-medium'>{product.title}</h4>
                        <p className='text-sm text-muted-foreground'>Số lượng còn lại : {product.quantity} sản phẩm</p>
                      </div>
                    </div>
                    <span className='inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold bg-red-100 text-red-700'>
                      thấp
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}

export default Dashboard
