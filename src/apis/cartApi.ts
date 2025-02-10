import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Cart } from '@/types'

import authorizedAxios from '@/axios/authorizedAxios'

export const useGetCart = (userId: string = '') => {
  const createGetCartRequest = async (): Promise<Cart> => {
    const res = await authorizedAxios.get('/cart')

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
    const res = await authorizedAxios.post('/cart/add', data)

    return res.data.cart
  }

  const { mutateAsync: addToCart, isPending } = useMutation({
    mutationFn: createAddToCartRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      toast.success('Sản phẩm đã được thêm vào giỏ hàng.')
    }
  })

  return { addToCart, isPending }
}

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient()

  const createRemoveFromCartRequest = async (productId: string): Promise<Cart> => {
    const res = await authorizedAxios.delete(`/cart/remove/${productId}`)

    return res.data.cart
  }

  const { mutateAsync: removeFromCart, isPending } = useMutation({
    mutationFn: createRemoveFromCartRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    }
  })

  return { removeFromCart, isPending }
}

export const useClearCart = () => {
  const queryClient = useQueryClient()

  const createClearCartRequest = async (): Promise<Cart> => {
    const res = await authorizedAxios.delete('/cart/clear')

    return res.data.cart
  }

  const { mutateAsync: clearCart, isPending } = useMutation({
    mutationFn: createClearCartRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      toast.success('Giỏ hàng đã được xóa.')
    }
  })

  return { clearCart, isPending }
}
