import { useLocation } from 'react-router-dom'

import {
  Pagination as PaginationProvider,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'

interface PaginationProps {
  totalPages: number
  currentPage: number
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage }) => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const getPaginationLink = (page: number) => {
    queryParams.set('page', page.toString())
    return `?${queryParams.toString()}`
  }

  return (
    <PaginationProvider>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious to={getPaginationLink(currentPage > 1 ? currentPage - 1 : 1)} />
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, i) => (
          <PaginationItem key={i}>
            <PaginationLink to={getPaginationLink(i + 1)} isActive={currentPage === i + 1}>
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext to={getPaginationLink(currentPage < totalPages ? currentPage + 1 : totalPages)} />
        </PaginationItem>
      </PaginationContent>
    </PaginationProvider>
  )
}

export default Pagination
