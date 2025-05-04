import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Order, Product } from '@/types'

import authorizedAxios from '@/axios/authorizedAxios'
import { PaymentMethodFormValues } from '@/components/forms/PaymentMethodForm'
import { OrderFormValues } from '@/components/forms/admin/OrderForm'

// default user
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
      queryClient.invalidateQueries({ queryKey: ['shopOverview'] })
      queryClient.invalidateQueries({ queryKey: ['ordersOverview'] })
      queryClient.invalidateQueries({ queryKey: ['products'] })
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
      queryClient.invalidateQueries({ queryKey: ['shopOverview'] })
      queryClient.invalidateQueries({ queryKey: ['ordersOverview'] })
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast.success('Đã hủy đơn hàng')
    }
  })

  return { cancelOrder, isPending }
}

export const useConfirmOrder = () => {
  const queryClient = useQueryClient()

  const createConfirmOrderRequest = async (orderId: string) => {
    await authorizedAxios.patch(`/orders/confirm-order/${orderId}`)
  }

  const { mutateAsync: confirmOrder, isPending } = useMutation({
    mutationFn: createConfirmOrderRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      queryClient.invalidateQueries({ queryKey: ['shopOverview'] })
      queryClient.invalidateQueries({ queryKey: ['ordersOverview'] })
      toast.success('Đã xác nhận đơn hàng')
    }
  })

  return { confirmOrder, isPending }
}

// admin
export const useGetAdminOrders = (params: {
  page?: number
  limit?: number
  searchString?: string
  sortBy?: string
  paymentMethod?: string
}) => {
  const createGetOrdersRequest = async (): Promise<{
    orders: Order[]
    pagination: {
      totalOrders: number
      totalPages: number
      currentPage: number
      limit: number
    }
  }> => {
    const res = await authorizedAxios.get('/orders/admin', { params })

    return res.data
  }

  const { data, isLoading } = useQuery({
    queryKey: ['orders', params],
    queryFn: createGetOrdersRequest,
    refetchInterval: 5000
  })

  return { orders: data?.orders, pagination: data?.pagination, isLoading }
}

export const useGetShopOverview = () => {
  const createGetShopOverviewRequest = async (): Promise<{
    totalProducts: number
    totalUsers: number
    totalOrders: number
    deliveredOrders: number
    cancelledOrders: number
    totalRevenue: number
    totalProductInStock: number
    totalCategories: number
    isPaidOrders: number
    lowStockProducts: Product[]
    paymentMethodArr: {
      method: string
      count: number
    }[]
    totalEmailUsers: number
    totalGoogleUsers: number
    totalDeletedProducts: number
    orderChartData: {
      month: string
      totalRevenue: number
    }[]
  }> => {
    const res = await authorizedAxios.get('/orders/shopOverview')

    return res.data.data
  }

  const { data, isLoading } = useQuery({
    queryKey: ['shopOverview'],
    queryFn: createGetShopOverviewRequest,
    refetchInterval: 5000
  })

  return { shopOverview: data, isLoading }
}

export const useGetOrderOverview = (params: { orderTimeOption: string }) => {
  const createGetOrderOverviewRequest = async (): Promise<{
    orders: Order[]
    data: {
      totalRevenue: number
      cancelledOrders: number
      onTheWayOrders: number
      processingOrders: number
      deliveredOrders: number
      pendingOrders: number
    }
  }> => {
    const res = await authorizedAxios.get('/orders/overview', { params })

    return res.data
  }

  const { data, isLoading } = useQuery({
    queryKey: ['ordersOverview', params],
    queryFn: createGetOrderOverviewRequest,
    refetchInterval: 5000
  })

  return { orderOverview: data?.data, orders: data?.orders, isLoading }
}

export const useGetSingleOrder = (orderId: string = '') => {
  const createGetSingleOrderRequest = async (): Promise<Order> => {
    const res = await authorizedAxios.get(`/orders/${orderId}`)

    return res.data.order
  }

  const { data, isLoading } = useQuery({
    queryKey: ['orders', orderId],
    queryFn: createGetSingleOrderRequest,
    enabled: !!orderId
  })

  return { order: data, isLoading }
}

export const useUpdateOrder = (orderId: string = '') => {
  const queryClient = useQueryClient()

  const createUpdateOrderRequest = async (data: OrderFormValues): Promise<Order> => {
    const res = await authorizedAxios.patch(`/orders/${orderId}`, data)

    return res.data.order
  }

  const { mutateAsync: updateOrder, isPending } = useMutation({
    mutationFn: createUpdateOrderRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      queryClient.invalidateQueries({ queryKey: ['shopOverview'] })
      queryClient.invalidateQueries({ queryKey: ['ordersOverview'] })
      toast.success('Đã cập nhật đơn hàng')
    }
  })

  return { updateOrder, isPending }
}

export const useDeleteOrder = (orderId: string = '') => {
  const queryClient = useQueryClient()

  const createDeleteOrderRequest = async () => {
    await authorizedAxios.delete(`/orders/${orderId}`)
  }

  const { mutateAsync: deleteOrder, isPending } = useMutation({
    mutationFn: createDeleteOrderRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      queryClient.invalidateQueries({ queryKey: ['shopOverview'] })
      queryClient.invalidateQueries({ queryKey: ['ordersOverview'] })
      toast.success('Đã xóa đơn hàng')
    }
  })

  return { deleteOrder, isPending }
}
