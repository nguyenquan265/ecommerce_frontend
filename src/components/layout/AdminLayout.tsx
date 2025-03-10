import { Outlet } from 'react-router-dom'

import Header from '../shared/admin/Header'
import Sidebar from '../shared/admin/Sidebar'
import ProtectedRoute from './ProtectedRoute'

import { SidebarProvider } from '../ui/sidebar'
import { UserProvider } from '@/contexts/UserContext'

const AdminLayout = () => {
  return (
    <UserProvider>
      <ProtectedRoute type='private'>
        <SidebarProvider defaultOpen={true}>
          <Sidebar />

          <main className='w-full'>
            <Header />

            <div className='px-6 py-4 lg:pt-20 overflow-y-auto'>
              <Outlet />
            </div>
          </main>
        </SidebarProvider>
      </ProtectedRoute>
    </UserProvider>
  )
}

export default AdminLayout
