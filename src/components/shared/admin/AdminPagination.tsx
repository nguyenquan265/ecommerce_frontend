import React from 'react'

import { Button } from '@/components/ui/button'

interface AdminPaginationProps {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  pagination?: {
    currentPage: number
    totalPages: number
  }
  isLoading: boolean
}

const AdminPagination: React.FC<AdminPaginationProps> = ({ page, setPage, pagination, isLoading }) => {
  return (
    <div className='flex items-center justify-between'>
      <Button variant='outline' disabled={page == 1 || isLoading} onClick={() => setPage((prev) => prev - 1)}>
        Trước
      </Button>
      <span className='text-sm text-gray-600'>
        Trang {pagination?.currentPage || 1} trên {pagination?.totalPages || 1}
      </span>
      <Button
        variant='outline'
        disabled={page == pagination?.totalPages || isLoading}
        onClick={() => setPage((prev) => prev + 1)}
      >
        Sau
      </Button>
    </div>
  )
}

export default AdminPagination
