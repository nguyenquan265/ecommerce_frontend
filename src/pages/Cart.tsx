import { useState } from 'react'

import { ShoppingCart } from 'lucide-react'

import CartSkeleton from '@/components/skeletons/CartSkeleton'
import CartStepper from '@/components/shared/CartStepper'
import UserCart from '@/components/shared/UserCart'
import UserProfileForm from '@/components/forms/UserProfileForm'
import UserCartOverview from '@/components/shared/UserCartOverview'

import { useUserContext } from '@/contexts/UserContext'
import { useGetCart } from '@/apis/cartApi'

const Cart = () => {
  const [cartStep, setCartStep] = useState<1 | 2 | 3>(1)
  const { currentUser, isUserLoading } = useUserContext()
  const { cart, isLoading } = useGetCart()

  if (isUserLoading || !currentUser) {
    return (
      <div className='min-h-screen bg-background'>
        <div className='bg-zinc-50 py-6'>
          <h1 className='container mx-auto px-4 text-center text-2xl font-medium flex items-center justify-center gap-2'>
            <ShoppingCart className='w-5 h-5' />
            GIỎ HÀNG (0)
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
          GIỎ HÀNG ({cart?.totalQuantity || 0})
        </h1>
      </div>

      <CartStepper currentStep={cartStep} />

      <div className='container mx-auto px-4 py-8'>
        {isLoading && <CartSkeleton />}

        {cart && cartStep == 1 && <UserCart cart={cart} setCartStep={setCartStep} />}

        {cart && cartStep == 2 && (
          <>
            <div className='flex flex-wrap justify-center gap-2'>
              <UserProfileForm user={currentUser} setCartStep={setCartStep} isFromCheckout />

              <UserCartOverview cart={cart} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart
