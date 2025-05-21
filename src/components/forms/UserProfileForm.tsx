import { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import type { User } from '@/types'
import { useUpdateUserProfile } from '@/apis/userApi'
import { useAddressData } from '@/apis/locationApi'
import { cn } from '@/lib/utils'
import { useUserContext } from '@/contexts/UserContext'

interface UserProfileFormProps {
  isFromCheckout?: boolean
  setCartStep?: React.Dispatch<React.SetStateAction<1 | 2 | 3>>
  from: 'profile' | 'checkout'
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Tên phải có ít nhất 2 ký tự.'
  }),
  email: z.string().email({
    message: 'Email không hợp lệ.'
  }),
  phoneNumber: z.string().min(10, {
    message: 'Số điện thoại phải có ít nhất 10 số.'
  }),
  province: z.string().nonempty({ message: 'Vui lòng chọn Tỉnh/Thành phố' }),
  provinceName: z.string(),
  district: z.string().nonempty({ message: 'Vui lòng chọn Quận/Huyện' }),
  districtName: z.string(),
  ward: z.string().nonempty({ message: 'Vui lòng chọn Phường/Xã' }),
  wardName: z.string(),
  address: z.string().nonempty({ message: 'Vui lòng nhập địa chỉ' })
})

export type UserProfileFormValues = z.infer<typeof formSchema>

const UserProfileForm: React.FC<UserProfileFormProps> = ({ setCartStep, isFromCheckout, from }) => {
  const { currentUser: user } = useUserContext()
  const { provinces, districts, wards, fetchProvinces, fetchDistricts, fetchWards } = useAddressData()
  const { updateUserProfile, isPending } = useUpdateUserProfile()

  const form = useForm<UserProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      phoneNumber: user?.phoneNumber || '',
      province: user?.shippingAddress?.province || '',
      provinceName: user?.shippingAddress?.provinceName || '',
      district: user?.shippingAddress?.district || '',
      districtName: user?.shippingAddress?.districtName || '',
      ward: user?.shippingAddress?.ward || '',
      wardName: user?.shippingAddress?.wardName || '',
      address: user?.shippingAddress?.address || ''
    }
  })

  const mapUserToFormValues = (user: User): Partial<UserProfileFormValues> => ({
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber || '',
    province: user.shippingAddress?.province || '',
    provinceName: user.shippingAddress?.provinceName || '',
    district: user.shippingAddress?.district || '',
    districtName: user.shippingAddress?.districtName || '',
    ward: user.shippingAddress?.ward || '',
    wardName: user.shippingAddress?.wardName || '',
    address: user.shippingAddress?.address || ''
  })

  const isUserChanged = (user: User, values: UserProfileFormValues) => {
    const userValues = mapUserToFormValues(user)
    return Object.entries(userValues).some(([key, val]) => values[key as keyof UserProfileFormValues] !== val)
  }

  const onSubmit = async (values: UserProfileFormValues) => {
    if (isUserChanged(user!, values)) {
      await updateUserProfile(values)
    }

    if (isFromCheckout && setCartStep) {
      setCartStep(3)
    }
  }

  useEffect(() => {
    fetchProvinces()
  }, [])

  useEffect(() => {
    if (user?.shippingAddress?.province) {
      fetchDistricts(user.shippingAddress.province)
    }

    if (user?.shippingAddress?.district) {
      fetchWards(user.shippingAddress.district)
    }
  }, [user?.shippingAddress])

  return (
    <Card className={cn('p-6', isFromCheckout ? 'w-full' : 'mx-auto', from === 'profile' ? 'max-w-4xl' : 'max-w-3xl')}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          {isFromCheckout && <h1 className='text-xl font-semibold'>Thông tin giao hàng</h1>}

          {/* Personal Information */}
          <div>
            {!isFromCheckout && (
              <>
                <h1 className='text-xl font-semibold'>Thông tin cá nhân</h1>
                <p className='text-sm text-muted-foreground mb-4'>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
              </>
            )}

            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {!isFromCheckout && (
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name='phoneNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Delivery Information */}
          <div>
            {!isFromCheckout && <h2 className='text-xl font-semibold mb-4'>Thông tin nhận hàng</h2>}

            <div className='space-y-4'>
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
                        <SelectTrigger disabled={!(provinces?.length > 0)}>
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
                        <SelectTrigger disabled={!(districts?.length > 0 || user?.shippingAddress?.district)}>
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
                        <SelectTrigger disabled={!(wards?.length > 0 || user?.shippingAddress?.ward)}>
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
            </div>
          </div>

          <div className={cn('flex gap-2', isFromCheckout ? 'justify-between' : 'justify-end')}>
            {isFromCheckout && setCartStep && (
              <Button type='button' onClick={() => setCartStep(1)} disabled={isPending}>
                Giỏ hàng
              </Button>
            )}

            <Button type='submit' disabled={isPending}>
              {isFromCheckout ? 'Chọn phương thức thanh toán' : 'Cập nhật'}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  )
}

export default UserProfileForm
