import { Outlet } from 'react-router-dom'

import { SidebarProvider } from '../ui/sidebar'

import Footer from '../shared/Footer'
import Header from '../shared/Header'
import MobileSidebar from '../shared/MobileSidebar'

const MainLayout = () => {
  return (
    <SidebarProvider defaultOpen={false}>
      <MobileSidebar />

      <div className='min-h-screen w-full bg-background'>
        <Header />

        <Outlet />

        <Footer />
      </div>
    </SidebarProvider>
  )
}

export default MainLayout
