import { useQuery } from '@tanstack/react-query'
import { Product } from '@/types'

import authorizedAxios from '@/axios/authorizedAxios'

export const useGetAllProducts = (params: {
  page?: number
  limit?: number
  searchString?: string
  sortBy?: string
  categorySlug?: string
}) => {
  const createGetProductsRequest = async (): Promise<{
    products: Product[]
    pagination: {
      totalProducts: number
      totalPages: number
      currentPage: number
      limit: number
    }
  }> => {
    const res = await authorizedAxios.get('/products', { params })

    return res.data
  }

  const { data, isLoading } = useQuery({
    queryKey: ['products', params],
    queryFn: createGetProductsRequest
  })

  return { products: data?.products, pagination: data?.pagination, isLoading }
}

export const useGetProduct = (productId: string = '') => {
  const createGetProductRequest = async (): Promise<Product> => {
    const res = await authorizedAxios.get(`/products/${productId}`)

    return res.data.product
  }

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', { productId }],
    queryFn: createGetProductRequest,
    enabled: productId === 'new' ? false : !!productId
  })

  return { product, isLoading }
}
