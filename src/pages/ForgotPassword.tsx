import { useState } from 'react'

import { User2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: ''
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
          Forgot Password
        </h1>
      </div>

      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-md mx-auto'>
          {/* Login Form */}
          <div className='bg-white p-8'>
            <h2 className='text-xl font-medium mb-6'>FORGOT PASSWORD</h2>
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

              <Button type='submit' className='w-full bg-zinc-800 hover:bg-zinc-900'>
                SUBMIT
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
