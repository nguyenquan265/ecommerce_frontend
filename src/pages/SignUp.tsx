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

import { useSignUp } from '@/apis/userApi'
import { useUserContext } from '@/contexts/UserContext'

const formSchema = z.object({
  name: z.string().min(3, {
    message: 'Tên phải chứa ít nhất 3 ký tự.'
  }),
  email: z.string().email({
    message: 'Vui lòng nhập địa chỉ email hợp lệ.'
  }),
  password: z.string().min(6, {
    message: 'Mật khẩu phải chứa ít nhất 6 ký tự.'
  })
})

export type SignUpFormValues = z.infer<typeof formSchema>

const SignUp = () => {
  const { currentUser, isUserLoading } = useUserContext()
  const [showPassword, setShowPassword] = useState(false)
  const { signUp, isPending } = useSignUp()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  if (isUserLoading) {
    return <div className='min-h-screen bg-background'></div>
  }

  if (currentUser) {
    return <Navigate to='/' />
  }

  const onSubmit = async (values: SignUpFormValues) => {
    await signUp(values)

    form.reset()

    navigate('/')
  }

  return (
    <div className='bg-background'>
      <div className='bg-zinc-50 py-6'>
        <h1 className='container mx-auto px-4 text-center text-2xl font-medium flex items-center justify-center gap-2'>
          <User2 className='w-5 h-5' />
          Đăng Ký
        </h1>
      </div>

      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-md mx-auto'>
          <div className='bg-white p-8'>
            <h2 className='text-xl font-medium mb-6'>Đăng Ký</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem className='space-y-2'>
                      <FormLabel className='block text-sm'>
                        Tên<span className='text-red-500'>*</span>
                      </FormLabel>

                      <FormControl>
                        <Input placeholder='Nhập tên của bạn' {...field} className='rounded-none' />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                  Đăng Ký
                </Button>

                <GoogleLogin isParentLoading={isPending} />

                <div className='text-center'>
                  <Link to='/login' className='text-sm text-zinc-600 hover:underline'>
                    Đã có tài khoản? Đăng nhập
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

export default SignUp
