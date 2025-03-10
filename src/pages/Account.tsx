import { User, Lock, ShoppingBag, LogOut, List } from 'lucide-react'
import { Button } from '@/components/ui/button'

import Breadcrumb from '@/components/shared/Breadcrumb'
import AccountSkeleton from '@/components/skeletons/AccountSkeleton'

import { useLogout } from '@/apis/userApi'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase/firebase'
import { useUserContext } from '@/contexts/UserContext'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'

const Account = () => {
  const { currentUser, isUserLoading } = useUserContext()
  const { logout } = useLogout()
  const location = useLocation()
  const isActiveLink = (path: string) => {
    return location.pathname === `/account${path}` ? 'bg-primary/5 text-primary' : ''
  }

  if (!currentUser || isUserLoading) {
    return <AccountSkeleton />
  }

  const handleLogout = async () => {
    await signOut(auth)
    await logout()
    window.location.href = '/login'
  }

  return (
    <div className='min-h-screen bg-background'>
      <Breadcrumb text='tài khoản' />

      <div className='container mx-auto py-8 px-4'>
        <div className='grid grid-cols-1 md:grid-cols-[240px_1fr] gap-4'>
          {/* Sidebar */}
          <Card className={cn('bg-white p-4', currentUser.isAdmin ? 'h-[318px]' : 'h-[281px]')}>
            {/* Main user detail */}
            <div className='flex items-center gap-3 mb-6 pb-4 border-b'>
              <div className='relative w-10 h-10'>
                <img src={currentUser.photoUrl} alt='Avatar' className='rounded-full object-cover w-full h-full' />
              </div>
              <div>
                <h2 className='font-medium text-sm'>{currentUser.name}</h2>
                <p className='text-xs text-muted-foreground'>Chỉnh sửa thông tin</p>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className='flex flex-col space-y-1'>
              <Link
                to='/account'
                className={cn('flex items-center px-3 py-2 text-sm rounded-md hover:bg-primary/5', isActiveLink(''))}
              >
                <User size={16} className='mr-2' />
                Tài khoản của tôi
              </Link>
              <Link
                to='/account/password'
                className={cn(
                  'flex items-center px-3 py-2 text-sm rounded-md hover:bg-primary/5',
                  isActiveLink('/password')
                )}
              >
                <Lock size={16} className='mr-2' />
                Đổi mật khẩu
              </Link>
              <Link
                to='/account/orders'
                className={cn(
                  'flex items-center px-3 py-2 text-sm rounded-md hover:bg-primary/5',
                  isActiveLink('/orders')
                )}
              >
                <ShoppingBag size={16} className='mr-2' />
                Đơn mua
              </Link>
              {currentUser.isAdmin && (
                <Link to='/admin' className='flex items-center px-3 py-2 text-sm rounded-md hover:bg-primary/5'>
                  <List size={16} className='mr-2' />
                  Quản lý cửa hàng
                </Link>
              )}
            </nav>

            <Button
              variant='ghost'
              onClick={handleLogout}
              className='w-full justify-start text-left mt-4 hover:bg-destructive/10 hover:text-destructive'
            >
              <LogOut size={16} className='mr-2' />
              Đăng xuất
            </Button>
          </Card>

          <div className='bg-white'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account
