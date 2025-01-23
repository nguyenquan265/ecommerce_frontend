import { useEffect, useState } from 'react'

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

interface Location {
  name: string
  code: number
}

interface UserProfileFormProps {
  user: User
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
  province: z.string(),
  provinceName: z.string(),
  district: z.string(),
  districtName: z.string(),
  ward: z.string(),
  wardName: z.string(),
  address: z.string()
})

export type UserProfileFormValues = z.infer<typeof formSchema>

const UserProfileForm: React.FC<UserProfileFormProps> = ({ user }) => {
  const [provinces, setProvinces] = useState<Location[]>([])
  const [districts, setDistricts] = useState<Location[]>([])
  const [wards, setWards] = useState<Location[]>([])
  const { updateUserProfile, isPending } = useUpdateUserProfile()
  const hasShippingAddress = !!user.shippingAddress

  const form = useForm<UserProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
    }
  })

  useEffect(() => {
    fetch('https://provinces.open-api.vn/api/p/')
      .then((res) => res.json())
      .then((data) => setProvinces(data))
  }, [])

  useEffect(() => {
    if (hasShippingAddress && user.shippingAddress?.province) {
      handleProvinceChange(user.shippingAddress.province)
    }
  }, [hasShippingAddress, user.shippingAddress?.province])

  const handleProvinceChange = async (provinceCode: string) => {
    const selectedProvince = provinces.find((p) => p.code.toString() === provinceCode)
    form.setValue('province', provinceCode)
    form.setValue('provinceName', selectedProvince?.name || '')

    if (!hasShippingAddress) {
      form.setValue('district', '')
      form.setValue('districtName', '')
      form.setValue('ward', '')
      form.setValue('wardName', '')
    }

    const res = await fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
    const data = await res.json()
    setDistricts(data.districts)

    if (hasShippingAddress && user.shippingAddress?.district) {
      handleDistrictChange(user.shippingAddress.district)
    }
  }

  const handleDistrictChange = async (districtCode: string) => {
    const selectedDistrict = districts.find((d) => d.code.toString() === districtCode)
    form.setValue('district', districtCode)
    form.setValue('districtName', selectedDistrict?.name || '')

    if (!hasShippingAddress) {
      form.setValue('ward', '')
      form.setValue('wardName', '')
    }

    const res = await fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
    const data = await res.json()
    setWards(data.wards)

    if (hasShippingAddress && user.shippingAddress?.ward) {
      handleWardChange(user.shippingAddress.ward)
    }
  }

  const handleWardChange = (wardCode: string) => {
    const selectedWard = wards.find((w) => w.code.toString() === wardCode)
    form.setValue('ward', wardCode)
    form.setValue('wardName', selectedWard?.name || '')
  }

  const onSubmit = async (values: UserProfileFormValues) => {
    await updateUserProfile(values)
  }

  return (
    <Card className='max-w-3xl mx-auto p-6'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          {/* Personal Information */}
          <div>
            <h1 className='text-xl font-semibold'>Thông tin cá nhân</h1>
            <p className='text-sm text-muted-foreground mb-4'>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
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
            <h2 className='text-xl font-semibold mb-4'>Thông tin nhận hàng</h2>
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='province'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tỉnh/Thành phố</FormLabel>
                    <Select onValueChange={handleProvinceChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Chọn Tỉnh/Thành' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {provinces.map((province) => (
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

              {(!hasShippingAddress || (hasShippingAddress && user.shippingAddress?.district)) && (
                <FormField
                  control={form.control}
                  name='district'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quận/Huyện</FormLabel>
                      <Select
                        onValueChange={handleDistrictChange}
                        value={field.value}
                        disabled={!form.watch('province') || (hasShippingAddress && !user.shippingAddress?.district)}
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
              )}

              {(!hasShippingAddress || (hasShippingAddress && user.shippingAddress?.ward)) && (
                <FormField
                  control={form.control}
                  name='ward'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phường/Xã</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value)
                          handleWardChange(value)
                        }}
                        value={field.value}
                        disabled={!form.watch('district') || (hasShippingAddress && !user.shippingAddress?.ward)}
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
              )}

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

          <div className='flex justify-end'>
            <Button type='submit' disabled={isPending}>
              Cập nhật
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  )
}

export default UserProfileForm
