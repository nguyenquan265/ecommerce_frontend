import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Product } from '@/types'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import { useAddToCart } from '@/apis/cartApi'
import { useUserContext } from '@/contexts/UserContext'
import { cn, currencyFormatter, priceFormatter } from '@/lib/utils'

interface PreviewModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

const PreviewModal = ({ product, isOpen, onClose }: PreviewModalProps) => {
  const [currentImage, setCurrentImage] = useState(product.mainImage)
  const { currentUser } = useUserContext()
  const { addToCart, isPending } = useAddToCart()
  const navigate = useNavigate()

  const handleAddCart = async () => {
    if (currentUser) {
      await addToCart({ productId: product._id, quantity: 1 })
    } else {
      navigate('/login')
    }

    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[700px]'>
        <DialogHeader>
          <DialogTitle>{product.title}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <img
              src={currentImage}
              alt={product.title}
              width={300}
              height={300}
              className='w-full h-[300px] object-cover rounded-lg'
            />

            <div className='flex mt-2 pb-2 space-x-2 overflow-x-auto custom-scroll'>
              {[product.mainImage, ...product.subImages.map((img) => img.url)].map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.title} - Image ${index + 1}`}
                  width={60}
                  height={60}
                  className={cn(
                    'w-16 h-16 object-cover rounded cursor-pointer',
                    currentImage === img && 'border-2 border-black'
                  )}
                  onClick={() => setCurrentImage(img)}
                />
              ))}
            </div>
          </div>

          <div className='space-y-4'>
            {product.priceDiscount && (
              <p className='text-2xl text-gray-500 line-through'>{currencyFormatter(product.price)}</p>
            )}

            <p className='text-2xl font-medium text-red-600'>
              {currencyFormatter(priceFormatter(product.priceDiscount, product.price))}
            </p>
            <p>Kích thước: {product.size}</p>
            <p>Số lượng còn lại: {product.quantity}</p>

            <Button className='w-full' onClick={handleAddCart} disabled={isPending}>
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PreviewModal
