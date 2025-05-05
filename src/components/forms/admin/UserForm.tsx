import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Heading from '@/components/shared/admin/Heading'
import AlertModal from '@/components/modals/admin/AlertModal'

import { User } from '@/types'
import { useCreateUser, useDeleteUser, useUpdateUser } from '@/apis/userApi'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAddressData } from '@/apis/locationApi'

const formSchema = z.object({
  name: z.string(),
  email: z.string().email('Địa chỉ email không hợp lệ'),
  password: z.string(),
  phoneNumber: z.string().optional(),
  province: z.string(),
  provinceName: z.string(),
  district: z.string(),
  districtName: z.string(),
  ward: z.string(),
  wardName: z.string(),
  address: z.string(),
  isGoogleAccount: z.boolean(),
  isActive: z.boolean(),
  isAdmin: z.boolean()
})

export type UserFormValues = z.infer<typeof formSchema>

interface UserFormProps {
  initialData?: User
}

const UserForm: React.FC<UserFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false)
  const { provinces, districts, wards, fetchProvinces, fetchDistricts, fetchWards } = useAddressData()
  const { createUser, isPending: isCreating } = useCreateUser()
  const { updateUser, isPending: isUpdating } = useUpdateUser(initialData?._id)
  const { deleteUser, isPending: isDeleting } = useDeleteUser(initialData?._id)
  const navigate = useNavigate()

  const form = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      email: initialData?.email || '',
      password: '',
      phoneNumber: initialData?.phoneNumber || '',
      province: initialData?.shippingAddress?.province || '',
      provinceName: initialData?.shippingAddress?.provinceName || '',
      district: initialData?.shippingAddress?.district || '',
      districtName: initialData?.shippingAddress?.districtName || '',
      ward: initialData?.shippingAddress?.ward || '',
      wardName: initialData?.shippingAddress?.wardName || '',
      address: initialData?.shippingAddress?.address || '',
      isGoogleAccount: initialData?.isGoogleAccount || false,
      isActive: initialData?.isActive || true,
      isAdmin: initialData?.isAdmin || false
    }
  })

  const onSubmit = async (values: UserFormValues) => {
    if (initialData) {
      await updateUser(values)
    } else {
      await createUser(values)
    }

    navigate('/admin/users')
  }

  const onDelete = async () => {
    await deleteUser()

    setOpen(false)

    navigate('/admin/users')
  }

  useEffect(() => {
    fetchProvinces()
  }, [])

  useEffect(() => {
    if (initialData?.shippingAddress?.province) {
      fetchDistricts(initialData.shippingAddress.province)
    }

    if (initialData?.shippingAddress?.district) {
      fetchWards(initialData.shippingAddress.district)
    }
  }, [initialData?.shippingAddress])

  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={isDeleting} />

      <div className='flex items-center justify-between'>
        <Heading
          title={initialData ? 'Chỉnh sửa người dùng' : 'Tạo người dùng'}
          description={initialData ? 'Chỉnh sửa thông tin người dùng' : 'Thêm người dùng mới'}
        />

        {initialData && (
          <Button disabled={isDeleting} variant='destructive' size='sm' onClick={() => setOpen(true)}>
            <Trash className='h-4 w-4' />
          </Button>
        )}
      </div>

      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Base User Information */}
            <div>
              <h2 className='text-xl font-semibold mb-4'>Thông tin cơ bản</h2>

              <div className='space-y-4'>
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
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type='email' className='w-full' required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mật khẩu</FormLabel>
                      <FormControl>
                        <Input
                          disabled={initialData?.isGoogleAccount}
                          {...field}
                          type='password'
                          className='w-full'
                          required={!initialData}
                        />
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
                        <Input {...field} className='w-full' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* User Address */}
            <div>
              <h2 className='text-xl font-semibold mb-4'>Thông tin nhận hàng</h2>

              <div className='space-y-4'>
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

                {districts?.length > 0 || initialData?.shippingAddress?.district ? (
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

                {wards?.length > 0 || initialData?.shippingAddress?.ward ? (
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
            </div>
          </div>

          {/* Other User Information */}
          <div>
            <h2 className='text-xl font-semibold mb-4'>Các thông tin khác</h2>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <FormField
                control={form.control}
                name='isGoogleAccount'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                    <FormControl>
                      <Checkbox disabled checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel>Tài khoản Google</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='isActive'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel>Kích hoạt tài khoản</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='isAdmin'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel>Quyền Admin</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className='flex justify-end gap-4'>
            <Button
              disabled={isCreating || isUpdating || isDeleting}
              type='submit'
              className='bg-[#1570EF] hover:bg-[#1f4375]'
            >
              {initialData ? 'Cập nhật' : 'Thêm người dùng'}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default UserForm
