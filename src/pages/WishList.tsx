import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Heart, Mail, ShoppingCart, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

interface WishlistItem {
  id: number
  name: string
  price: number
  image: string
  selected: boolean
}

const WishList = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: 1,
      name: 'Volutpat lacus',
      price: 879.99,
      image: '/placeholder.svg?height=80&width=60',
      selected: false
    },
    {
      id: 2,
      name: '10K Yellow Gold',
      price: 99.99,
      image: '/placeholder.svg?height=80&width=60',
      selected: false
    }
  ])

  const toggleItem = (id: number) => {
    setWishlistItems((items) => items.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item)))
  }

  const toggleAll = (checked: boolean) => {
    setWishlistItems((items) => items.map((item) => ({ ...item, selected: checked })))
  }

  const removeItem = (id: number) => {
    setWishlistItems((items) => items.filter((item) => item.id !== id))
  }

  return (
    <div className='min-h-screen bg-background lg:hidden'>
      <div className='bg-zinc-50 py-6'>
        <h1 className='container mx-auto px-4 text-center text-2xl font-medium flex items-center justify-center gap-2'>
          <Heart className='w-5 h-5' />
          WISHLIST
        </h1>
      </div>

      <div className='container mx-auto px-4 py-8'>
        {wishlistItems.length > 0 ? (
          <>
            <div className='w-full overflow-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='border-b text-sm'>
                    <th className='pb-4 text-left font-medium w-8'>
                      <Checkbox
                        checked={wishlistItems.every((item) => item.selected)}
                        onCheckedChange={(checked) => toggleAll(checked as boolean)}
                      />
                    </th>
                    <th className='pb-4 text-left font-medium'>PRODUCT</th>
                    <th className='pb-4 text-right font-medium'>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {wishlistItems.map((item) => (
                    <tr key={item.id} className='border-b'>
                      <td className='py-4'>
                        <Checkbox checked={item.selected} onCheckedChange={() => toggleItem(item.id)} />
                      </td>
                      <td className='py-4'>
                        <div className='flex items-center gap-4'>
                          <img src={item.image} alt={item.name} width={60} height={80} className='bg-zinc-100' />
                          <div>
                            <h3 className='font-medium'>{item.name}</h3>
                            <p className='text-sm text-muted-foreground'>${item.price.toFixed(2)}</p>
                          </div>
                        </div>
                      </td>
                      <td className='py-4'>
                        <div className='flex justify-end gap-2'>
                          <Button variant='default' size='icon' className='bg-zinc-800 hover:bg-zinc-900'>
                            <ShoppingCart className='h-4 w-4' />
                          </Button>
                          <Button variant='outline' size='icon' onClick={() => removeItem(item.id)}>
                            <Trash2 className='h-4 w-4' />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className='mt-8 flex flex-wrap items-center gap-4'>
              <Select defaultValue='add'>
                <SelectTrigger className='w-[200px]'>
                  <SelectValue placeholder='Add to cart' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='add'>Add to cart</SelectItem>
                  <SelectItem value='move'>Move to cart</SelectItem>
                </SelectContent>
              </Select>
              <Button className='bg-zinc-800 hover:bg-zinc-900'>APPLY</Button>
              <Button variant='outline' className='ml-auto flex items-center gap-2'>
                <Mail className='h-4 w-4' />
                ASK FOR AN ESTIMATE
              </Button>
            </div>
          </>
        ) : (
          <div className='flex flex-col items-center justify-center text-center max-w-md mx-auto'>
            <Heart className='w-12 h-12 mb-6 text-muted-foreground' />
            <h1 className='text-2xl font-medium mb-4'>Your wishlist is empty</h1>
            <p className='text-muted-foreground mb-8'>
              We invite you to get acquainted with an assortment of our shop. Surely you can find something for
              yourself!
            </p>
            <Button asChild className='bg-zinc-800 hover:bg-zinc-900 rounded-none px-8'>
              <Link to='/shop'>RETURN TO SHOP</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default WishList
