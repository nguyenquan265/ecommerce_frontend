import { Link, Navigate } from 'react-router-dom'

import { Heart, ShoppingCart, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

import { currencyFormatter } from '@/lib/utils'

import { useUserContext } from '@/contexts/UserContext'

const WishList = () => {
  const { currentUser, isUserLoading } = useUserContext()

  if (isUserLoading) {
    return null
  }

  if (!currentUser) {
    return <Navigate to='/login' />
  }

  return (
    <div className='min-h-screen bg-background'>
      <div className='bg-zinc-50 py-6'>
        <h1 className='container mx-auto px-4 text-center text-2xl font-medium flex items-center justify-center gap-2'>
          <Heart className='w-5 h-5 fill-red-600 text-red-600' />
          WISHLIST
        </h1>
      </div>

      <div className='container mx-auto px-4 py-8'>
        {currentUser.wishlistItems.length > 0 ? (
          <>
            <div className='w-full overflow-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='border-b text-sm'>
                    <th className='pb-4 text-left font-medium w-8'>
                      <Checkbox />
                    </th>
                    <th className='pb-4 text-left font-medium'>Select All</th>
                    <th className='pb-4 text-right font-medium'></th>
                  </tr>
                </thead>
                <tbody>
                  {currentUser.wishlistItems.map((item) => (
                    <tr key={item._id} className='border-b'>
                      <td className='py-4'>
                        <Checkbox />
                      </td>
                      <td className='py-4'>
                        <div className='flex items-center gap-4'>
                          <img src={item.mainImage} alt={item.title} width={60} height={80} className='bg-zinc-100' />
                          <div>
                            <h3 className='font-medium'>{item.title}</h3>
                            <div className='flex items-center gap-2 mb-4'>
                              <p className='text-sm font-medium text-red-600'>
                                {item.priceDiscount
                                  ? currencyFormatter(item.price - (item.price * item.priceDiscount) / 100)
                                  : currencyFormatter(item.price)}
                              </p>

                              {item.priceDiscount ? (
                                <p className='text-sm text-gray-500 line-through'>{currencyFormatter(item.price)}</p>
                              ) : (
                                ''
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className='py-4'>
                        <div className='flex justify-end gap-2'>
                          <Button variant='default' size='icon' className='bg-zinc-800 hover:bg-zinc-900'>
                            <ShoppingCart className='h-4 w-4' />
                          </Button>
                          <Button variant='outline' size='icon'>
                            <Trash2 className='h-4 w-4' />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className='flex flex-col items-center justify-center text-center max-w-md mx-auto'>
            <Heart className='w-12 h-12 mb-6 text-muted-foreground text-red-600' />
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
