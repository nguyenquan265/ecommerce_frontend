import { Link, useLocation } from 'react-router-dom'

import { cn } from '@/lib/utils'

import { LogOut } from 'lucide-react'

import { signOut } from 'firebase/auth'
import { auth } from '@/firebase/firebase'
import { useLogout } from '@/apis/userApi'

import { adminNavItems } from '@/lib/constants'
import { Sidebar as ShadcnSidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

const Sidebar = () => {
  const { logout } = useLogout()
  const location = useLocation()
  const pathname = location.pathname

  const handleLogout = async () => {
    await signOut(auth)

    await logout()

    window.location.href = '/login'
  }

  return (
    <ShadcnSidebar>
      <SidebarHeader>
        <div className='p-2 h-12 flex items-center justify-center'>
          <h1 className='text-2xl font-serif'>PlusHouse</h1>
        </div>
      </SidebarHeader>

      <SidebarContent className='p-4'>
        <div className='flex flex-col gap-2'>
          {adminNavItems.map((item) => {
            let isActive: boolean

            if (item.href === '/admin') {
              isActive = pathname === item.href
            } else {
              isActive = pathname.includes(item.href)
            }

            if (item.href === '/') {
              isActive = false
            }

            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50',
                  isActive ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50' : ''
                )}
              >
                <item.icon className='h-4 w-4' />
                {item.title}
              </Link>
            )
          })}
        </div>
      </SidebarContent>

      <SidebarFooter className='p-4'>
        <div className='mt-auto flex flex-col gap-2'>
          <Separator />

          <Button
            variant='ghost'
            className='w-full justify-start px-3 py-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 hover:bg-white'
            onClick={handleLogout}
          >
            <LogOut className='h-4 w-4' />
            Đăng xuất
          </Button>
        </div>
      </SidebarFooter>
    </ShadcnSidebar>
  )
}

export default Sidebar
