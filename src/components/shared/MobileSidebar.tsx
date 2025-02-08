import { Link, useLocation } from 'react-router-dom'

import { cn } from '@/lib/utils'

import { Sidebar, SidebarContent, SidebarHeader, useSidebar } from '../ui/sidebar'
import { Input } from '../ui/input'
import { Heart, LogOut, Search, ShoppingCart, User2, X } from 'lucide-react'

import { useUserContext } from '@/contexts/UserContext'
import { useGetCart } from '@/apis/cartApi'
import { useLogout } from '@/apis/userApi'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase/firebase'

const navigateItems = [
  { href: '/', label: 'Trang chủ' },
  { href: '/shop', label: 'Cửa hàng' },
  { href: '/about', label: 'Về chúng tôi' },
  { href: '/contact', label: 'Liên hệ' }
]

const MobileSidebar = () => {
  const { currentUser } = useUserContext()
  const { cart } = useGetCart(currentUser?._id)
  const { toggleSidebar } = useSidebar()
  const { logout } = useLogout()
  const location = useLocation()
  const pathname = location.pathname

  const handleLogout = async () => {
    await signOut(auth)

    await logout()

    window.location.href = '/login'
  }

  return (
    <Sidebar>
      <SidebarHeader className='px-7 pt-5 pb-3'>
        <div className='relative'>
          <Link to='#' className='flex items-center justify-center'>
            <img
              src='https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Logo-retina.png'
              alt='logo'
              width={150}
              height={52}
              loading='lazy'
            />
          </Link>

          <X className='absolute right-[-16px] top-[-10px] hover:cursor-pointer' onClick={toggleSidebar} />
        </div>
      </SidebarHeader>

      <div className='relative px-7 mb-3'>
        <Input type='search' placeholder='Tìm kiếm sản phẩm.' className='pl-2' />
        <Search className='absolute right-10 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
      </div>

      <SidebarContent className='px-7 pb-5'>
        <div className='flex flex-col pt-2'>
          {navigateItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'py-2.5 px-4 text-sm hover:bg-accent',
                pathname === item.href ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50' : ''
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className='flex flex-col'>
          {currentUser ? (
            <>
              <Link
                to='/account'
                className={cn(
                  'flex items-center gap-2 py-2.5 px-4 text-sm hover:bg-accent',
                  pathname === '/account' ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50' : ''
                )}
              >
                <User2 className='h-4 w-4' />
                Tài khoản
              </Link>

              <Link
                to='/wishlist'
                className={cn(
                  'flex items-center gap-2 py-2.5 px-4 text-sm hover:bg-accent',
                  pathname === '/wishlist' ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50' : ''
                )}
              >
                <Heart className='h-4 w-4' />
                Yêu thích
                <span className='ml-auto'>({currentUser.wishlistItems.length || 0})</span>
              </Link>

              <Link
                to='/cart'
                className={cn(
                  'flex items-center gap-2 py-2.5 px-4 text-sm hover:bg-accent',
                  pathname === '/cart' ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50' : ''
                )}
              >
                <ShoppingCart className='h-4 w-4' />
                Giỏ hàng
                <span className='ml-auto'>({cart?.cartItems.length || 0})</span>
              </Link>

              <button onClick={handleLogout} className='flex items-center gap-2 py-2.5 px-4 text-sm hover:bg-accent'>
                <LogOut className='h-4 w-4' />
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link
                to='/login'
                className={cn(
                  'flex items-center gap-2 py-2.5 px-4 text-sm hover:bg-accent',
                  pathname === '/login' ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50' : ''
                )}
              >
                <User2 className='h-4 w-4' />
                Đăng nhập
              </Link>
            </>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  )
}

export default MobileSidebar
