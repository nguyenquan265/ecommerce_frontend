import { Link } from 'react-router-dom'

import { Heart, ShoppingCart, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import WishListSkeleton from '@/components/skeletons/WishlistSkeleton'

import { currencyFormatter } from '@/lib/utils'

import { useUserContext } from '@/contexts/UserContext'
import { useRemoveFromWishlist } from '@/apis/userApi'
import { useAddToCart } from '@/apis/cartApi'

const WishList = () => {
  const { currentUser, isUserLoading } = useUserContext()
  const { removeFromWishlist, isPending: isRemoveWishlistPending } = useRemoveFromWishlist()
  const { addToCart, isPending: isAddToCartPending } = useAddToCart()

  const handleRemoveFromWishlist = async (productId: string) => {
    await removeFromWishlist(productId)
  }

  const handleAddToCart = async (productId: string) => {
    await addToCart({ productId, quantity: 1 })
    await removeFromWishlist(productId)
  }

  if (isUserLoading || !currentUser) {
    return <WishListSkeleton />
  }

  return (
    <div className='min-h-screen bg-background'>
      <div className='bg-zinc-50 py-6'>
        <h1 className='container mx-auto px-4 text-center text-2xl font-medium flex items-center justify-center gap-2'>
          <Heart className='w-5 h-5 fill-red-600 text-red-600' />
          DANH SÁCH YÊU THÍCH
        </h1>
      </div>

      <div className='container mx-auto px-4 py-8'>
        {currentUser.wishlistItems.length > 0 ? (
          <>
            <div className='w-full overflow-auto'>
              <table className='w-full'>
                <tbody>
                  {currentUser.wishlistItems.map((item) => (
                    <tr key={item._id} className='border-b'>
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
                          <Button
                            disabled={isRemoveWishlistPending || isAddToCartPending}
                            variant='default'
                            size='icon'
                            className='bg-zinc-800 hover:bg-zinc-900'
                            onClick={() => handleAddToCart(item._id)}
                          >
                            <ShoppingCart className='h-4 w-4' />
                          </Button>

                          <Button
                            disabled={isRemoveWishlistPending || isAddToCartPending}
                            variant='outline'
                            size='icon'
                            onClick={() => handleRemoveFromWishlist(item._id)}
                          >
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
            <h1 className='text-2xl font-medium mb-4'>Danh sách yêu thích của bạn đang trống</h1>
            <p className='text-muted-foreground mb-8'>
              Chúng tôi mời bạn xem qua các mặt hàng của cửa hàng chúng tôi. Chắc chắn bạn sẽ tìm được thứ gì đó cho
              riêng mình!
            </p>
            <Button asChild className='bg-zinc-800 hover:bg-zinc-900 rounded-none px-8'>
              <Link to='/shop'>TRỞ LẠI CỬA HÀNG</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default WishList
