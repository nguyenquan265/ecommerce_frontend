import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { ChevronLeft, Grid, List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import ProductCard from '@/components/shared/ProductCard'

interface Product {
  id: number
  name: string
  price: number
  image: string
}

const products: Product[] = [
  {
    id: 1,
    name: '10K Yellow Gold',
    price: 99.99,
    image: '/placeholder.svg?height=400&width=300'
  },
  {
    id: 2,
    name: 'Amet faucibus nunc',
    price: 51.99,
    image: '/placeholder.svg?height=400&width=300'
  },
  {
    id: 3,
    name: 'Consectetur nibh at',
    price: 119.99,
    image: '/placeholder.svg?height=400&width=300'
  },
  {
    id: 4,
    name: 'Dignissim molestie pellentesque',
    price: 89.99,
    image: '/placeholder.svg?height=400&width=300'
  }
]

const Shop = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [timeLeft, setTimeLeft] = useState({
    days: 242,
    hours: 1,
    minutes: 4,
    seconds: 16
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
    <div className='min-h-screen bg-background'>
      {/* Breadcrumb */}
      <div className='border-b'>
        <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
          <div className='flex items-center gap-2 text-sm text-muted-foreground'>
            <Link to='/' className='hover:text-foreground'>
              Home
            </Link>
            <span>/</span>
            <span>Shop</span>
          </div>
          <Link to='/' className='text-sm text-muted-foreground hover:text-foreground flex items-center gap-1'>
            <ChevronLeft className='h-4 w-4' />
            Return to previous page
          </Link>
        </div>
      </div>

      {/* Banner */}
      <div className='relative h-[400px] bg-zinc-100'>
        <div className='absolute inset-0 flex'>
          <img src='/placeholder.svg?height=800&width=1920' alt='Classic collection' className='object-cover' />
        </div>
        <div className='relative z-10 h-full flex flex-col items-center justify-center text-center'>
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
          <h1 className='text-4xl font-medium mb-6'>The Classics Make A Comeback</h1>
          <Button className='bg-zinc-800 hover:bg-zinc-900'>Buy now</Button>
        </div>
      </div>

      {/* Shop Controls */}
      <div className='container mx-auto px-4 py-8'>
        <div className='flex flex-wrap items-center justify-between gap-4 mb-8'>
          <div className='flex items-center gap-4'>
            <Select defaultValue='default'>
              <SelectTrigger className='w-[200px]'>
                <SelectValue placeholder='Default sorting' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='default'>Default sorting</SelectItem>
                <SelectItem value='price-low'>Price: Low to High</SelectItem>
                <SelectItem value='price-high'>Price: High to Low</SelectItem>
                <SelectItem value='name'>Name</SelectItem>
              </SelectContent>
            </Select>
            <div className='flex gap-2'>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size='icon'
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-zinc-800 hover:bg-zinc-900' : ''}
              >
                <Grid className='h-4 w-4' />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size='icon'
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-zinc-800 hover:bg-zinc-900' : ''}
              >
                <List className='h-4 w-4' />
              </Button>
            </div>
          </div>
          <Select defaultValue='8'>
            <SelectTrigger className='w-[80px]'>
              <SelectValue placeholder='Show' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='8'>8</SelectItem>
              <SelectItem value='12'>12</SelectItem>
              <SelectItem value='24'>24</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Product Grid */}
        <div
          className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'}`}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} viewMode={viewMode} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Shop
