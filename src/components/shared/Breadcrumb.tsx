import { Link, useNavigate } from 'react-router-dom'

import { ChevronLeft } from 'lucide-react'

interface BreadcrumbProps {
  text: string
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ text }) => {
  const navigate = useNavigate()

  return (
    <div className='border-b mb-4'>
      <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
        <div className='flex items-center gap-2 text-sm text-muted-foreground'>
          <Link to='/' className='hover:text-foreground'>
            Trang chủ
          </Link>
          <span>/</span>
          <span className='capitalize'>{text}</span>
        </div>

        <p
          onClick={() => navigate(-1)}
          className='hover:cursor-pointer text-sm text-muted-foreground hover:text-foreground flex items-center gap-1'
        >
          <ChevronLeft className='h-4 w-4' />
          Quay lại trang trước
        </p>
      </div>
    </div>
  )
}

export default Breadcrumb
