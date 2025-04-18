import { Button } from '@/components/ui/button'
import Breadcrumb from '@/components/shared/Breadcrumb'
import ShopProducts from '@/components/shared/ShopProducts'

import ShopSlide1 from '@/assets/shop_slide1.png'

const Shop = () => {
  return (
    <div className='min-h-screen bg-background'>
      <Breadcrumb text='cửa hàng' />

      {/* Banner */}
      <div className='relative h-[400px] bg-zinc-100'>
        <div className='absolute inset-0 flex'>
          <img src={ShopSlide1} alt='Classic collection' className='w-full object-cover' loading='lazy' />
        </div>
        <div className='relative z-10 h-full flex flex-col items-center justify-center text-center text-white'>
          <h1 className='text-4xl font-medium mb-6'>Những sản phẩm kinh điển trở lại</h1>

          <Button size='lg' className='bg-zinc-800 hover:bg-zinc-900'>
            Mua ngay
          </Button>
        </div>
      </div>

      {/* Shop Controls */}
      <ShopProducts />
    </div>
  )
}

export default Shop
