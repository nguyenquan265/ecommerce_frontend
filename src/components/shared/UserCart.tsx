import { Link } from 'react-router-dom'
import { debounce } from 'lodash'

import { Trash2, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { useClearCart, useRemoveFromCart, useUpdateCart } from '@/apis/cartApi'
import { currencyFormatter } from '@/lib/utils'
import { Cart, Product } from '@/types'

interface UserCartProps {
  cart: Cart
  setCartStep: React.Dispatch<React.SetStateAction<1 | 2 | 3>>
}

const UserCart: React.FC<UserCartProps> = ({ cart, setCartStep }) => {
  const { removeFromCart, isPending: isRemoving } = useRemoveFromCart()
  const { clearCart, isPending: isClearing } = useClearCart()
  const { updateCart, isPending: isUpdating } = useUpdateCart()

  const handleQuantityChange = async (product: Product, newQuantity: number) => {
    if (newQuantity >= 0) {
      if (newQuantity === 0) {
        await removeFromCart(product._id)
        return
      }

      if (newQuantity > product.quantity) {
        newQuantity = product.quantity
      }

      await updateCart({ productId: product._id, newQuantity })
    }
  }

  const debouncedHandleInputChange = debounce(async (product: Product, value: string) => {
    const newQuantity = Number.parseInt(value)

    if (!isNaN(newQuantity) && newQuantity >= 0) {
      await handleQuantityChange(product, newQuantity)
    }
  }, 300)

  const handleInputChange = (product: Product, value: string) => {
    debouncedHandleInputChange(product, value)
  }

  if (cart.cartItems.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center text-center max-w-md mx-auto'>
        <ShoppingCart className='w-12 h-12 mb-6 text-muted-foreground' />
        <h1 className='text-2xl font-medium mb-4'>GIỎ HÀNG CỦA BẠN TRỐNG</h1>
        <p className='text-muted-foreground mb-8'>
          Chúng tôi mời bạn xem qua các mặt hàng của cửa hàng chúng tôi. Chắc chắn bạn sẽ tìm được thứ gì đó cho riêng
          mình!
        </p>
        <Button asChild className='bg-zinc-800 hover:bg-zinc-900 rounded-none px-8'>
          <Link to='/shop'>TRỞ LẠI CỬA HÀNG</Link>
        </Button>
      </div>
    )
  }

  return (
    <>
      {/* Cart Table */}
      <div className='w-full overflow-auto'>
        <table className='w-full'>
          <thead>
            <tr className='border-b text-sm'>
              <th className='pb-4 text-left font-medium'>HÌNH ẢNH</th>
              <th className='pb-4 text-left font-medium'>SẢN PHẨM</th>
              <th className='pb-4 text-left font-medium'>GIÁ</th>
              <th className='pb-4 text-left font-medium'>SỐ LƯỢNG</th>
              <th className='pb-4 text-left font-medium'>TỔNG CỘNG</th>
              <th className='pb-4 text-right font-medium'>THAO TÁC</th>
            </tr>
          </thead>
          <tbody>
            {cart.cartItems.map((item) => (
              <tr key={item.product._id} className='border-b'>
                <td className='py-4'>
                  <Link to={`/product/${item.product._id}`}>
                    <img
                      src={item.product.mainImage}
                      alt={item.product.title}
                      width={60}
                      height={80}
                      className='bg-zinc-100'
                      loading='lazy'
                    />
                  </Link>
                </td>
                <td className='py-4'>
                  <Link to={`/product/${item.product._id}`}>
                    <h3 className='font-medium'>{item.product.title}</h3>
                    <p className='text-sm text-muted-foreground'>Kích cỡ: {item.product.size}</p>
                  </Link>
                </td>
                <td className='py-4'>
                  {item.product.priceDiscount
                    ? currencyFormatter(item.product.price - (item.product.price * item.product.priceDiscount) / 100)
                    : currencyFormatter(item.product.price)}
                </td>
                <td className='py-4'>
                  <div className='flex items-center gap-2'>
                    <div className='flex items-center gap-1'>
                      <Button
                        variant='outline'
                        size='icon'
                        onClick={() => handleQuantityChange(item.product, Math.max(1, item.quantity - 1))}
                        disabled={isUpdating || item.quantity === 1}
                        className='text-xl'
                      >
                        -
                      </Button>
                      <input
                        type='number'
                        value={item.quantity}
                        onChange={(e) => handleInputChange(item.product, e.target.value)}
                        className='w-12 text-center border rounded no-arrow-number-input'
                        min='1'
                      />
                      <Button
                        variant='outline'
                        size='icon'
                        onClick={() => handleQuantityChange(item.product, item.quantity + 1)}
                        disabled={isUpdating || item.quantity === item.product.quantity}
                        className='text-xl'
                      >
                        +
                      </Button>
                    </div>

                    <p className='text-sm text-zinc-800'>còn lại: {item.product.quantity}</p>
                  </div>
                </td>
                <td className='py-4'>
                  {currencyFormatter(
                    item.product.priceDiscount
                      ? (item.product.price - (item.product.price * item.product.priceDiscount) / 100) * item.quantity
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
        <Button variant='outline' className='flex items-center gap-2' onClick={() => clearCart()} disabled={isClearing}>
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
                      ? (item.product.price - (item.product.price * item.product.priceDiscount) / 100) * item.quantity
                      : item.product.price * item.quantity),
                  0
                )
              )}
            </span>
          </div>

          <div className='flex justify-between py-2 border-b'>
            <span>Phí vận chuyển</span>
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
                      ? (item.product.price - (item.product.price * item.product.priceDiscount) / 100) * item.quantity
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
        <Button onClick={() => setCartStep(2)} className='w-full md:w-56 lg:w-48 bg-zinc-800 hover:bg-zinc-900'>
          ĐẶT HÀNG NGAY
        </Button>
      </div>
    </>
  )
}

export default UserCart
