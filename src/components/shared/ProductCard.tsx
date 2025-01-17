import { Link } from 'react-router-dom'

import { Button } from '../ui/button'
import { Eye, Heart } from 'lucide-react'

import { Product } from '@/types'
import { currencyFormatter, cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  viewMode: 'grid' | 'list'
}

const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode }) => {
  return (
    <div
      className={cn(viewMode === 'list' && 'flex max-sm:gap-4 gap-16 md:gap-36 lg:gap-52 justify-center p-4 bg-white')}
    >
      <div
        className={cn(
          'relative aspect-square bg-zinc-100 mb-0 group',
          viewMode === 'list' ? 'max-sm:w-[150px] w-[200px] flex-shrink-0' : 'w-full mb-4'
        )}
      >
        <Link
          to={`/product/${product._id}`}
          className={cn('block w-full h-full', viewMode === 'list' && 'max-sm:w-[150px]')}
        >
          {/* Main Image */}
          <img
            src={product.mainImage}
            alt={product.title}
            className='absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-0'
            loading='lazy'
          />

          {/* Secondary Image */}
          <img
            src={product.subImages[0].url}
            alt={product.title}
            className='absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100'
            loading='lazy'
          />
        </Link>

        {/* lg button */}
        <div
          className={cn(
            'absolute top-[50%] transform -translate-y-[50%] translate-x-[100%] right-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-in-out'
          )}
        >
          <Button
            size='icon'
            className='bg-white hover:bg-zinc-100 transition-colors shadow-lg hover:shadow-xl'
            aria-label='Add to Wishlist'
          >
            <Heart className='h-4 w-4 text-zinc-800' />
          </Button>
          <Button size='icon' className='bg-white hover:bg-zinc-100 transition-colors shadow-lg hover:shadow-xl'>
            <Eye className='h-4 w-4 text-zinc-800' />
          </Button>
        </div>
      </div>

      {/* Product detail */}
      <div className={cn('overflow-hidden', viewMode === 'list' && 'flex flex-col justify-between')}>
        <div>
          <h3 className='font-medium group-hover:text-primary truncate'>{product.title}</h3>

          <p className='text-sm mb-4'>
            {product.priceDiscount
              ? currencyFormatter(product.price - (product.price * product.priceDiscount) / 100)
              : currencyFormatter(product.price)}
          </p>

          <div className={cn('flex gap-2 mb-4', viewMode === 'grid' && 'hidden')}>
            <Button size='icon' variant='outline'>
              <Heart className='h-4 w-4' />
            </Button>
            <Button size='icon' variant='outline'>
              <Eye className='h-4 w-4' />
            </Button>
          </div>
        </div>

        <Button className={cn('h-9 w-full bg-zinc-800 hover:bg-zinc-900', viewMode === 'list' && 'max-w-[200px]')}>
          ADD TO CART
        </Button>
      </div>
    </div>
  )
}

export default ProductCard
