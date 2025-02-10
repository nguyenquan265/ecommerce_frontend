import { Link } from 'react-router-dom'

import { Trash2, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import CartSkeleton from '@/components/skeletons/CartSkeleton'

import { useClearCart, useGetCart, useRemoveFromCart } from '@/apis/cartApi'
import { useUserContext } from '@/contexts/UserContext'
import { currencyFormatter } from '@/lib/utils'

const Cart = () => {
  const { currentUser, isUserLoading } = useUserContext()
  const { cart, isLoading } = useGetCart()
  const { removeFromCart, isPending: isRemoving } = useRemoveFromCart()
  const { clearCart, isPending: isClearing } = useClearCart()

  if (isUserLoading || !currentUser) {
    return (
      <div className='min-h-screen bg-background'>
        <div className='bg-zinc-50 py-6'>
          <h1 className='container mx-auto px-4 text-center text-2xl font-medium flex items-center justify-center gap-2'>
            <ShoppingCart className='w-5 h-5' />
            GIỎ HÀNG
          </h1>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-background'>
      <div className='bg-zinc-50 py-6'>
        <h1 className='container mx-auto px-4 text-center text-2xl font-medium flex items-center justify-center gap-2'>
          <ShoppingCart className='w-5 h-5' />
          GIỎ HÀNG
        </h1>
      </div>

      <div className='container mx-auto px-4 py-8'>
        {isLoading && <CartSkeleton />}

        {!isLoading && cart && cart.cartItems.length > 0 ? (
          <>
            {/* Cart Table */}
            <div className='w-full overflow-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='border-b text-sm'>
                    <th className='pb-4'></th>
                    <th className='pb-4 text-left font-medium'>SẢN PHẨM</th>
                    <th className='pb-4 text-left font-medium'>GIÁ</th>
                    <th className='pb-4 text-left font-medium'>SỐ LƯỢNG</th>
                    <th className='pb-4 text-left font-medium'>TỔNG CỘNG</th>
                    <th className='pb-4 text-right font-medium'>HOẠT ĐỘNG</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.cartItems.map((item) => (
                    <tr key={item.product._id} className='border-b'>
                      <td className='py-4'>
                        <img
                          src={item.product.mainImage}
                          alt={item.product.title}
                          width={60}
                          height={80}
                          className='bg-zinc-100'
                          loading='lazy'
                        />
                      </td>
                      <td className='py-4'>
                        <h3 className='font-medium'>{item.product.title}</h3>
                        <p className='text-sm text-muted-foreground'>Kích cỡ: {item.product.size}</p>
                      </td>
                      <td className='py-4'>
                        {item.product.priceDiscount
                          ? currencyFormatter(
                              item.product.price - (item.product.price * item.product.priceDiscount) / 100
                            )
                          : currencyFormatter(item.product.price)}
                      </td>
                      <td className='py-4'>
                        <Select
                          value={item.quantity.toString()}
                          // onValueChange={(value) => updateQuantity(item.id, parseInt(value))}
                        >
                          <SelectTrigger className='w-20'>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className='py-4'>
                        {currencyFormatter(
                          item.product.priceDiscount
                            ? (item.product.price - (item.product.price * item.product.priceDiscount) / 100) *
                                item.quantity
                            : item.product.price * item.quantity
                        )}
                      </td>
                      <td className='py-4 text-right'>
                        <Button
                          disabled={isRemoving}
                          variant='outline'
                          size='icon'
                          onClick={() => removeFromCart(item.product._id)}
                        >
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Clear Cart */}
            <div className='mt-8'>
              <Button
                variant='outline'
                className='flex items-center gap-2'
                onClick={() => clearCart()}
                disabled={isClearing}
              >
                <Trash2 className='h-4 w-4' />
                XÓA GIỎ HÀNG
              </Button>
            </div>

            {/* Cart Totals */}
            <div className='mt-8 border p-6'>
              <div className='space-y-2 mb-4'>
                <div className='flex justify-between py-2 border-b'>
                  <span>Tổng tiền sản phẩm</span>
                  <span>
                    {currencyFormatter(
                      cart.cartItems.reduce(
                        (acc, item) =>
                          acc +
                          (item.product.priceDiscount
                            ? (item.product.price - (item.product.price * item.product.priceDiscount) / 100) *
                              item.quantity
                            : item.product.price * item.quantity),
                        0
                      )
                    )}
                  </span>
                </div>
                <div className='flex justify-between py-2 border-b'>
                  <span>Tiền vận chuyển</span>
                  <span>{currencyFormatter(3000)}</span>
                </div>
                <div className='flex justify-between py-2 text-lg font-medium'>
                  <span>TỔNG CỘNG</span>
                  <span>
                    {currencyFormatter(
                      cart.cartItems.reduce(
                        (acc, item) =>
                          acc +
                          (item.product.priceDiscount
                            ? (item.product.price - (item.product.price * item.product.priceDiscount) / 100) *
                              item.quantity
                            : item.product.price * item.quantity),
                        0
                      ) + 3000
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Checkout */}
            <div className='mt-8 text-center space-y-4'>
              <p className='text-sm'>
                ĐẢM BẢO THANH TOÁN <span className='text-green-600'>AN TOÀN</span>
              </p>
              <Button className='w-full md:w-56 lg:w-48 bg-zinc-800 hover:bg-zinc-900'>TIẾN HÀNH THANH TOÁN</Button>
            </div>
          </>
        ) : (
          <div className='flex flex-col items-center justify-center text-center max-w-md mx-auto'>
            <ShoppingCart className='w-12 h-12 mb-6 text-muted-foreground' />
            <h1 className='text-2xl font-medium mb-4'>GIỎ HÀNG CỦA BẠN TRỐNG</h1>
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

export default Cart
