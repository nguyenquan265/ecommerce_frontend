import { Truck, CreditCard, RotateCcw, HeadphonesIcon } from 'lucide-react'

const Overview = () => {
  return (
    <div className='container mx-auto px-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        <div className='flex items-center gap-4'>
          <Truck className='h-6 w-6 flex-shrink-0' />
          <div>
            <h3 className='font-medium mb-1'>Fastest Shipping</h3>
            <p className='text-sm text-zinc-400'>Order at $39 order</p>
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <CreditCard className='h-6 w-6 flex-shrink-0' />
          <div>
            <h3 className='font-medium mb-1'>100% Safe Payments</h3>
            <p className='text-sm text-zinc-400'>9 month installments</p>
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <RotateCcw className='h-6 w-6 flex-shrink-0' />
          <div>
            <h3 className='font-medium mb-1'>14-Days Return</h3>
            <p className='text-sm text-zinc-400'>Shop with confidence</p>
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <HeadphonesIcon className='h-6 w-6 flex-shrink-0' />
          <div>
            <h3 className='font-medium mb-1'>24/7 Online Support</h3>
            <p className='text-sm text-zinc-400'>Delivered to home</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview
