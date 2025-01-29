import { Skeleton } from '../ui/skeleton'

const WishListSkeleton = () => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='w-full overflow-auto'>
        <table className='w-full'>
          <thead>
            <tr className='border-b text-sm'>
              <th className='pb-4 text-left font-medium w-8'>
                <Skeleton className='h-4 w-4' />
              </th>
              <th className='pb-4 text-left font-medium'>
                <Skeleton className='h-4 w-24' />
              </th>
              <th className='pb-4 text-right font-medium'></th>
            </tr>
          </thead>
          <tbody>
            {[...Array(3)].map((_, index) => (
              <tr key={index} className='border-b'>
                <td className='py-4'>
                  <Skeleton className='h-4 w-4' />
                </td>
                <td className='py-4'>
                  <div className='flex items-center gap-4'>
                    <Skeleton className='h-20 w-16' />
                    <div>
                      <Skeleton className='h-4 w-40 mb-2' />
                      <Skeleton className='h-4 w-24' />
                    </div>
                  </div>
                </td>
                <td className='py-4'>
                  <div className='flex justify-end gap-2'>
                    <Skeleton className='h-8 w-8' />
                    <Skeleton className='h-8 w-8' />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default WishListSkeleton
