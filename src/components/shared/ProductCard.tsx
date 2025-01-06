import { Link } from 'react-router-dom'

import { Button } from '../ui/button'
import { Eye, Heart } from 'lucide-react'

interface Product {
  id: number
  name: string
  price: number
  image: string
}

interface ProductCardProps {
  product: Product
  viewMode: 'grid' | 'list'
}

const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode }) => {
  return (
    <div className={`group ${viewMode === 'list' ? 'flex gap-6 p-4 bg-white' : ''}`}>
      <div
        className={`relative aspect-square bg-zinc-100 mb-0 ${
          viewMode === 'list' ? 'w-[200px] flex-shrink-0' : 'w-full mb-4'
        }`}
      >
        <Link to={`/product/${product.id}`} className='block w-full h-full'>
          <img src={product.image} alt={product.name} className='object-cover' />
        </Link>

        <div
          className={`absolute top-[50%] transform -translate-y-[50%] right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity ${
            viewMode === 'list' ? 'hidden' : ''
          }`}
        >
          <Button size='icon' className='bg-white hover:bg-zinc-100 transition-colors'>
            <Heart className='h-4 w-4 text-zinc-800' />
          </Button>
          <Button size='icon' className='bg-white hover:bg-zinc-100 transition-colors'>
            <Eye className='h-4 w-4 text-zinc-800' />
          </Button>
        </div>
      </div>

      <div className={viewMode === 'list' ? 'flex-1 flex flex-col justify-between pl-6' : ''}>
        <div>
          <h3 className='font-medium group-hover:text-primary truncate'>{product.name}</h3>

          <p className='text-sm mb-4'>${product.price.toFixed(2)}</p>

          <div className={`flex gap-2 mb-4 ${viewMode === 'grid' ? 'hidden' : ''}`}>
            <Button size='icon' variant='outline'>
              <Heart className='h-4 w-4' />
            </Button>
            <Button size='icon' variant='outline'>
              <Eye className='h-4 w-4' />
            </Button>
          </div>
        </div>

        <Button className={`w-full ${viewMode === 'list' ? 'max-w-[200px]' : ''} bg-zinc-800 hover:bg-zinc-900`}>
          ADD TO CART
        </Button>
      </div>
    </div>
  )
}

export default ProductCard
