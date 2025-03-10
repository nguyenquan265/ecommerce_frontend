import { useEffect, useState } from 'react'

import { ChevronDown, Filter } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import CellAction from '@/components/shared/admin/CellAction'
import CategoryModal from '@/components/modals/admin/CategoryModal'

import { Category } from '@/types'
import { useGetAllCategories } from '@/apis/categoryApi'
import { SortOption } from '@/lib/utils'

const Categories = () => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [sortedCategories, setSortedCategories] = useState<Category[]>([])
  const [sortOption, setSortOption] = useState<SortOption>('default')
  const { categories, isLoading } = useGetAllCategories()

  useEffect(() => {
    if (!dialogOpen) {
      setSelectedCategory(null)
    }
  }, [setDialogOpen])

  useEffect(() => {
    if (categories) {
      setSortedCategories([...categories])
    }
  }, [categories])

  const handleSort = (option: SortOption) => {
    setSortOption(option)
    let sorted: Category[]

    switch (option) {
      case 'asc':
        sorted = categories ? [...categories].sort((a, b) => a.name.localeCompare(b.name)) : []
        break
      case 'desc':
        sorted = categories ? [...categories].sort((a, b) => b.name.localeCompare(a.name)) : []
        break
      default:
        sorted = categories ? [...categories] : []
    }

    setSortedCategories(sorted)
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-semibold'>Danh Mục ({categories?.length})</h2>

        <div className='flex items-center gap-2'>
          <Button className='bg-[#1570EF] hover:bg-[#1f4375]' onClick={() => setDialogOpen(true)}>
            Thêm danh mục
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline'>
                <Filter className='mr-2 h-4 w-4' />
                Sắp Xếp
                <ChevronDown className='ml-2 h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => handleSort('default')}
                className={sortOption === 'default' ? 'bg-accent' : ''}
              >
                Mặc định
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort('asc')} className={sortOption === 'asc' ? 'bg-accent' : ''}>
                Sắp xếp theo thứ tự A-Z
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort('desc')} className={sortOption === 'desc' ? 'bg-accent' : ''}>
                Sắp xếp theo thứ tự Z-A
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên danh mục</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3} className='h-24 text-center'>
                  Đang tải...
                </TableCell>
              </TableRow>
            )}

            {categories?.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className='text-center'>
                  Không tìm thấy danh mục nào
                </TableCell>
              </TableRow>
            )}

            {sortedCategories.map((category) => (
              <TableRow key={category._id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.slug}</TableCell>
                <TableCell>
                  <CellAction
                    data={category}
                    type='category'
                    onOpenChange={setDialogOpen}
                    setSelectedCategoryObject={setSelectedCategory}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CategoryModal open={dialogOpen} onOpenChange={setDialogOpen} selectedCategory={selectedCategory} />
    </div>
  )
}

export default Categories
