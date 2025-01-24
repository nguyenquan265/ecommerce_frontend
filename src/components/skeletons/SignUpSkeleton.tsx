import { Skeleton } from '../ui/skeleton'

const SignUpSkeleton = () => {
  return (
    <div className='bg-background'>
      <div className='bg-zinc-50 py-6'>
        <Skeleton className='h-8 w-32 mx-auto' />
      </div>

      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-md mx-auto'>
          <div className='bg-white p-8'>
            <Skeleton className='h-6 w-28 mb-6' />
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Skeleton className='h-4 w-16' />
                <Skeleton className='h-10 w-full' />
              </div>
              <div className='space-y-2'>
                <Skeleton className='h-4 w-16' />
                <Skeleton className='h-10 w-full' />
              </div>
              <div className='space-y-2'>
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-10 w-full' />
              </div>
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-4 w-56 mx-auto' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpSkeleton
