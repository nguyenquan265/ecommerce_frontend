import { Skeleton } from '@/components/ui/skeleton'

const SingleProductSkeleton = () => {
  return (
    <div className='space-y-4'>
      <div className='space-y-8 w-full'>
        <div className='flex items-center justify-between'>
          <Skeleton className='h-10 w-[200px]' />
          <Skeleton className='h-10 w-10' />
        </div>
        <Skeleton className='h-[1px] w-full' />
        <div className='space-y-8'>
          <Skeleton className='h-[200px] w-full' />
          <Skeleton className='h-[200px] w-full' />
          <div className='grid grid-cols-2 gap-8'>
            {[...Array(8)].map((_, i) => (
              <div key={i} className='space-y-2'>
                <Skeleton className='h-4 w-[100px]' />
                <Skeleton className='h-10 w-full' />
              </div>
            ))}
          </div>
          <div className='flex justify-end'>
            <Skeleton className='h-10 w-[150px]' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProductSkeleton
