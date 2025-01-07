import { useState } from 'react'

import { Heart, RotateCcw, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Breadcrumb from '@/components/shared/Breadcrumb'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import ProductCard from '@/components/shared/ProductCard'

interface Product {
  id: number
  name: string
  price: number
  image: string
}

const relatedProducts: Product[] = [
  {
    id: 1,
    name: '10K Yellow Gold',
    price: 99.99,
    image: '/placeholder.svg?height=400&width=300'
  },
  {
    id: 2,
    name: 'Amet faucibus nunc',
    price: 51.99,
    image: '/placeholder.svg?height=400&width=300'
  },
  {
    id: 3,
    name: 'Consectetur nibh at',
    price: 119.99,
    image: '/placeholder.svg?height=400&width=300'
  },
  {
    id: 4,
    name: 'Dignissim molestie pellentesque',
    price: 89.99,
    image: '/placeholder.svg?height=400&width=300'
  }
]

const productImages = [
  '/placeholder.svg?height=600&width=500',
  '/placeholder.svg?height=600&width=500',
  '/placeholder.svg?height=600&width=500',
  '/placeholder.svg?height=600&width=500'
]

const SingleProduct = () => {
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [rating, setRating] = useState(0)
  const [saveDetails, setSaveDetails] = useState(false)

  const handleSubmitReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle review submission
  }

  return (
    <div className='min-h-screen bg-background'>
      {/* Breadcrumb */}
      <Breadcrumb text='product' />

      <div className='container mx-auto px-4 py-8'>
        <div className='grid md:grid-cols-2 gap-8'>
          {/* Product Images */}
          <div className='space-y-4'>
            <div className='relative aspect-[3/4] bg-zinc-100'>
              <img src={productImages[currentImageIndex]} alt='Product image' className='object-cover' />
            </div>
            <div className='grid grid-cols-4 gap-4'>
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative aspect-square bg-zinc-100 ${
                    currentImageIndex === index ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <img src={image} alt={`Product thumbnail ${index + 1}`} className='object-cover' />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className='text-2xl font-medium mb-2'>10K Yellow Gold</h1>
            <p className='text-xl mb-4'>${'99.99'}</p>

            <p className='text-muted-foreground mb-6'>
              Amet, elit tellus, nisi odio velit ut. Euismod sit arcu, quisque arcu purus orci leo.
            </p>

            <div className='space-y-6'>
              <div>
                <p className='mb-2'>Size {selectedSize}</p>
                <div className='flex gap-2'>
                  <button
                    className={`w-8 h-8 border ${selectedSize === 'L' ? 'border-black' : 'border-zinc-200'}`}
                    onClick={() => setSelectedSize('L')}
                  >
                    L
                  </button>
                  <button
                    className={`w-8 h-8 border ${selectedSize === 'M' ? 'border-black' : 'border-zinc-200'}`}
                    onClick={() => setSelectedSize('M')}
                  >
                    M
                  </button>
                  <button
                    className={`w-8 h-8 border ${selectedSize === 'S' ? 'border-black' : 'border-zinc-200'}`}
                    onClick={() => setSelectedSize('S')}
                  >
                    S
                  </button>
                </div>
                <button
                  className='text-sm text-muted-foreground hover:text-foreground mt-2'
                  onClick={() => setSelectedSize('')}
                >
                  Clear
                </button>
              </div>

              <div className='flex gap-4'>
                <div className='flex items-center border'>
                  <button
                    className='px-3 py-2 hover:bg-zinc-100'
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  >
                    -
                  </button>
                  <input
                    type='number'
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className='w-12 text-center border-x px-0'
                  />
                  <button className='px-3 py-2 hover:bg-zinc-100' onClick={() => setQuantity((q) => q + 1)}>
                    +
                  </button>
                </div>
                <button className='flex-1 bg-zinc-800 hover:bg-zinc-900 text-white px-4'>ADD TO CART</button>
              </div>

              <button className='w-full bg-zinc-800 hover:bg-zinc-900 text-white py-3'>BUY NOW</button>

              <div className='flex gap-2'>
                <button className='p-2 border hover:border-zinc-400'>
                  <Heart className='h-4 w-4' />
                </button>
                <button className='p-2 border hover:border-zinc-400'>
                  <RotateCcw className='h-4 w-4' />
                </button>
              </div>

              <div className='space-y-4 pt-4'>
                <p className='text-center text-sm'>GUARANTEED SAFE CHECKOUT</p>
                <div className='flex justify-center gap-2'>
                  {['visa', 'mastercard', 'paypal', 'amex', 'maestro', 'bitcoin'].map((payment) => (
                    <div key={payment} className='w-12 h-8 bg-zinc-100 rounded flex items-center justify-center'>
                      <img
                        src={`/placeholder.svg?height=20&width=32`}
                        alt={payment}
                        width={32}
                        height={20}
                        className='opacity-50'
                      />
                    </div>
                  ))}
                </div>
                <p className='text-center text-sm text-muted-foreground'>Your Payment is 100% Secure</p>
              </div>

              <div className='space-y-2 text-sm pt-4'>
                <p>
                  <span className='text-muted-foreground'>Brand:</span> Brand 01
                </p>
                <p>
                  <span className='text-muted-foreground'>SKU:</span> 12345
                </p>
                <p>
                  <span className='text-muted-foreground'>Category:</span> Men
                </p>
              </div>

              <Accordion type='single' collapsible className='w-full'>
                <AccordionItem value='info' className='border-t border-b'>
                  <AccordionTrigger className='text-sm font-normal'>ADDITIONAL INFORMATION</AccordionTrigger>
                  <AccordionContent>
                    <div className='grid grid-cols-2 gap-y-2 text-sm'>
                      <div className='text-muted-foreground'>Size</div>
                      <div>L, M, S</div>
                      <div className='text-muted-foreground'>Material</div>
                      <div>Fleece</div>
                      <div className='text-muted-foreground'>Color</div>
                      <div>Black, Blue</div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value='reviews' className='border-b'>
                  <AccordionTrigger className='text-sm font-normal'>REVIEWS (0)</AccordionTrigger>
                  <AccordionContent>
                    <div className='space-y-6'>
                      <p className='text-sm text-muted-foreground'>There are no reviews yet.</p>

                      <div>
                        <h3 className='text-lg font-medium mb-4'>BE THE FIRST TO REVIEW "10K YELLOW GOLD"</h3>
                        <p className='text-sm text-muted-foreground mb-6'>
                          Your email address will not be published. Required fields are marked *
                        </p>

                        <form onSubmit={handleSubmitReview} className='space-y-4'>
                          <div className='space-y-2'>
                            <label className='block text-sm'>Your rating *</label>
                            <div className='flex gap-1'>
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type='button'
                                  onClick={() => setRating(star)}
                                  className='text-zinc-200 hover:text-zinc-400'
                                >
                                  <Star className={`h-5 w-5 ${rating >= star ? 'fill-zinc-800 text-zinc-800' : ''}`} />
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className='space-y-2'>
                            <label htmlFor='review' className='block text-sm'>
                              Your review *
                            </label>
                            <Textarea id='review' required className='min-h-[150px]' />
                          </div>

                          <div className='space-y-2'>
                            <label htmlFor='name' className='block text-sm'>
                              Name *
                            </label>
                            <Input id='name' required />
                          </div>

                          <div className='space-y-2'>
                            <label htmlFor='email' className='block text-sm'>
                              Email *
                            </label>
                            <Input id='email' type='email' required />
                          </div>

                          <div className='flex items-center space-x-2'>
                            <Checkbox
                              id='save-details'
                              checked={saveDetails}
                              onCheckedChange={(checked) => setSaveDetails(checked as boolean)}
                            />
                            <label htmlFor='save-details' className='text-sm leading-none'>
                              Save my name, email, and website in this browser for the next time I comment.
                            </label>
                          </div>

                          <Button type='submit' className='bg-zinc-800 hover:bg-zinc-900'>
                            Submit
                          </Button>
                        </form>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className='mt-16'>
          <h2 className='text-2xl font-medium mb-8 text-center'>Related Products</h2>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} viewMode='grid' />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct
