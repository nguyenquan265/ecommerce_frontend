import { Skeleton } from '@/components/ui/skeleton'

const SingleUserSkeleton = () => {
  return (
    <div className='space-y-4'>
      <Skeleton className='h-8 w-[200px]' />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='space-y-4'>
          <Skeleton className='h-4 w-[100px]' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-4 w-[100px]' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-4 w-[100px]' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-4 w-[100px]' />
          <Skeleton className='h-10 w-full' />
        </div>
        <div className='space-y-4'>
          <Skeleton className='h-4 w-[100px]' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-4 w-[100px]' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-4 w-[100px]' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-4 w-[100px]' />
          <Skeleton className='h-10 w-full' />
        </div>
      </div>
      <div className='space-y-4'>
        <Skeleton className='h-4 w-[100px]' />
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <Skeleton className='h-16 w-full' />
          <Skeleton className='h-16 w-full' />
          <Skeleton className='h-16 w-full' />
        </div>
      </div>
      <div className='flex justify-end'>
        <Skeleton className='h-10 w-[150px]' />
      </div>
    </div>
  )
}

export default SingleUserSkeleton
