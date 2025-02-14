import { Navigate, useNavigate, useParams } from 'react-router-dom'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { User2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { useUserContext } from '@/contexts/UserContext'
import { useResetPassword } from '@/apis/userApi'

const formSchema = z
  .object({
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    confirmPassword: z.string().min(6, 'Xác nhận mật khẩu phải có ít nhất 6 ký tự'),
    token: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu không khớp',
    path: ['confirmPassword']
  })

export type ResetPasswordFormValues = z.infer<typeof formSchema>

const ResetPassword = () => {
  const { token } = useParams()
  const { currentUser, isUserLoading } = useUserContext()
  const { resetPassword, isPending } = useResetPassword()
  const navigate = useNavigate()

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
      token: token || ''
    }
  })

  if (isUserLoading) {
    return <div className='min-h-screen bg-background'></div>
  }

  if (currentUser) {
    return <Navigate to='/' />
  }

  const onSubmit = async (values: ResetPasswordFormValues) => {
    await resetPassword(values)

    navigate('/login')
  }

  return (
    <div className='min-h-screen bg-background'>
      <div className='bg-zinc-50 py-6'>
        <h1 className='container mx-auto px-4 text-center text-2xl font-medium flex items-center justify-center gap-2'>
          <User2 className='w-5 h-5' />
          Đặt Lại Mật Khẩu
        </h1>
      </div>

      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-md mx-auto'>
          {/* Login Form */}
          <div className='bg-white p-8'>
            <h2 className='text-xl font-medium mb-6'>Nhập Mật Khẩu Mới</h2>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Mật khẩu mới<span className='text-red-500'>*</span>
                      </FormLabel>
                      <FormControl>
                        <Input type='password' {...field} className='rounded-none' />
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
                      <FormLabel>
                        Xác nhận mật khẩu<span className='text-red-500'>*</span>
                      </FormLabel>
                      <FormControl>
                        <Input type='password' {...field} className='rounded-none' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type='submit' className='w-full bg-zinc-800 hover:bg-zinc-900' disabled={isPending}>
                  Xác Nhận
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
