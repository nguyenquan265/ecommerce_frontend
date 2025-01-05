import { useState, useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const products = [
  {
    id: 1,
    name: 'Black Hoodie',
    price: '$49.99',
    image: '/placeholder.svg?height=400&width=300'
  },
  {
    id: 2,
    name: 'Grey Sweatshirt',
    price: '$39.99',
    image: '/placeholder.svg?height=400&width=300'
  },
  {
    id: 3,
    name: 'Black Beanie',
    price: '$19.99',
    image: '/placeholder.svg?height=400&width=300'
  }
]

const BestProducts = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 22,
    minutes: 45,
    seconds: 17
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
          <span className='text-sm text-muted-foreground uppercase tracking-wider'>DON'T MISS SUPER OFFERS</span>
          <h2 className='text-3xl font-medium mt-2'>Our best products</h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
          {/* Featured Product with Timer */}
          <div className='md:col-span-2 lg:col-span-3 xl:col-span-4'>
            <div className='relative h-[400px] group overflow-hidden'>
              <img
                src='/placeholder.svg?height=800&width=1600'
                alt='The Classics'
                className='object-cover transition-transform duration-700 group-hover:scale-105'
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
                <h2 className='text-4xl font-medium mb-6'>The Classics Make A Comeback</h2>
                <Button
                  variant='secondary'
                  size='lg'
                  className='bg-zinc-800 text-white hover:bg-white hover:text-zinc-800 rounded-none'
                >
                  Buy now
                </Button>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {products.map((product) => (
            <Link to='#' key={product.id} className='group'>
              <div className='relative aspect-[4/5] mb-4 bg-zinc-100 overflow-hidden'>
                <img
                  src={product.image}
                  alt={product.name}
                  className='object-cover transition-transform duration-700 group-hover:scale-105'
                />
              </div>
              <h3 className='text-lg font-medium group-hover:text-primary'>{product.name}</h3>
              <p className='text-muted-foreground'>{product.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BestProducts
