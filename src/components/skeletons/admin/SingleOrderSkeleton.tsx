import { ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

const SingleOrderSkeleton = () => {
  return (
    <div className='space-y-4 max-w-6xl mx-auto'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Customer Information Skeleton */}
        <Card>
          <CardHeader className='bg-gray-50 border-b'>
            <CardTitle className='text-lg font-medium'>Thông tin khách hàng</CardTitle>
          </CardHeader>
          <CardContent className='p-0'>
            <div className='divide-y'>
              {[...Array(4)].map((_, index) => (
                <div key={index} className='grid grid-cols-[150px_1fr] p-4'>
                  <div className='font-medium'>
                    <Skeleton className='h-5 w-[120px]' />
                  </div>
                  <div>
                    <Skeleton className='h-5 w-full max-w-[200px]' />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order Details Skeleton */}
        <Card>
          <CardHeader className='bg-gray-50 border-b'>
            <CardTitle className='text-lg font-medium'>Chi tiết đơn hàng</CardTitle>
          </CardHeader>
          <CardContent className='p-0'>
            <div className='divide-y'>
              {[...Array(4)].map((_, index) => (
                <div key={index} className='grid grid-cols-[150px_1fr] p-4'>
                  <div className='font-medium'>
                    <Skeleton className='h-5 w-[120px]' />
                  </div>
                  <div>
                    <Skeleton className='h-5 w-full max-w-[200px]' />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products Skeleton */}
      <Card>
        <CardHeader className='bg-gray-50 border-b'>
          <CardTitle className='text-lg font-medium'>Sản phẩm</CardTitle>
        </CardHeader>
        <CardContent className='p-0'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-12'>#</TableHead>
                <TableHead>Tên</TableHead>
                <TableHead>Hình ảnh</TableHead>
                <TableHead>Kích thước</TableHead>
                <TableHead>Số lượng</TableHead>
                <TableHead className='text-right'>Giá</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(3)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Skeleton className='h-5 w-[150px]' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='w-16 h-16 rounded-md' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-5 w-[50px]' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-5 w-[30px]' />
                  </TableCell>
                  <TableCell className='text-right'>
                    <Skeleton className='h-5 w-[80px] ml-auto' />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Order Summary Skeleton */}
          <div className='border-t'>
            <div className='flex justify-end p-4'>
              <div className='w-full max-w-xs space-y-2'>
                <div className='flex justify-between'>
                  <span className='font-medium'>Tổng tiền hàng:</span>
                  <Skeleton className='h-5 w-[80px]' />
                </div>
                <div className='flex justify-between'>
                  <span className='font-medium'>Phí vận chuyển:</span>
                  <Skeleton className='h-5 w-[80px]' />
                </div>
                <div className='flex justify-between text-lg font-bold'>
                  <span>Tổng tiền:</span>
                  <Skeleton className='h-6 w-[100px]' />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className='flex justify-end gap-4'>
        <Button type='submit' className='bg-[#1570EF] hover:bg-[#1f4375]' disabled>
          <ArrowLeft className='mr-2 h-4 w-4' />
          Quay lại
        </Button>
      </div>
    </div>
  )
}

export default SingleOrderSkeleton
