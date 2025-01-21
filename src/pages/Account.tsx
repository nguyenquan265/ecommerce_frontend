import { Navigate } from 'react-router-dom'

import { User, Lock, ShoppingBag, LogOut } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'

import AddressForm from '@/components/forms/AddressForm'
import ChangePasswordForm from '@/components/forms/ChangePasswordForm'
import Breadcrumb from '@/components/shared/Breadcrumb'

import { useGetCurrentUser, useLogout } from '@/apis/userApi'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase/firebase'

const Account = () => {
  const { user, isLoading } = useGetCurrentUser()

  if (isLoading) {
    return null
  }

  if (!user) {
    return <Navigate to='/login' />
  }

  const handleLogout = async () => {
    await signOut(auth)

    useLogout()

    window.location.href = '/login'
  }

  return (
    <div className='min-h-screen bg-background'>
      <Breadcrumb text='account' />

      <div className='container mx-auto py-8 px-4'>
        <Tabs defaultValue='account' className='w-full'>
          <div className='grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8'>
            {/* Sidebar */}
            <div className='bg-white rounded-lg shadow-sm p-4'>
              <div className='flex items-center gap-3 mb-6 pb-4 border-b'>
                <div className='relative w-10 h-10'>
                  <img
                    src={user.photoUrl || '/placeholder.svg'}
                    alt='Avatar'
                    className='rounded-full object-cover w-full h-full'
                  />
                </div>
                <div>
                  <h2 className='font-medium text-sm'>{user.name}</h2>
                  <p className='text-xs text-muted-foreground'>Chỉnh sửa thông tin</p>
                </div>
              </div>

              <TabsList className='flex flex-col items-start justify-start h-auto bg-transparent border-0 p-0'>
                <TabsTrigger
                  value='account'
                  className='w-full justify-start rounded-md mb-1 data-[state=active]:bg-primary/5'
                >
                  <User size={16} className='mr-2' />
                  Tài khoản của tôi
                </TabsTrigger>
                <TabsTrigger
                  value='password'
                  className='w-full justify-start rounded-md mb-1 data-[state=active]:bg-primary/5'
                >
                  <Lock size={16} className='mr-2' />
                  Đổi mật khẩu
                </TabsTrigger>
                <TabsTrigger
                  value='orders'
                  className='w-full justify-start rounded-md mb-1 data-[state=active]:bg-primary/5'
                >
                  <ShoppingBag size={16} className='mr-2' />
                  Đơn mua
                </TabsTrigger>
              </TabsList>

              <Button
                variant='ghost'
                onClick={handleLogout}
                disabled={isLoading}
                className='w-full justify-start text-left mt-4 hover:bg-destructive/10 hover:text-destructive'
              >
                <LogOut size={16} className='mr-2' />
                Đăng xuất
              </Button>
            </div>

            {/* Main Content */}
            <div className='bg-white rounded-lg shadow-sm'>
              <TabsContent value='account' className='m-0'>
                <div className='p-6'>
                  <AddressForm user={user} />
                </div>
              </TabsContent>
              <TabsContent value='password' className='m-0'>
                <div className='p-6'>
                  <ChangePasswordForm user={user} />
                </div>
              </TabsContent>
              <TabsContent value='orders' className='m-0'>
                <div className='p-6'>
                  <h1 className='text-xl font-semibold mb-6'>Đơn mua của bạn</h1>
                  <p className='text-muted-foreground'>Chức năng này đang được phát triển. Vui lòng quay lại sau.</p>
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

export default Account
