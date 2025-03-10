import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Skeleton } from '@/components/ui/skeleton'

interface OrderSummaryChartProps {
  isLoading: boolean
  data?: {
    month: string
    totalRevenue: number
  }[]
}

const OrderSummaryChart: React.FC<OrderSummaryChartProps> = ({ isLoading, data }) => {
  const transformedData = data?.map((item) => ({
    month: item.month,
    Revenue: item.totalRevenue
  }))

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className='h-7 w-48' /> {/* Skeleton for the title */}
        </CardHeader>
        <CardContent>
          <div className='h-[300px] relative'>
            {/* Skeleton for the chart background */}
            <div className='absolute inset-0 flex flex-col'>
              {/* Y-axis label skeletons */}
              <div className='absolute left-0 top-0 bottom-0 w-16 flex flex-col justify-between py-6'>
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} className='h-4 w-10 ml-2' />
                  ))}
              </div>

              {/* X-axis label skeletons */}
              <div className='absolute left-16 right-0 bottom-0 h-6 flex justify-between px-4'>
                {Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} className='h-4 w-12' />
                  ))}
              </div>

              {/* Grid lines */}
              <div className='absolute left-16 right-0 top-6 bottom-6 flex flex-col justify-between'>
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className='w-full h-px bg-gray-100' />
                  ))}
              </div>

              {/* Placeholder for the line */}
              <div className='absolute left-16 right-0 top-6 bottom-12 flex items-center'>
                <Skeleton className='h-2 w-full' />
              </div>

              {/* Dot skeletons */}
              <div className='absolute left-16 right-0 top-6 bottom-12 flex justify-between items-center px-4'>
                {Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} className='h-4 w-4 rounded-full' />
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!data) return

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tổng quan đơn hàng</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='h-[300px]'>
          <ChartContainer
            config={{
              Revenue: {
                label: 'Doanh thu:',
                color: 'hsl(24, 95%, 53%)' // #F97316 (orange)
              }
            }}
          >
            <LineChart data={transformedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray='3 3' vertical={false} />
              <XAxis dataKey='month' axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `${value / 1000}k`} />
              <Line
                type='monotone'
                dataKey='Revenue'
                stroke='var(--color-Revenue)'
                strokeWidth={2}
                dot={{ r: 4, fill: 'var(--color-Revenue)' }}
                activeDot={{ r: 6 }}
              />
              <ChartTooltip content={<ChartTooltipContent className='bg-white border-none rounded-lg shadow-md' />} />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default OrderSummaryChart
