import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Cart } from '@/types'

import authorizedAxios from '@/axios/authorizedAxios'
import axios from 'axios'

export const useGetCart = (userId: string = '') => {
  const createGetCartRequest = async (): Promise<Cart> => {
    const res = await authorizedAxios.get('/carts')

    return res.data.cart
  }

  const { data: cart, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: createGetCartRequest,
    enabled: !!userId
  })

  return { cart, isLoading }
}

export const useAddToCart = () => {
  const queryClient = useQueryClient()

  const createAddToCartRequest = async (data: { productId: string; quantity: number }): Promise<Cart> => {
    const res = await authorizedAxios.post('/carts/items', data)

    return res.data.cart
  }

  const { mutateAsync: addToCart, isPending } = useMutation({
    mutationFn: createAddToCartRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      toast.success('Sản phẩm đã được thêm vào giỏ hàng.')
    },
    onError: (error) => {
      if (
        axios.isAxiosError(error) &&
        error?.response?.status === 401 &&
        error.response.data.message === 'Unauthorized! (Refresh token expired)'
      ) {
        toast.error('Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại.')

        setTimeout(() => {
          window.location.href = '/login'
        }, 2000)
      }
    }
  })

  return { addToCart, isPending }
}

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient()

  const createRemoveFromCartRequest = async (productId: string): Promise<Cart> => {
    const res = await authorizedAxios.delete(`/carts/items/${productId}`)

    return res.data.cart
  }

  const { mutateAsync: removeFromCart, isPending } = useMutation({
    mutationFn: createRemoveFromCartRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    onError: (error) => {
      if (
        axios.isAxiosError(error) &&
        error?.response?.status === 401 &&
        error.response.data.message === 'Unauthorized! (Refresh token expired)'
      ) {
        toast.error('Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại.')

        setTimeout(() => {
          window.location.href = '/login'
        }, 2000)
      }
    }
  })

  return { removeFromCart, isPending }
}
