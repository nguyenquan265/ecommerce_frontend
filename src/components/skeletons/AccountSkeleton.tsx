import { Skeleton } from '../ui/skeleton'

const AccountSkeleton = () => {
  return (
    <div className='min-h-screen bg-background'>
      <div className='h-12 bg-zinc-100'></div>
      <div className='container mx-auto py-8 px-4'>
        <div className='grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8'>
          {/* Sidebar Skeleton */}
          <div className='bg-white rounded-lg shadow-sm p-4'>
            <div className='flex items-center gap-3 mb-6 pb-4 border-b'>
              <Skeleton className='w-10 h-10 rounded-full' />
              <div>
                <Skeleton className='h-4 w-24 mb-1' />
                <Skeleton className='h-3 w-32' />
              </div>
            </div>
            <div className='space-y-2'>
              <Skeleton className='h-8 w-full' />
              <Skeleton className='h-8 w-full' />
              <Skeleton className='h-8 w-full' />
            </div>
            <Skeleton className='h-8 w-full mt-4' />
          </div>

          {/* Main Content Skeleton */}
          <div className='bg-white rounded-lg shadow-sm p-6'>
            <Skeleton className='h-6 w-48 mb-2' />
            <Skeleton className='h-4 w-64 mb-6' />
            <div className='space-y-4'>
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-10 w-full' />
            </div>
            <Skeleton className='h-6 w-48 mt-8 mb-2' />
            <div className='space-y-4'>
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-10 w-full' />
            </div>
            <div className='flex justify-end mt-6'>
              <Skeleton className='h-10 w-24' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountSkeleton
