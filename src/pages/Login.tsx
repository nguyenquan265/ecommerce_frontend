import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { User2, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import GoogleLogin from '@/components/shared/GoogleLogin'

import { useLogin } from '@/apis/userApi'
import { useUserContext } from '@/contexts/UserContext'

const formSchema = z.object({
  email: z.string().email({
    message: 'Vui lòng nhập địa chỉ email hợp lệ.'
  }),
  password: z.string().min(6, {
    message: 'Mật khẩu phải chứa ít nhất 6 ký tự.'
  })
})

export type LoginFormValues = z.infer<typeof formSchema>

const Login = () => {
  const { currentUser, isUserLoading } = useUserContext()
  const [showPassword, setShowPassword] = useState(false)
  const { login, isPending } = useLogin()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  if (!isUserLoading && currentUser) {
    return <Navigate to='/' />
  }

  const onSubmit = async (values: LoginFormValues) => {
    await login(values)

    form.reset()

    navigate('/')
  }

  return (
    <div className='bg-background'>
      <div className='bg-zinc-50 py-6'>
        <h1 className='container mx-auto px-4 text-center text-2xl font-medium flex items-center justify-center gap-2'>
          <User2 className='w-5 h-5' />
          Đăng Nhập
        </h1>
      </div>

      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-md mx-auto'>
          <div className='bg-white p-8'>
            <h2 className='text-xl font-medium mb-6'>Đăng Nhập</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem className='space-y-2'>
                      <FormLabel className='block text-sm'>
                        Email<span className='text-red-500'>*</span>
                      </FormLabel>

                      <FormControl>
                        <Input placeholder='Nhập email của bạn' {...field} className='rounded-none' />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem className='space-y-2'>
                      <FormLabel className='block text-sm'>
                        Mật khẩu<span className='text-red-500'>*</span>
                      </FormLabel>

                      <FormControl>
                        <div className='relative'>
                          <Input
                            placeholder='Nhập mật khẩu của bạn'
                            type={showPassword ? 'text' : 'password'}
                            {...field}
                            className='rounded-none pr-10'
                          />
                          <Button
                            type='button'
                            variant='ghost'
                            size='icon'
                            className='absolute right-0 top-0 h-full hover:bg-transparent'
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className='h-4 w-4 text-muted-foreground' />
                            ) : (
                              <Eye className='h-4 w-4 text-muted-foreground' />
                            )}
                          </Button>
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type='submit' disabled={isPending} className='w-full bg-zinc-800 hover:bg-zinc-900'>
                  Đăng Nhập
                </Button>

                <GoogleLogin isParentLoading={isPending} />

                <div className='text-center'>
                  <Link to='/forgot-password' className='text-sm text-zinc-600 hover:underline'>
                    Quên mật khẩu?
                  </Link>
                </div>

                <div className='text-center'>
                  <Link to='/sign-up' className='text-sm text-zinc-600 hover:underline'>
                    Không có tài khoản? Đăng ký
                  </Link>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
