import { Skeleton } from '../ui/skeleton'

const SkeletonProductImages = () => (
  <div className='space-y-4'>
    <Skeleton className='w-full aspect-square rounded-lg' />
    <div className='flex gap-2'>
      {[...Array(4)].map((_, index) => (
        <Skeleton key={index} className='w-1/4 aspect-square rounded-lg' />
      ))}
    </div>
  </div>
)

export default SkeletonProductImages
