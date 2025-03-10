import { useParams } from 'react-router-dom'

import ProductForm from '@/components/forms/admin/ProductForm'
import SingleProductSkeleton from '@/components/skeletons/admin/SingleProductSkeleton'

import { useGetAdminProduct } from '@/apis/productApi'
import { useGetAllCategories } from '@/apis/categoryApi'

const SingleProduct = () => {
  const { productId } = useParams()
  const { product, isLoading: isProductLoading } = useGetAdminProduct(productId)
  const { categories, isLoading: iscategoriesLoading } = useGetAllCategories()

  if (isProductLoading || iscategoriesLoading) {
    return <SingleProductSkeleton />
  }

  if (!categories || categories.length === 0) {
    return <div>Cửa hàng này không có danh mục, vui lòng tạo danh mục trước!</div>
  }

  if (productId !== 'new' && !product) {
    return <div>Không tìm thấy sản phẩm!</div>
  }

  return (
    <div className='space-y-4'>
      <ProductForm initialData={product} categories={categories} />
    </div>
  )
}

export default SingleProduct
