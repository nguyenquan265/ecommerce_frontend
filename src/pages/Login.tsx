import { useState } from 'react'
import { Link } from 'react-router-dom'

import { User2, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log('Login attempt:', formData)
  }

  return (
    <div className='min-h-screen bg-background'>
      <div className='bg-zinc-50 py-6'>
        <h1 className='container mx-auto px-4 text-center text-2xl font-medium flex items-center justify-center gap-2'>
          <User2 className='w-5 h-5' />
          Login
        </h1>
      </div>

      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-md mx-auto'>
          {/* Login Form */}
          <div className='bg-white p-8'>
            <h2 className='text-xl font-medium mb-6'>LOGIN</h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='space-y-2'>
                <label htmlFor='email' className='block text-sm'>
                  Email<span className='text-red-500'>*</span>
                </label>
                <Input
                  id='email'
                  type='email'
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className='rounded-none'
                />
              </div>

              <div className='space-y-2'>
                <label htmlFor='password' className='block text-sm'>
                  Password <span className='text-red-500'>*</span>
                </label>
                <div className='relative'>
                  <Input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
              </div>

              <div className='flex items-center space-x-2'>
                <Checkbox
                  id='remember'
                  checked={formData.remember}
                  onCheckedChange={(checked) => setFormData({ ...formData, remember: checked as boolean })}
                />
                <label
                  htmlFor='remember'
                  className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  Remember me
                </label>
              </div>

              <Button type='submit' className='w-full bg-zinc-800 hover:bg-zinc-900'>
                LOG IN
              </Button>

              <div className='text-center'>
                <Link to='/forgot-password' className='text-sm text-zinc-600 hover:underline'>
                  Lost your password?
                </Link>
              </div>

              <div className='text-center'>
                <Link to='/sign-up' className='text-sm text-zinc-600 hover:underline'>
                  Don't have an account? Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
