import { Navigate } from 'react-router-dom'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { User2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { useForgotPassword } from '@/apis/userApi'
import { useUserContext } from '@/contexts/UserContext'

const formSchema = z.object({
  email: z.string().email({
    message: 'Vui lòng nhập một địa chỉ email hợp lệ.'
  })
})

export type ForgotPasswordFormValues = z.infer<typeof formSchema>

const ForgotPassword = () => {
  const { currentUser, isUserLoading } = useUserContext()
  const { forgotPassword, isPending } = useForgotPassword()

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  })

  if (isUserLoading) {
    return <div className='min-h-screen bg-background'></div>
  }

  if (currentUser) {
    return <Navigate to='/' />
  }

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    await forgotPassword(values)
  }

  return (
    <div className='min-h-screen bg-background'>
      <div className='bg-zinc-50 py-6'>
        <h1 className='container mx-auto px-4 text-center text-2xl font-medium flex items-center justify-center gap-2'>
          <User2 className='w-5 h-5' />
          Quên Mật Khẩu
        </h1>
      </div>

      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-md mx-auto'>
          {/* Login Form */}
          <div className='bg-white p-8'>
            <h2 className='text-xl font-medium mb-6'>Hãy Nhập Email Của Bạn</h2>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Email<span className='text-red-500'>*</span>
                      </FormLabel>
                      <FormControl>
                        <Input type='email' {...field} className='rounded-none' />
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

export default ForgotPassword
