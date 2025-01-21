import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { User2, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import GoogleLogin from '@/components/shared/GoogleLogin'

import { useSignUp } from '@/apis/userApi'

const formSchema = z.object({
  name: z.string().min(3, {
    message: 'Name must be at least 3 characters.'
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.'
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.'
  })
})

export type SignUpFormValues = z.infer<typeof formSchema>

const SignUp = () => {
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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo') || '{}')

    if (user && Object.keys(user).length > 0) {
      navigate('/')
    }
  }, [navigate])

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
          Sign Up
        </h1>
      </div>

      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-md mx-auto'>
          <div className='bg-white p-8'>
            <h2 className='text-xl font-medium mb-6'>SIGN UP</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem className='space-y-2'>
                      <FormLabel className='block text-sm'>
                        Name<span className='text-red-500'>*</span>
                      </FormLabel>

                      <FormControl>
                        <Input placeholder='Enter your name' {...field} className='rounded-none' />
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
                        <Input placeholder='Enter your email' {...field} className='rounded-none' />
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
                        Password<span className='text-red-500'>*</span>
                      </FormLabel>

                      <FormControl>
                        <div className='relative'>
                          <Input
                            placeholder='Enter your password'
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
                  SIGN UP
                </Button>

                <GoogleLogin isParentLoading={isPending} />

                <div className='text-center'>
                  <Link to='/login' className='text-sm text-zinc-600 hover:underline'>
                    Already have an account? Login
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
