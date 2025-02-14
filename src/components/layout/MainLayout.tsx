import { Outlet } from 'react-router-dom'

import { SidebarProvider } from '../ui/sidebar'
import { UserProvider } from '@/contexts/UserContext'
import { PreviewProvider, usePreview } from '@/contexts/PreviewContext'

import Footer from '../shared/Footer'
import Header from '../shared/Header'
import MobileSidebar from '../shared/MobileSidebar'
import ScrollToTop from '../shared/ScrollToTop'
import PreviewModal from '../shared/PreviewModal'

const MainLayout = () => {
  return (
    <UserProvider>
      <PreviewProvider>
        <ScrollToTop />

        <SidebarProvider defaultOpen={false}>
          <MobileSidebar />

          <div className='min-h-screen w-full bg-background'>
            <Header />

            <Outlet />

            <Footer />
          </div>
        </SidebarProvider>

        <PreviewModalWrapper />
      </PreviewProvider>
    </UserProvider>
  )
}

const PreviewModalWrapper = () => {
  const { previewProduct, closePreview } = usePreview()

  return previewProduct ? (
    <PreviewModal product={previewProduct} isOpen={!!previewProduct} onClose={closePreview} />
  ) : null
}

export default MainLayout
