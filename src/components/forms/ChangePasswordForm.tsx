import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

import { User } from '@/types'

interface ChangePasswordFormProps {
  user: User
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ user }) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
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

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <label className='text-sm font-medium'>Mật khẩu hiện tại</label>
            <div className='relative'>
              <Input type={showCurrentPassword ? 'text' : 'password'} className='pr-10' />
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
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium'>Mật khẩu mới</label>
            <div className='relative'>
              <Input type={showNewPassword ? 'text' : 'password'} className='pr-10' />
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
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium'>Nhập lại mật khẩu mới</label>
            <div className='relative'>
              <Input type={showConfirmPassword ? 'text' : 'password'} className='pr-10' />
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
          </div>

          <div className='flex justify-end'>
            <Button type='submit'>Xác nhận</Button>
          </div>
        </form>
      </div>
    </Card>
  )
}

export default ChangePasswordForm
