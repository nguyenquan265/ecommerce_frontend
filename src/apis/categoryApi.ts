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
    queryFn: createGetCategoriesRequest
  })

  return { categories, isLoading }
}
