import { Outlet } from 'react-router-dom'

import { SidebarProvider } from '../ui/sidebar'

import Footer from '../shared/Footer'
import Header from '../shared/Header'
import MobileSidebar from '../shared/MobileSidebar'
import { UserProvider } from '@/contexts/UserContext'

const MainLayout = () => {
  return (
    <UserProvider>
      <SidebarProvider defaultOpen={false}>
        <MobileSidebar />

        <div className='min-h-screen w-full bg-background'>
          <Header />

          <Outlet />

          <Footer />
        </div>
      </SidebarProvider>
    </UserProvider>
  )
}

export default MainLayout
