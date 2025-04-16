import { useEffect } from 'react'

import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { useUpdateOrder } from '@/apis/orderApi'
import { useAddressData } from '@/apis/locationApi'

import { orderPaymentMethodOptions, getPaymentMethodLabel, orderStatusOptions, getStatusLabel } from '@/lib/constants'
import { Order } from '@/types'

const formSchema = z.object({
  name: z.string().nonempty('Tên không được để trống'),
  phone: z.string().nonempty('Số điện thoại không được để trống'),
  province: z.string(),
  provinceName: z.string(),
  district: z.string(),
  districtName: z.string(),
  ward: z.string(),
  wardName: z.string(),
  address: z.string(),
  paymentMethod: z.string(),
  isPaid: z.boolean(),
  isDelivered: z.boolean(),
  status: z.string()
})

export type OrderFormValues = z.infer<typeof formSchema>

interface OrderFormProps {
  onOpenChange: (isOpen: boolean) => void
  selectedOrder: Order | null
}

const OrderForm: React.FC<OrderFormProps> = ({ onOpenChange, selectedOrder }) => {
  const { provinces, districts, wards, fetchDistricts, fetchWards } = useAddressData()
  const { updateOrder, isPending } = useUpdateOrder(selectedOrder?._id)

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: selectedOrder?.shippingAddress?.name || '',
      phone: selectedOrder?.shippingAddress?.phone || '',
      province: selectedOrder?.shippingAddress?.province || '',
      provinceName: selectedOrder?.shippingAddress?.provinceName || '',
      district: selectedOrder?.shippingAddress?.district || '',
      districtName: selectedOrder?.shippingAddress?.districtName || '',
      ward: selectedOrder?.shippingAddress?.ward || '',
      wardName: selectedOrder?.shippingAddress?.wardName || '',
      address: selectedOrder?.shippingAddress?.address || '',
      paymentMethod: selectedOrder?.paymentMethod || '',
      isPaid: selectedOrder?.isPaid || false,
      isDelivered: selectedOrder?.isDelivered || false,
      status: selectedOrder?.status || ''
    }
  })

  const onSubmit = async (values: OrderFormValues) => {
    await updateOrder(values)

    onOpenChange(false)
  }

  useEffect(() => {
    if (selectedOrder?.shippingAddress?.province) {
      fetchDistricts(selectedOrder.shippingAddress.province)
    }
  }, [selectedOrder, fetchDistricts])

  useEffect(() => {
    if (selectedOrder?.shippingAddress?.district) {
      fetchWards(selectedOrder.shippingAddress.district)
    }
  }, [selectedOrder, fetchWards])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
          {/* Base User Information */}
          <div className='space-y-2'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên</FormLabel>
                  <FormControl>
                    <Input {...field} className='w-full' required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số điện thoại</FormLabel>
                  <FormControl>
                    <Input {...field} className='w-full' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {provinces?.length > 0 ? (
              <FormField
                control={form.control}
                name='province'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tỉnh/Thành phố</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        const selectedProvince = provinces.find((p) => p.code.toString() === value)
                        field.onChange(value)
                        form.setValue('provinceName', selectedProvince?.name || '')
                        fetchDistricts(value)
                        form.setValue('district', '')
                        form.setValue('districtName', '')
                        form.setValue('ward', '')
                        form.setValue('wardName', '')
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Chọn Tỉnh/Thành' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {provinces.map((province: any) => (
                          <SelectItem key={province.code} value={province.code.toString()}>
                            {province.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name='province'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tỉnh/Thành phố</FormLabel>
                    <Select value={field.value}>
                      <FormControl>
                        <SelectTrigger disabled>
                          <SelectValue placeholder='Chọn Tỉnh/Thành' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {provinces.map((province: any) => (
                          <SelectItem key={province.code} value={province.code.toString()}>
                            {province.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {districts?.length > 0 || selectedOrder?.shippingAddress?.district ? (
              <FormField
                control={form.control}
                name='district'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quận/Huyện</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        const selectedDistrict = districts.find((d) => d.code.toString() === value)
                        field.onChange(value)
                        form.setValue('districtName', selectedDistrict?.name || '')
                        fetchWards(value)
                        form.setValue('ward', '')
                        form.setValue('wardName', '')
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Chọn Quận/Huyện' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {districts.map((district) => (
                          <SelectItem key={district.code} value={district.code.toString()}>
                            {district.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name='district'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quận/Huyện</FormLabel>
                    <Select value={field.value}>
                      <FormControl>
                        <SelectTrigger disabled>
                          <SelectValue placeholder='Chọn Quận/Huyện' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {districts.map((district) => (
                          <SelectItem key={district.code} value={district.code.toString()}>
                            {district.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {wards?.length > 0 || selectedOrder?.shippingAddress?.ward ? (
              <FormField
                control={form.control}
                name='ward'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phường/Xã</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        const selectedWard = wards.find((w) => w.code.toString() === value)
                        field.onChange(value)
                        form.setValue('wardName', selectedWard?.name || '')
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Chọn Phường/Xã' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {wards.map((ward) => (
                          <SelectItem key={ward.code} value={ward.code.toString()}>
                            {ward.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name='ward'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phường/Xã</FormLabel>
                    <Select value={field.value}>
                      <FormControl>
                        <SelectTrigger disabled>
                          <SelectValue placeholder='Chọn Phường/Xã' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {wards.map((ward) => (
                          <SelectItem key={ward.code} value={ward.code.toString()}>
                            {ward.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          {/* Payment Information */}
          <div className='space-y-2'>
            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Địa chỉ</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Nhập địa chỉ' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='paymentMethod'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phương thức thanh toán</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Chọn phương thức thanh toán' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {orderPaymentMethodOptions.map((method) => (
                        <SelectItem key={method} value={method}>
                          {getPaymentMethodLabel(method)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='isPaid'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Đã thanh toán</FormLabel>
                  <FormControl>
                    <Select onValueChange={(value) => field.onChange(value === 'true')} value={field.value.toString()}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Chọn trạng thái thanh toán' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='true'>Đã thanh toán</SelectItem>
                        <SelectItem value='false'>Chưa thanh toán</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='isDelivered'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Đã giao hàng</FormLabel>
                  <FormControl>
                    <Select onValueChange={(value) => field.onChange(value === 'true')} value={field.value.toString()}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Chọn trạng thái giao hàng' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='true'>Đã giao hàng</SelectItem>
                        <SelectItem value='false'>Chưa giao hàng</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trạng thái</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Chọn trạng thái' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {orderStatusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {getStatusLabel(status)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className='flex justify-end gap-4'>
          <Button variant='outline' type='button' disabled={isPending} onClick={() => onOpenChange(false)}>
            Hủy bỏ
          </Button>

          <Button type='submit' disabled={isPending}>
            Cập nhật đơn hàng
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default OrderForm
