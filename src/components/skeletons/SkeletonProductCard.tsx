import { Skeleton } from '@/components/ui/skeleton'

interface SkeletonProductCardProps {
  viewMode: 'grid' | 'list'
}

const SkeletonProductCard: React.FC<SkeletonProductCardProps> = ({ viewMode }) => {
  return (
    <div
      className={`group ${viewMode === 'list' ? 'flex max-sm:gap-4 gap-16 md:gap-36 lg:gap-52 justify-center p-4 bg-white' : ''}`}
    >
      <div
        className={`relative aspect-square mb-0 ${
          viewMode === 'list' ? 'max-sm:w-[150px] w-[200px] flex-shrink-0' : 'w-full mb-4'
        }`}
      >
        <Skeleton className='w-full h-full' />

        <div
          className={`absolute top-[50%] transform -translate-y-[50%] right-4 flex flex-col gap-2 ${
            viewMode === 'list' ? 'hidden' : ''
          }`}
        >
          <Skeleton className='w-8 h-8 rounded-full' />
          <Skeleton className='w-8 h-8 rounded-full' />
        </div>
      </div>

      <div className={`overflow-hidden ${viewMode === 'list' ? 'flex flex-col justify-between w-full' : ''}`}>
        <div>
          <Skeleton className='h-5 w-3/4 mb-2' />
          <Skeleton className='h-4 w-1/4 mb-4' />

          <div className={`flex gap-2 mb-4 ${viewMode === 'grid' ? 'hidden' : ''}`}>
            <Skeleton className='w-8 h-8 rounded-full' />
            <Skeleton className='w-8 h-8 rounded-full' />
          </div>
        </div>

        <Skeleton className={`h-9 ${viewMode === 'list' ? 'max-w-[200px]' : 'w-full'}`} />
      </div>
    </div>
  )
}

export default SkeletonProductCard
