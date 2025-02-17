import { Card } from '@/components/ui/card'

import { Cart } from '@/types'
import { currencyFormatter } from '@/lib/utils'

interface UserCartOverviewProps {
  cart: Cart
}

const UserCartOverview: React.FC<UserCartOverviewProps> = ({ cart: { cartItems } }) => {
  const shippingFee = 3000
  const subTotal = cartItems.reduce(
    (acc, item) =>
      acc +
      (item.product.priceDiscount
        ? (item.product.price - (item.product.price * item.product.priceDiscount) / 100) * item.quantity
        : item.product.price * item.quantity),
    0
  )
  const total = subTotal + shippingFee

  return (
    <Card className='xl:max-w-md max-w-3xl w-full p-6'>
      <h2 className='text-lg font-semibold mb-4'>THÔNG TIN ĐƠN HÀNG</h2>

      <div className='space-y-4'>
        {cartItems.map((item) => (
          <div key={item.product._id} className='flex gap-3'>
            <div className='relative w-16 h-16'>
              <img src={item.product.mainImage} alt={item.product.title} className='object-cover rounded-md' />
            </div>
            <div className='flex-1'>
              <p className='font-medium'>{item.product.title}</p>
              <p className='text-sm text-muted-foreground'>SL: {item.quantity}</p>
              <p className='text-sm text-muted-foreground'>Size: {item.product.size}</p>
            </div>
            <div className='text-right'>
              <p>
                {item.product.priceDiscount
                  ? currencyFormatter(item.product.price - (item.product.price * item.product.priceDiscount) / 100)
                  : currencyFormatter(item.product.price)}
              </p>
            </div>
          </div>
        ))}

        <div className='pt-4 border-t space-y-2'>
          <div className='flex justify-between text-sm'>
            <span>Tổng tiền hàng:</span>
            <span>{currencyFormatter(subTotal)}</span>
          </div>
          <div className='flex justify-between text-sm'>
            <span>Phí vận chuyển:</span>
            <span>{currencyFormatter(shippingFee)}</span>
          </div>
          <div className='flex justify-between font-medium pt-2 border-t'>
            <span>Tổng cộng:</span>
            <span className='text-red-500'>{currencyFormatter(total)}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default UserCartOverview
