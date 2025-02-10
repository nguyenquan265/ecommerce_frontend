import { Skeleton } from '@/components/ui/skeleton'

const CartSkeleton = () => {
  return (
    <>
      {/* Cart Table */}
      <div className='w-full overflow-auto'>
        <table className='w-full'>
          <thead>
            <tr className='border-b text-sm'>
              <th className='pb-4'></th>
              <th className='pb-4 text-left font-medium'>SẢN PHẨM</th>
              <th className='pb-4 text-left font-medium'>GIÁ</th>
              <th className='pb-4 text-left font-medium'>SỐ LƯỢNG</th>
              <th className='pb-4 text-left font-medium'>TỔNG CỘNG</th>
              <th className='pb-4 text-right font-medium'>HOẠT ĐỘNG</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(3)].map((_, index) => (
              <tr key={index} className='border-b'>
                <td className='py-4'>
                  <Skeleton className='h-20 w-[60px]' />
                </td>
                <td className='py-4'>
                  <Skeleton className='h-6 w-32 mb-2' />
                  <Skeleton className='h-4 w-24' />
                </td>
                <td className='py-4'>
                  <Skeleton className='h-4 w-20' />
                </td>
                <td className='py-4'>
                  <Skeleton className='h-10 w-20' />
                </td>
                <td className='py-4'>
                  <Skeleton className='h-4 w-24' />
                </td>
                <td className='py-4 text-right'>
                  <Skeleton className='h-10 w-10 ml-auto' />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Clear Cart */}
      <div className='mt-8'>
        <Skeleton className='h-10 w-40' />
      </div>

      {/* Cart Totals */}
      <div className='mt-8 border p-6'>
        <div className='space-y-2 mb-4'>
          <div className='flex justify-between py-2 border-b'>
            <Skeleton className='h-4 w-32' />
            <Skeleton className='h-4 w-24' />
          </div>
          <div className='flex justify-between py-2 border-b'>
            <Skeleton className='h-4 w-32' />
            <Skeleton className='h-4 w-24' />
          </div>
          <div className='flex justify-between py-2 text-lg font-medium'>
            <Skeleton className='h-6 w-32' />
            <Skeleton className='h-6 w-28' />
          </div>
        </div>
      </div>

      {/* Checkout */}
      <div className='mt-8 text-center space-y-4'>
        <Skeleton className='h-4 w-64 mx-auto' />
        <Skeleton className='h-10 w-48 mx-auto' />
      </div>
    </>
  )
}

export default CartSkeleton
