import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Order } from '@/types'

import authorizedAxios from '@/axios/authorizedAxios'
import { PaymentMethodFormValues } from '@/components/forms/PaymentMethodForm'

export const useCreateOrder = () => {
  const queryClient = useQueryClient()

  const createCreateOrderRequest = async (
    data: PaymentMethodFormValues
  ): Promise<{
    order: Order
    detail: {
      order_url: string
      payUrl: string
      checkoutUrl: string
    }
  }> => {
    const res = await authorizedAxios.post('/orders', data)

    return res.data
  }

  const { mutateAsync: createOrder, isPending } = useMutation({
    mutationFn: createCreateOrderRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    }
  })

  return { createOrder, isPending }
}

export const useGetMyOrders = (params: { page?: number; limit?: number }) => {
  const createGetMyOrdersRequest = async (): Promise<{
    orders: Order[]
    pagination: {
      totalOrders: number
      totalPages: number
      currentPage: number
      limit: number
    }
  }> => {
    const res = await authorizedAxios.get('/orders', { params })

    return res.data
  }

  const { data, isLoading } = useQuery({
    queryKey: ['orders', params],
    queryFn: createGetMyOrdersRequest
  })

  return { orders: data?.orders, pagination: data?.pagination, isLoading }
}

export const useCancelOrder = () => {
  const queryClient = useQueryClient()

  const createCancelOrderRequest = async (orderId: string) => {
    await authorizedAxios.patch(`/orders/cancel-order/${orderId}`)
  }

  const { mutateAsync: cancelOrder, isPending } = useMutation({
    mutationFn: createCancelOrderRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      toast.success('Đã hủy đơn hàng')
    }
  })

  return { cancelOrder, isPending }
}
