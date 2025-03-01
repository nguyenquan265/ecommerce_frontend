import { useNavigate } from 'react-router-dom'

import { Check, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Breadcrumb from '@/components/shared/Breadcrumb'

import { useCompare } from '@/contexts/CompareContext'
import { useUserContext } from '@/contexts/UserContext'
import { useAddToCart } from '@/apis/cartApi'

import type { Product } from '@/types'
import { currencyFormatter, priceFormatter } from '@/lib/utils'

const Compare = () => {
  const { currentUser } = useUserContext()
  const { compareItems, removeFromCompare } = useCompare()
  const { addToCart, isPending: isAddToCartPending } = useAddToCart()
  const navigate = useNavigate()
  const emptyColumns = Array(Math.max(0, 4 - compareItems.length)).fill(null)

  const compareMoreProducts = () => {
    navigate('/shop')
  }

  const handleAddCart = async (product: Product) => {
    if (currentUser) {
      await addToCart({ productId: product._id, quantity: 1 })
    } else {
      navigate('/login')
    }
  }

  return (
    <div className='min-h-screen bg-background'>
      <Breadcrumb text='So sánh sản phẩm' />

      <div className='container mx-auto px-4 py-16'>
        <div className='mb-6 flex justify-between items-center'>
          <h1 className='text-2xl font-bold'>Sản phẩm ({compareItems.length}/4)</h1>
        </div>

        {compareItems.length === 0 ? (
          <div className='text-center py-12 border rounded-lg'>
            <p className='text-gray-500 mb-4'>Chưa có sản phẩm nào để so sánh</p>
            <Button onClick={compareMoreProducts} className='h-10 w-full bg-zinc-800 hover:bg-zinc-900 max-w-[300px]'>
              Thêm sản phẩm để so sánh
            </Button>
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='w-full border-collapse'>
              <thead>
                <tr>
                  <th className='border p-3 bg-gray-50 font-medium text-sm uppercase w-[150px] min-w-[150px]'>
                    HÀNH ĐỘNG
                  </th>
                  {compareItems.map((product) => (
                    <th key={`header-${product._id}`} className='border p-3 text-center'>
                      <button
                        onClick={() => removeFromCompare(product._id)}
                        className='text-gray-500 hover:text-red-500 flex items-center justify-center mx-auto'
                      >
                        <Trash2 size={18} />
                        <span className='ml-1'>Xóa</span>
                      </button>
                    </th>
                  ))}
                  {emptyColumns.map((_, index) => (
                    <th key={`empty-header-${index}`} className='border p-3'></th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* IMAGE ROW */}
                <tr>
                  <th className='border p-3 bg-gray-50 font-medium text-sm uppercase w-[150px] min-w-[150px]'>
                    HÌNH ẢNH
                  </th>
                  {compareItems.map((product) => (
                    <td key={`image-${product._id}`} className='border p-3 text-center'>
                      <div className='flex justify-center'>
                        <img
                          src={product.mainImage || '/placeholder.svg'}
                          alt={product.title}
                          width={100}
                          height={120}
                          className='object-cover'
                        />
                      </div>
                    </td>
                  ))}
                  {emptyColumns.map((_, index) => (
                    <td key={`empty-image-${index}`} className='border p-3'></td>
                  ))}
                </tr>

                {/* TITLE ROW */}
                <tr>
                  <th className='border p-3 bg-gray-50 font-medium text-sm uppercase w-[150px] min-w-[150px]'>
                    TÊN SẢN PHẨM
                  </th>
                  {compareItems.map((product) => (
                    <td key={`title-${product._id}`} className='border p-3 text-center'>
                      {product.title}
                    </td>
                  ))}
                  {emptyColumns.map((_, index) => (
                    <td key={`empty-title-${index}`} className='border p-3'></td>
                  ))}
                </tr>

                {/* PRICE ROW */}
                <tr>
                  <th className='border p-3 bg-gray-50 font-medium text-sm uppercase w-[150px] min-w-[150px]'>GIÁ</th>
                  {compareItems.map((product) => (
                    <td key={`price-${product._id}`} className='border p-3 text-center'>
                      {currencyFormatter(priceFormatter(product.priceDiscount, product.price))}
                    </td>
                  ))}
                  {emptyColumns.map((_, index) => (
                    <td key={`empty-price-${index}`} className='border p-3'></td>
                  ))}
                </tr>

                {/* BUTTON ROW */}
                <tr>
                  <th className='border p-3 bg-gray-50 font-medium text-sm uppercase w-[150px] min-w-[150px]'>NÚT</th>
                  {compareItems.map((product) => (
                    <td key={`button-${product._id}`} className='border p-3 text-center'>
                      <Button
                        onClick={() => handleAddCart(product)}
                        disabled={isAddToCartPending || product.quantity === 0}
                        className='bg-zinc-800 hover:bg-zinc-900 px-4 py-2 text-sm'
                      >
                        Thêm vào giỏ hàng
                      </Button>
                    </td>
                  ))}
                  {emptyColumns.map((_, index) => (
                    <td key={`empty-button-${index}`} className='border p-3'></td>
                  ))}
                </tr>

                {/* STOCK STATUS ROW */}
                <tr>
                  <th className='border p-3 bg-gray-50 font-medium text-sm uppercase w-[150px] min-w-[150px]'>
                    TÌNH TRẠNG KHO
                  </th>
                  {compareItems.map((product) => (
                    <td key={`stock-${product._id}`} className='border p-3 text-center'>
                      {product.quantity > 0 ? (
                        <div className='flex items-center justify-center text-green-500'>
                          <Check size={16} className='mr-1' />
                          <span>Còn hàng</span>
                        </div>
                      ) : (
                        <div className='flex items-center justify-center text-red-500'>
                          <span>Hết hàng</span>
                        </div>
                      )}
                    </td>
                  ))}
                  {emptyColumns.map((_, index) => (
                    <td key={`empty-stock-${index}`} className='border p-3'></td>
                  ))}
                </tr>

                {/* SLUG ROW */}
                <tr>
                  <th className='border p-3 bg-gray-50 font-medium text-sm uppercase w-[150px] min-w-[150px]'>SLUG</th>
                  {compareItems.map((product) => (
                    <td key={`sku-${product._id}`} className='border p-3 text-center'>
                      {product.slug}
                    </td>
                  ))}
                  {emptyColumns.map((_, index) => (
                    <td key={`empty-sku-${index}`} className='border p-3'></td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {compareItems.length > 0 && (
          <div className='flex justify-end mt-6'>
            <Button onClick={compareMoreProducts} className='bg-zinc-800 hover:bg-zinc-900 text-white'>
              SO SÁNH THÊM SẢN PHẨM
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Compare
