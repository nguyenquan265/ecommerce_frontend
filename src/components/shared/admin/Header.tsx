import { Bell } from 'lucide-react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { useUserContext } from '@/contexts/UserContext'

const Header = () => {
  const { currentUser } = useUserContext()

  return (
    <header className='h-16 border-b bg-white lg:fixed lg:top-0 lg:left-64 lg:right-0 z-50'>
      <div className='flex h-full items-center justify-between lg:justify-end border-b px-4'>
        <SidebarTrigger className='lg:hidden' />

        <div className='flex items-center gap-4'>
          <button className='rounded-full p-2 hover:bg-gray-100'>
            <Bell className='h-5 w-5' />
          </button>

          <Avatar>
            <AvatarImage src={currentUser?.photoUrl} referrerPolicy='no-referrer' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}

export default Header
