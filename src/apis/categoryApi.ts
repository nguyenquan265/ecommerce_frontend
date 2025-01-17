import { useQuery } from '@tanstack/react-query'
import { Category } from '@/types'

import authorizedAxios from '@/axios/authorizedAxios'

export const useGetAllCategories = () => {
  const createGetCategoriesRequest = async (): Promise<Category[]> => {
    const res = await authorizedAxios.get('/categories')

    return res.data.categories
  }

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: createGetCategoriesRequest,
    staleTime: 1000 * 60 * 5
  })

  return { categories, isLoading }
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
