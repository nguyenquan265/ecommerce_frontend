import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer } from '@/components/ui/chart'
import { Skeleton } from '@/components/ui/skeleton'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

interface PaymentSummaryChartProps {
  isLoading: boolean
  data?: {
    method: string
    count: number
  }[]
}

const PaymentSummaryChart: React.FC<PaymentSummaryChartProps> = ({ isLoading, data }) => {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between'>
        {isLoading ? <Skeleton className='h-8 w-[250px]' /> : <CardTitle>Tổng quan hình thức thanh toán</CardTitle>}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className='flex flex-col items-center space-y-4'>
            {/* Skeleton for pie chart */}
            <div className='relative flex items-center justify-center'>
              <Skeleton className='h-[240px] w-[240px] rounded-full' />
              <Skeleton className='absolute h-[120px] w-[120px] rounded-full' />
            </div>

            {/* Skeleton for legend */}
            <div className='mt-4 flex w-full justify-center space-x-4'>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className='flex items-center space-x-2'>
                  <Skeleton className='h-3 w-3' />
                  <Skeleton className='h-4 w-20' />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <ChartContainer
            config={{
              method: {
                label: 'Payment Method'
              },
              count: {
                label: 'Count'
              }
            }}
            className='h-[300px] w-full'
          >
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={data}
                  cx='50%'
                  cy='50%'
                  labelLine={false}
                  outerRadius={120}
                  fill='#8884d8'
                  dataKey='count'
                  nameKey='method'
                  label={({ method, percent, count }) => {
                    if (count === 0) return null
                    return `${method}: ${(percent * 100).toFixed(0)}%`
                  }}
                >
                  {data?.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}

export default PaymentSummaryChart
