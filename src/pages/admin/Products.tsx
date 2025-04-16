import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import lodash from 'lodash'

import { ChevronDown, Filter } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import CellAction from '@/components/shared/admin/CellAction'
import AdminPagination from '@/components/shared/admin/AdminPagination'

import { useGetAllAdminProducts } from '@/apis/productApi'
import { useGetAllCategories } from '@/apis/categoryApi'

import { SortOption, cn, currencyFormatter, getSortLabel } from '@/lib/utils'

const sortOptions: SortOption[] = ['desc', 'asc', 'a-z', 'z-a', 'price-asc', 'price-desc']

const Inventory = () => {
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState<SortOption>('desc')
  const [searchString, setSearchString] = useState('')
  const navigate = useNavigate()
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search])
  const selectedCategory = queryParams.get('category') || 'all'
  const {
    products,
    pagination,
    isLoading: isProductsLoading
  } = useGetAllAdminProducts({
    page,
    limit: 10,
    searchString,
    sortBy,
    categorySlug: selectedCategory
  })
  const { categories, isLoading: isCategoriesLoading } = useGetAllCategories()

  const handleSearch = lodash.debounce((value: string) => {
    setSearchString(value)
    setPage(1)
  }, 800)

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value)
  }

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(location.search)
    params.set('category', category)
    params.set('page', '1')
    navigate(`?${params.toString()}`, { replace: true })
  }

  return (
    <div className='space-y-6'>
      <div className='space-y-4'>
        <div className='flex flex-wrap items-center justify-between gap-2'>
          <h2 className='text-2xl font-semibold'>Sản phẩm ({pagination?.totalProducts || 0})</h2>

          <div className='flex flex-wrap items-center gap-2'>
            <Link to='/admin/products/new'>
              <Button className='bg-[#1570EF] hover:bg-[#1f4375]'>Thêm sản phẩm</Button>
            </Link>

            <Select
              disabled={isCategoriesLoading || isProductsLoading}
              value={selectedCategory}
              defaultValue='all'
              onValueChange={(val: string) => handleCategoryChange(val)}
            >
              <SelectTrigger className='w-[240px]'>
                <SelectValue placeholder='Lọc theo danh mục' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Danh mục: tất cả</SelectItem>
                {categories?.map((category) => (
                  <SelectItem key={category._id} value={category.slug}>
                    {`Danh mục: ` + category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <DropdownMenu>
              <DropdownMenuTrigger asChild disabled={isCategoriesLoading || isProductsLoading}>
                <Button variant='outline'>
                  <Filter className='mr-2 h-4 w-4' />
                  <p className='font-normal'>Sắp Xếp</p>
                  <ChevronDown className='ml-2 h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {sortOptions.map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => setSortBy(option)}
                    className={sortBy === option ? 'bg-accent' : ''}
                  >
                    {getSortLabel(option)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className='flex items-center gap-4'>
          <div className='md:w-96 max-w-96'>
            <Input placeholder='Tìm kiếm sản phẩm' className='w-full' onChange={onSearchChange} />
          </div>
        </div>

        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tiêu đề sản phẩm</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Kích cỡ</TableHead>
                <TableHead>Giá</TableHead>
                <TableHead>Giảm giá</TableHead>
                <TableHead>Giá sau khi giảm</TableHead>
                <TableHead>Đã bán</TableHead>
                <TableHead>Tồn kho</TableHead>
                <TableHead>Tình trạng</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isProductsLoading && isCategoriesLoading && (
                <TableRow>
                  <TableCell colSpan={9} className='h-24 text-center'>
                    Đang tải...
                  </TableCell>
                </TableRow>
              )}

              {products?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className='h-24 text-center'>
                    Không tìm thấy sản phẩm nào
                  </TableCell>
                </TableRow>
              )}

              {products?.map((product) => (
                <TableRow key={product._id} className='hover:bg-muted/50'>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.slug}</TableCell>
                  <TableCell>{product.category.name}</TableCell>
                  <TableCell>{product.size}</TableCell>
                  <TableCell>{currencyFormatter(product.price)}</TableCell>
                  <TableCell>{product.priceDiscount ? `${product.priceDiscount}%` : '-'}</TableCell>
                  <TableCell>
                    {product.priceDiscount
                      ? currencyFormatter(product.price - (product.price * product.priceDiscount) / 100)
                      : '-'}
                  </TableCell>
                  <TableCell>{product.quantitySold}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>
                    <Badge
                      variant='outline'
                      className={cn(
                        'font-normal',
                        product.isDeleted
                          ? 'border-red-200 bg-red-100 text-red-800 hover:bg-red-100/80'
                          : 'border-green-200 bg-green-100 text-green-800 hover:bg-green-100/80'
                      )}
                    >
                      {product.isDeleted ? 'Đã xóa' : 'Tồn tại'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <CellAction data={product} type='product' />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <AdminPagination
          page={page}
          setPage={setPage}
          pagination={pagination}
          isLoading={isProductsLoading && isCategoriesLoading}
        />
      </div>
    </div>
  )
}

export default Inventory
