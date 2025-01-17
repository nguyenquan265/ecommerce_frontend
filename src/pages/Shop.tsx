// import { useState, useEffect } from 'react'

import { Button } from '@/components/ui/button'
import Breadcrumb from '@/components/shared/Breadcrumb'
import ShopProducts from '@/components/shared/ShopProducts'

const Shop = () => {
  // const [timeLeft, setTimeLeft] = useState({
  //   days: 242,
  //   hours: 1,
  //   minutes: 4,
  //   seconds: 16
  // })

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTimeLeft((prev) => {
  //       if (prev.seconds > 0) {
  //         return { ...prev, seconds: prev.seconds - 1 }
  //       }
  //       if (prev.minutes > 0) {
  //         return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
  //       }
  //       if (prev.hours > 0) {
  //         return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
  //       }
  //       if (prev.days > 0) {
  //         return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
  //       }
  //       return prev
  //     })
  //   }, 1000)

  //   return () => clearInterval(timer)
  // }, [])

  return (
    <div className='min-h-screen bg-background'>
      {/* Breadcrumb */}
      <Breadcrumb text='shop' />

      {/* Banner */}
      <div className='relative h-[400px] bg-zinc-100'>
        <div className='absolute inset-0 flex'>
          <img
            src='https://res.cloudinary.com/dxx85izni/image/upload/v1736996967/tson8uqw3spjjisehbxu.png'
            alt='Classic collection'
            className='w-full object-cover'
            loading='lazy'
          />
        </div>
        <div className='relative z-10 h-full flex flex-col items-center justify-center text-center text-white'>
          <div className='flex gap-4 mb-6'>
            {/* {[
              { value: timeLeft.days, label: 'Days' },
              { value: timeLeft.hours, label: 'Hours' },
              { value: timeLeft.minutes, label: 'Mins' },
              { value: timeLeft.seconds, label: 'Secs' }
            ].map(({ value, label }) => (
              <div key={label} className='bg-white text-black px-3 py-1 rounded'>
                <span className='font-medium'>{value.toString().padStart(2, '0')} </span>
                <span className='text-sm'>{label}</span>
              </div>
            ))} */}
          </div>

          <h1 className='text-4xl font-medium mb-6'>The Classics Make A Comeback</h1>

          <Button size='lg' className='bg-zinc-800 hover:bg-zinc-900'>
            Buy now
          </Button>
        </div>
      </div>

      {/* Shop Controls */}
      <ShopProducts />
    </div>
  )
}

export default Shop
