import { Link, useLocation } from 'react-router-dom'

import { cn } from '@/lib/utils'

import { Sidebar, SidebarContent, SidebarHeader, useSidebar } from '../ui/sidebar'
import { Input } from '../ui/input'
import { Heart, RefreshCw, Search, ShoppingCart, User2, X } from 'lucide-react'

const navigateItems = [
  { href: '/', label: 'Home' },
  { href: '/elements', label: 'Elements' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About us' },
  { href: '/contact', label: 'Contact us' }
]

const userItems = [
  { href: '/account', label: 'Account', icon: User2 },
  { href: '/cart', label: 'Cart $0.00', icon: ShoppingCart },
  { href: '/wishlist', label: 'Wishlist', icon: Heart },
  { href: '/compare', label: 'Compare', icon: RefreshCw }
]

const MobileSidebar = () => {
  const { toggleSidebar } = useSidebar()

  const location = useLocation()
  const pathname = location.pathname

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
        <Input type='search' placeholder='Search for products.' className='pl-2' />
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
          {userItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center gap-2 py-2.5 px-4 text-sm hover:bg-accent',
                pathname === item.href ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50' : ''
              )}
            >
              <item.icon className='h-4 w-4' />
              {item.label}
            </Link>
          ))}
        </div>
      </SidebarContent>
    </Sidebar>
  )
}

export default MobileSidebar
