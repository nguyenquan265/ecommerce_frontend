import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Copy, Trash2, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface CartItem {
  id: number
  name: string
  size: string
  price: number
  sku: string
  quantity: number
  image: string
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: '10K Yellow Gold',
      size: 'M',
      price: 99.99,
      sku: '12345',
      quantity: 1,
      image: '/placeholder.svg?height=80&width=60'
    }
  ])

  const [couponCode, setCouponCode] = useState('')

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total = subtotal // Add tax or shipping if needed

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setCartItems([])
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
        {cartItems.length > 0 ? (
          <>
            {/* Cart Table */}
            <div className='w-full overflow-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='border-b text-sm'>
                    <th className='pb-4 text-left font-medium'>SẢN PHẨM</th>
                    <th className='pb-4 text-left font-medium'>GIÁ</th>
                    <th className='pb-4 text-left font-medium'>SKU</th>
                    <th className='pb-4 text-left font-medium'>SỐ LƯỢNG</th>
                    <th className='pb-4 text-right font-medium'>TỔNG CỘNG</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id} className='border-b'>
                      <td className='py-4'>
                        <div className='flex items-start gap-4'>
                          <img src={item.image} alt={item.name} width={60} height={80} className='bg-zinc-100' />
                          <div>
                            <h3 className='font-medium'>{item.name}</h3>
                            <p className='text-sm text-muted-foreground'>Kích cỡ: {item.size}</p>
                          </div>
                        </div>
                      </td>
                      <td className='py-4'>${item.price.toFixed(2)}</td>
                      <td className='py-4'>
                        <div className='flex items-center gap-2'>
                          {item.sku}
                          <Button
                            variant='ghost'
                            size='icon'
                            className='h-6 w-6'
                            onClick={() => navigator.clipboard.writeText(item.sku)}
                          >
                            <Copy className='h-4 w-4' />
                          </Button>
                        </div>
                      </td>
                      <td className='py-4'>
                        <Select
                          value={item.quantity.toString()}
                          onValueChange={(value) => updateQuantity(item.id, parseInt(value))}
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
                      <td className='py-4 text-right'>${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Coupon and Clear Cart */}
            <div className='mt-8 flex flex-wrap items-center justify-between gap-4'>
              <div className='flex gap-2'>
                <Input
                  placeholder='Coupon code'
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className='w-[200px]'
                />
                <Button variant='outline'>OK</Button>
              </div>
              <Button variant='outline' className='flex items-center gap-2' onClick={clearCart}>
                <Trash2 className='h-4 w-4' />
                XÓA GIỎ HÀNG
              </Button>
            </div>

            {/* Cart Totals */}
            <div className='mt-8 border p-6'>
              <h2 className='text-lg font-medium mb-4'>TỔNG SỐ GIỎ HÀNG</h2>
              <div className='space-y-2 mb-4'>
                <div className='flex justify-between py-2 border-b'>
                  <span>Tổng cộng</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className='flex justify-between py-2 text-lg font-medium'>
                  <span>TỔNG CỘNG</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Checkout */}
            <div className='mt-8 text-center space-y-4'>
              <p className='text-sm'>
                ĐẢM BẢO THANH TOÁN <span className='text-green-600'>AN TOÀN</span>
              </p>
              <Button className='w-full bg-zinc-800 hover:bg-zinc-900'>TIẾN HÀNH THANH TOÁN</Button>
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
