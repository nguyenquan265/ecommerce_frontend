import { Skeleton } from '../ui/skeleton'

const SkeletonProductDetails = () => (
  <div className='space-y-4'>
    <Skeleton className='h-8 w-3/4' />
    <Skeleton className='h-6 w-1/4' />
    <div className='space-y-2'>
      <Skeleton className='h-4 w-1/2' />
      <Skeleton className='h-4 w-1/3' />
    </div>
    <div className='space-y-4'>
      <div className='flex gap-4'>
        <Skeleton className='h-10 w-1/4' />
        <Skeleton className='h-10 flex-1' />
      </div>
      <Skeleton className='h-10 w-full' />
      <Skeleton className='h-10 w-full' />
    </div>
  </div>
)

export default SkeletonProductDetails
