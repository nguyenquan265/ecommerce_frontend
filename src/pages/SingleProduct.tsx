import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { Heart, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import Breadcrumb from '@/components/shared/Breadcrumb'
import ProductCard from '@/components/shared/ProductCard'
import FancyBox from '@/components/shared/FancyBox'

import { currencyFormatter } from '@/lib/utils'

import { useGetAllProducts, useGetProduct } from '@/apis/productApi'

const SingleProduct = () => {
  const { productId } = useParams()
  const { product, isLoading: isProductLoading } = useGetProduct(productId)
  const { products: relatedProducts, isLoading: isRelatedProductsLoading } = useGetAllProducts({
    page: 1,
    limit: 4,
    categorySlug: product?.category.slug,
    searchString: '',
    sortBy: 'desc'
  })
  const [quantity, setQuantity] = useState(1)
  const [rating, setRating] = useState(0)
  const [saveDetails, setSaveDetails] = useState(false)

  if (isProductLoading || isRelatedProductsLoading) {
    return null
  }

  if (!product) {
    return <div>Product not found</div>
  }

  const handleSubmitReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div className='min-h-screen bg-background'>
      <Breadcrumb text='product' />

      <div className='container mx-auto px-4 py-8'>
        <div className='grid md:grid-cols-2 gap-8'>
          {/* Product Images */}
          <FancyBox>
            <div className='space-y-4'>
              {/* Main Image */}
              <div className='bg-zinc-100 overflow-hidden rounded-lg'>
                <a data-fancybox='gallery' href={product?.mainImage}>
                  <img src={product?.mainImage} alt='Product image' className='w-full h-auto object-cover' />
                </a>
              </div>

              {/* Thumbnails */}
              <div className='flex gap-2'>
                {product?.subImages.map((image, index) => (
                  <a
                    key={index}
                    data-fancybox='gallery'
                    href={image.url}
                    className='group relative overflow-hidden rounded-lg w-1/4 max-w-[100px] aspect-square'
                  >
                    <img
                      src={image.url}
                      alt={`Product thumbnail ${index + 1}`}
                      className='w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105'
                    />
                    <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity'></div>
                  </a>
                ))}
              </div>
            </div>
          </FancyBox>

          {/* Product Details */}
          <div>
            <h1 className='text-2xl font-medium mb-2'>{product?.title}</h1>
            <div className='flex items-center gap-2 mb-4'>
              <p className='text-xl font-medium text-red-600'>
                {product?.priceDiscount
                  ? currencyFormatter(product.price - (product.price * product.priceDiscount) / 100)
                  : currencyFormatter(product ? product.price : 0)}
              </p>

              {product?.priceDiscount ? (
                <p className='text-xl text-gray-500 line-through'>{currencyFormatter(product.price)}</p>
              ) : (
                ''
              )}
            </div>

            {/* Size - Category */}
            <div className='space-y-2 text-sm mb-6'>
              <p>
                <span className='text-muted-foreground'>Size:</span> {product?.size}
              </p>
              <p>
                <span className='text-muted-foreground'>Category:</span> {product?.category.name}
              </p>
            </div>

            <div className='space-y-6'>
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

              {/* Add Wishlist */}
              <div className='flex gap-2'>
                <button className='p-2 border hover:border-zinc-400'>
                  <Heart className='h-4 w-4' />
                </button>
              </div>

              {/* Checkout Icon */}
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

              <Accordion type='single' collapsible className='w-full'>
                {/* Description */}
                <AccordionItem value='info' className='border-t border-b'>
                  <AccordionTrigger className='text-sm font-normal'>THÔNG TIN SẢN PHẨM</AccordionTrigger>
                  <AccordionContent>
                    <div
                      className='mb-4 product-information'
                      dangerouslySetInnerHTML={{ __html: product?.description ?? '' }}
                    />
                  </AccordionContent>
                </AccordionItem>

                {/* Review */}
                <AccordionItem value='reviews' className='border-b'>
                  <AccordionTrigger className='text-sm font-normal'>ĐÁNH GIÁ (0)</AccordionTrigger>
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
            {relatedProducts?.map((product) => <ProductCard key={product._id} product={product} viewMode='grid' />)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct
