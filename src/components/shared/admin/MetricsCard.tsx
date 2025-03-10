import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { type LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

interface MetricsCardProps {
  label: string
  value?: string | number
  icon: LucideIcon
  iconColor?: string
  isLoading: boolean
}

const MetricsCard: React.FC<MetricsCardProps> = ({ label, value, icon: Icon, iconColor, isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent className='p-6'>
          <div className='flex items-center space-x-4'>
            <Skeleton className='h-9 w-9 rounded-lg' />
            <div className='space-y-2'>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-7 w-16' />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className='p-6'>
        <div className='flex items-center space-x-4'>
          <div className={cn('p-2 rounded-lg', iconColor ? `${iconColor} bg-opacity-10` : 'bg-gray-100')}>
            <Icon className={cn('h-5 w-5', iconColor)} />
          </div>
          <div>
            <p className='text-sm font-medium text-muted-foreground'>{label}</p>
            <h3 className='text-2xl font-bold'>{value}</h3>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default MetricsCard
