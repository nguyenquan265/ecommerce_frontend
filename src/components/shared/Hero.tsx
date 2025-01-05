import { Button } from '../ui/button'

import { Truck, CreditCard, RotateCcw, HeadphonesIcon } from 'lucide-react'

const Hero = () => {
  return (
    <>
      <div
        className='relative flex w-full h-full max-md:max-h-[400px] md:max-h-[500px] lg:max-h-[700px] items-center bg-[#ccc] lg:mb-12'
        style={{
          backgroundImage:
            "url('https://xstore.8theme.com/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/02-SLIDESHOW-1.jpeg')",
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      >
        <div className='absolute inset-0 flex flex-col items-center justify-center z-10 container mx-auto px-4 text-center'>
          <h1 className='text-4xl font-bold mb-4'>XStore Marseille04 Demo</h1>
          <p className='text-lg text-muted-foreground mb-8'>
            Make your celebrations even more special this years with beautiful.
          </p>
          <Button size='lg' className='rounded-none px-8'>
            Go to shop
          </Button>
        </div>

        <div className='absolute max-lg:hidden left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 w-[80%] bg-zinc-800 text-white py-8'>
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
        </div>
      </div>

      <div className='lg:hidden bg-zinc-800 text-white py-4'>
        <div className='container mx-auto px-4'>
          <div className='grid  grid-cols-2 lg:grid-cols-4 gap-8'>
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
      </div>
    </>
  )
}

export default Hero
