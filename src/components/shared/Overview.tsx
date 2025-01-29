import { Truck, CreditCard, RotateCcw, HeadphonesIcon } from 'lucide-react'

const Overview = () => {
  return (
    <div className='container mx-auto px-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        <div className='flex items-center gap-4'>
          <Truck className='h-6 w-6 flex-shrink-0' />
          <div>
            <h3 className='text-center font-medium mb-1'>Vận chuyển nhanh nhất</h3>
            <p className='text-center text-sm text-zinc-400'>Đặt hàng với giá $39</p>
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <CreditCard className='h-6 w-6 flex-shrink-0' />
          <div>
            <h3 className='text-center font-medium mb-1'>Thanh toán an toàn 100%</h3>
            <p className='text-center text-sm text-zinc-400'>Trả góp 9 tháng</p>
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <RotateCcw className='h-6 w-6 flex-shrink-0' />
          <div>
            <h3 className='text-center font-medium mb-1'>Trả hàng trong vòng 14 ngày</h3>
            <p className='text-center text-sm text-zinc-400'>Mua sắm một cách tự tin</p>
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <HeadphonesIcon className='h-6 w-6 flex-shrink-0' />
          <div>
            <h3 className='text-center font-medium mb-1'>Hỗ trợ trực tuyến 24/7</h3>
            <p className='text-center text-sm text-zinc-400'>Giao tận nhà</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview
