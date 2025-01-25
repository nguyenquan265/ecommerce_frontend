import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Grid, List, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '../ui/input'
import ProductCard from '@/components/shared/ProductCard'
import SkeletonProductCard from '../skeletons/SkeletonProductCard'
import Pagination from './Pagination'

import { useGetAllProducts } from '@/apis/productApi'
import { SortOption, getSortLabel } from '@/lib/utils'
import { useGetAllCategories } from '@/apis/categoryApi'
import useDebounce from '@/hooks/useDebounce'

const sortOptions: SortOption[] = ['desc', 'asc', 'price-desc', 'price-asc', 'a-z', 'z-a']

const ShopProducts = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [totalPages, setTotalPages] = useState(1)
  const [sortBy, setSortBy] = useState<SortOption>('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const location = useLocation()
  const navigate = useNavigate()
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search])
  const currentPage = parseInt(queryParams.get('page') || '1', 10)
  const selectedCategory = queryParams.get('category') || 'all'

  const {
    products,
    pagination,
    isLoading: isProductsLoading
  } = useGetAllProducts({
    page: currentPage,
    limit: 12,
    searchString: debouncedSearchTerm,
    sortBy,
    categorySlug: selectedCategory
  })
  const { categories, isLoading: isCategoriesLoading } = useGetAllCategories()

  useEffect(() => {
    if (pagination?.totalPages) {
      setTotalPages(pagination.totalPages)
      localStorage.setItem('totalPages', JSON.stringify(pagination.totalPages))
    } else {
      const storedPages = localStorage.getItem('totalPages')
      if (storedPages) setTotalPages(Number(storedPages))
    }
  }, [pagination])

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(location.search)
    params.set('category', category)
    params.set('page', '1')
    navigate(`?${params.toString()}`, { replace: true })
  }

  return (
    <>
      <div className='container mx-auto px-4 py-8'>
        <div className='flex flex-wrap items-center justify-between gap-4 mb-8'>
          <div className='flex items-center flex-wrap gap-4'>
            <div className='flex gap-2 items-center'>
              <p className='font-bold'>Sắp xếp:</p>
              <Select value={sortBy} defaultValue='desc' onValueChange={(val: SortOption) => setSortBy(val)}>
                <SelectTrigger className='w-[200px]'>
                  <SelectValue placeholder='Sắp xếp theo' />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {getSortLabel(option)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='flex gap-2 items-center'>
              <p className='font-bold'>Danh mục:</p>
              <Select
                value={selectedCategory}
                defaultValue='all'
                onValueChange={(val: string) => handleCategoryChange(val)}
              >
                <SelectTrigger className='w-[200px]'>
                  <SelectValue placeholder='Lọc theo danh mục' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>Tất cả</SelectItem>
                  {categories?.map((category) => (
                    <SelectItem key={category._id} value={category.slug}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className='flex items-center flex-wrap gap-4'>
            <div className='relative w-full sm:w-auto'>
              <Input
                type='text'
                placeholder='Tìm kiếm sản phẩm...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full sm:w-[300px] pr-10'
              />
              <Search className='absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
            </div>

            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size='icon'
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-zinc-800 hover:bg-zinc-900' : ''}
            >
              <Grid className='h-4 w-4' />
            </Button>

            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size='icon'
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-zinc-800 hover:bg-zinc-900' : ''}
            >
              <List className='h-4 w-4' />
            </Button>
          </div>
        </div>

        {/* Products */}
        <div
          className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'}`}
        >
          {isProductsLoading || isCategoriesLoading
            ? [...Array(12)].map((_, index) => <SkeletonProductCard key={index} viewMode={viewMode} />)
            : products?.map((product) => <ProductCard key={product._id} product={product} viewMode={viewMode} />)}
        </div>
      </div>

      {/* Pagination */}
      <div className='py-8'>
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </>
  )
}

export default ShopProducts
