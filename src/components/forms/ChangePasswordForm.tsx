import { useState } from 'react'
import { Link } from 'react-router-dom'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import type { User } from '@/types'
import { useChangeUserPassword } from '@/apis/userApi'

interface ChangePasswordFormProps {
  user: User
}

const formSchema = z
  .object({
    currentPassword: z.string().min(1, 'Mật khẩu hiện tại là bắt buộc'),
    newPassword: z.string().min(8, 'Mật khẩu mới phải có ít nhất 8 ký tự'),
    confirmPassword: z.string().min(1, 'Xác nhận mật khẩu là bắt buộc')
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Mật khẩu không khớp',
    path: ['confirmPassword']
  })

type ChangePasswordFormValues = z.infer<typeof formSchema>

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ user }) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { changeUserPassword, isPending } = useChangeUserPassword()

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  })

  const onSubmit = async (values: ChangePasswordFormValues) => {
    console.log(values)

    await changeUserPassword(values)
  }

  if (user.isGoogleAccount) {
    return (
      <Card className='max-w-3xl mx-auto p-6'>
        <div className='space-y-4'>
          <h1 className='text-xl font-semibold'>Tài khoản Google</h1>
          <p className='text-sm text-muted-foreground'>
            Bạn đang sử dụng tài khoản Google để đăng nhập. Để thay đổi mật khẩu, vui lòng truy cập trang quản lý tài
            khoản Google của bạn.
          </p>
          <Button asChild>
            <Link to='https://myaccount.google.com/security' target='_blank' rel='noopener noreferrer'>
              Đi đến Tài khoản Google
            </Link>
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className='max-w-3xl mx-auto p-6'>
      <div className='space-y-6'>
        <div>
          <h1 className='text-xl font-semibold'>Đổi mật khẩu</h1>
          <p className='text-sm text-muted-foreground'>
            Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='currentPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu hiện tại</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input type={showCurrentPassword ? 'text' : 'password'} className='pr-10' {...field} />
                      <button
                        type='button'
                        className='absolute right-3 top-1/2 -translate-y-1/2'
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? (
                          <EyeOffIcon className='h-4 w-4 text-gray-500' />
                        ) : (
                          <EyeIcon className='h-4 w-4 text-gray-500' />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='newPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu mới</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input type={showNewPassword ? 'text' : 'password'} className='pr-10' {...field} />
                      <button
                        type='button'
                        className='absolute right-3 top-1/2 -translate-y-1/2'
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <EyeOffIcon className='h-4 w-4 text-gray-500' />
                        ) : (
                          <EyeIcon className='h-4 w-4 text-gray-500' />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nhập lại mật khẩu mới</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input type={showConfirmPassword ? 'text' : 'password'} className='pr-10' {...field} />
                      <button
                        type='button'
                        className='absolute right-3 top-1/2 -translate-y-1/2'
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOffIcon className='h-4 w-4 text-gray-500' />
                        ) : (
                          <EyeIcon className='h-4 w-4 text-gray-500' />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex justify-end'>
              <Button type='submit' disabled={isPending}>
                Xác nhận
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Card>
  )
}

export default ChangePasswordForm
