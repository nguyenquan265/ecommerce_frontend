import { useState, useEffect } from 'react'

import { Button } from '@/components/ui/button'
import ProductCard from './ProductCard'
import SkeletonProductCard from '../skeletons/SkeletonProductCard'

import { useGetAllProducts } from '@/apis/productApi'

const BestProducts = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 22,
    minutes: 45,
    seconds: 17
  })
  const { products, isLoading } = useGetAllProducts({
    page: 1,
    limit: 12,
    searchString: '',
    categorySlug: 'all',
    sortBy: 'desc'
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        }
        if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className='py-16'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <span className='text-sm text-muted-foreground uppercase tracking-wider'>ĐỪNG BỎ LỠ ƯU ĐÃI SIÊU KHỦNG</span>
          <h2 className='text-3xl font-medium mt-2'>Sản phẩm tốt nhất của chúng tôi</h2>
        </div>

        {/* Featured Product with Timer */}
        <div className='md:col-span-2 lg:col-span-3 xl:col-span-4'>
          <div className='relative h-[400px] group overflow-hidden'>
            <img
              src='https://res.cloudinary.com/dxx85izni/image/upload/v1736993845/jgld4xcwovvph1ozwvcb.png'
              alt='The Classics'
              className='object-cover h-full w-full transition-transform duration-700 group-hover:scale-105'
              loading='lazy'
            />
            <div className='absolute inset-0 bg-black/20' />
            <div className='absolute inset-0 flex flex-col items-center justify-center text-white'>
              {/* Countdown Timer */}
              <div className='flex gap-4 mb-6'>
                {[
                  { value: timeLeft.days, label: 'Days' },
                  { value: timeLeft.hours, label: 'Hours' },
                  { value: timeLeft.minutes, label: 'Mins' },
                  { value: timeLeft.seconds, label: 'Secs' }
                ].map(({ value, label }) => (
                  <div key={label} className='bg-white text-black px-3 py-1 rounded'>
                    <span className='font-medium'>{value.toString().padStart(2, '0')} </span>
                    <span className='text-sm'>{label}</span>
                  </div>
                ))}
              </div>

              <h2 className='text-4xl font-medium text-center mb-6'>Những sản phẩm kinh điển trở lại</h2>

              <Button size='lg' className='bg-zinc-800 hover:bg-zinc-900'>
                Mua ngay
              </Button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className='mt-8 w-full grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
          {isLoading && [...Array(12)].map((_, index) => <SkeletonProductCard key={index} viewMode='grid' />)}

          {products?.map((product) => <ProductCard key={product._id} product={product} viewMode='grid' />)}
        </div>
      </div>
    </div>
  )
}

export default BestProducts
