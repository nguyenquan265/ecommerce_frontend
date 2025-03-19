import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Product } from '@/types'

import { ProductFormValues } from '@/components/forms/admin/ProductForm'

import authorizedAxios from '@/axios/authorizedAxios'

// default user
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
    queryKey: ['products', 'user', params],
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

// admin
export const useGetAllAdminProducts = (params: {
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
    const res = await authorizedAxios.get('/products/admin', { params })

    return res.data
  }

  const { data, isLoading } = useQuery({
    queryKey: ['products', 'admin', params],
    queryFn: createGetProductsRequest
  })

  return { products: data?.products, pagination: data?.pagination, isLoading }
}

export const useGetAdminProduct = (productId: string = '') => {
  const createGetProductRequest = async (): Promise<Product> => {
    const res = await authorizedAxios.get(`/products/admin/${productId}`)

    return res.data.product
  }

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', { productId }],
    queryFn: createGetProductRequest,
    enabled: productId === 'new' ? false : !!productId
  })

  return { product, isLoading }
}

export const useCreateProduct = () => {
  const queryClient = useQueryClient()

  const createuseCreateProductRequest = async (data: ProductFormValues): Promise<Product> => {
    const res = await authorizedAxios.post('/products', data)

    return res.data.product
  }

  const { mutateAsync: createProduct, isPending } = useMutation({
    mutationFn: createuseCreateProductRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['shopOverview'] })
      toast.success('Tạo sản phẩm thành công')
    }
  })

  return { createProduct, isPending }
}

export const useUpdateProduct = (productId: string = '') => {
  const queryClient = useQueryClient()

  const createUpdateProductRequest = async (data: ProductFormValues): Promise<Product> => {
    const res = await authorizedAxios.patch(`/products/${productId}`, data)

    return res.data.product
  }

  const { mutateAsync: updateProduct, isPending } = useMutation({
    mutationFn: createUpdateProductRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['product', { productId }] })
      toast.success('Cập nhật sản phẩm thành công')
    }
  })

  return { updateProduct, isPending }
}

export const useDeleteProduct = (productId: string = '') => {
  const queryClient = useQueryClient()

  const createDeleteProductRequest = async () => {
    const res = await authorizedAxios.delete(`/products/${productId}`)

    return res.data
  }

  const { mutateAsync: deleteProduct, isPending } = useMutation({
    mutationFn: createDeleteProductRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.removeQueries({ queryKey: ['product', { productId }] })
      toast.success('Xóa sản phẩm thành công')
    }
  })

  return { deleteProduct, isPending }
}
