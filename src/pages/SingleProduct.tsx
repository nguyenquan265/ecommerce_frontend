import { Link } from 'react-router-dom'

import { ChevronLeft } from 'lucide-react'

const SingleProduct = () => {
  return (
    <div className='min-h-screen bg-background'>
      {/* Breadcrumb */}
      <div className='border-b'>
        <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
          <div className='flex items-center gap-2 text-sm text-muted-foreground'>
            <Link to='/' className='hover:text-foreground'>
              Home
            </Link>
            <span>/</span>
            <span>Product</span>
          </div>
          <Link to='/' className='text-sm text-muted-foreground hover:text-foreground flex items-center gap-1'>
            <ChevronLeft className='h-4 w-4' />
            Return to previous page
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct
