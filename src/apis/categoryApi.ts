import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Category } from '@/types'

import { CategoryFormValues } from '@/components/forms/admin/CategoryForm'

import authorizedAxios from '@/axios/authorizedAxios'

// defaul user
export const useGetAllCategories = () => {
  const createGetCategoriesRequest = async (): Promise<Category[]> => {
    const res = await authorizedAxios.get('/categories')

    return res.data.categories
  }

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: createGetCategoriesRequest
  })

  return { categories, isLoading }
}

// admin
export const useCreateCategory = () => {
  const queryClient = useQueryClient()

  const createuseCreateCategoryRequest = async (data: CategoryFormValues): Promise<Category> => {
    const res = await authorizedAxios.post('/categories', data)

    return res.data.category
  }

  const { mutateAsync: createCategory, isPending } = useMutation({
    mutationFn: createuseCreateCategoryRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      queryClient.invalidateQueries({ queryKey: ['shopOverview'] })
      toast.success('Danh mục đã được tạo.')
    }
  })

  return { createCategory, isPending }
}

export const useGetCategory = (categoryId: string = '') => {
  const createGetCategoryRequest = async (): Promise<Category> => {
    const res = await authorizedAxios.get(`/categories/${categoryId}`)

    return res.data.category
  }

  const { data: category, isLoading } = useQuery({
    queryKey: ['category', { categoryId }],
    queryFn: createGetCategoryRequest,
    enabled: categoryId === 'new' ? false : !!categoryId
  })

  return { category, isLoading }
}

export const useUpdateCategory = (categoryId: string = '') => {
  const queryClient = useQueryClient()

  const createUpdateCategoryRequest = async (data: CategoryFormValues): Promise<Category> => {
    const res = await authorizedAxios.patch(`/categories/${categoryId}`, data)

    return res.data.category
  }

  const { mutateAsync: updateCategory, isPending } = useMutation({
    mutationFn: createUpdateCategoryRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      toast.success('Danh mục đã được cập nhật.')
    }
  })

  return { updateCategory, isPending }
}

export const useDeleteCategory = (categoryId: string = '') => {
  const queryClient = useQueryClient()

  const createDeleteCategoryRequest = async () => {
    const res = await authorizedAxios.delete(`/categories/${categoryId}`)

    return res.data
  }

  const { mutateAsync: deleteCategory, isPending } = useMutation({
    mutationFn: createDeleteCategoryRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      queryClient.invalidateQueries({ queryKey: ['shopOverview'] })
      toast.success('Danh mục đã được xóa.')
    }
  })

  return { deleteCategory, isPending }
}
