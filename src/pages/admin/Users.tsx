import { useState } from 'react'
import { Link } from 'react-router-dom'
import lodash from 'lodash'

import { ChevronDown, Filter } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import CellAction from '@/components/shared/admin/CellAction'
import AdminPagination from '@/components/shared/admin/AdminPagination'

import { useGetAllUsers } from '@/apis/userApi'
import { SortOption, cn, getSortLabel } from '@/lib/utils'

const sortOptions: SortOption[] = ['desc', 'asc', 'a-z', 'z-a']

const Users = () => {
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState<SortOption>('desc')
  const [searchString, setSearchString] = useState('')
  const { users, pagination, isLoading } = useGetAllUsers({
    page,
    limit: 10,
    searchString,
    sortBy
  })

  const handleSearch = lodash.debounce((value: string) => {
    setSearchString(value)
    setPage(1)
  }, 800)

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value)
  }

  return (
    <div className='space-y-6'>
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-semibold'>Người Dùng ({pagination?.totalUsers || 0})</h2>

          <div className='flex items-center gap-2'>
            <Link to='/admin/users/new'>
              <Button className='bg-[#1570EF] hover:bg-[#1f4375]'>Thêm Người Dùng</Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline'>
                  <Filter className='mr-2 h-4 w-4' />
                  Sắp Xếp
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
            <Input placeholder='Tìm kiếm người dùng' className='w-full' onChange={onSearchChange} />
          </div>
        </div>

        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên người dùng</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Số điện thoại</TableHead>
                <TableHead>Địa chỉ</TableHead>
                <TableHead>Loại tài khoản</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Quyền</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={9} className='h-24 text-center'>
                    Đang tải...
                  </TableCell>
                </TableRow>
              )}

              {users?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className='h-24 text-center'>
                    Không tìm thấy người dùng
                  </TableCell>
                </TableRow>
              )}

              {users?.map((user) => (
                <TableRow key={user._id} className='hover:bg-muted/50'>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phoneNumber || '-'}</TableCell>
                  <TableCell>{user.shippingAddress ? user.shippingAddress.provinceName : '-'}</TableCell>
                  <TableCell>
                    {' '}
                    {
                      <Badge
                        variant='outline'
                        className={cn(
                          'font-normal',
                          user.isGoogleAccount
                            ? 'border-red-200 bg-red-100 text-red-800 hover:bg-red-100/80'
                            : 'border-green-200 bg-green-100 text-green-800 hover:bg-green-100/80'
                        )}
                      >
                        {user.isGoogleAccount ? 'Google' : 'Email'}
                      </Badge>
                    }
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant='outline'
                      className={cn(
                        'font-normal',
                        user.isActive
                          ? 'border-green-200 bg-green-100 text-green-800 hover:bg-green-100/80'
                          : 'border-red-200 bg-red-100 text-red-800 hover:bg-red-100/80'
                      )}
                    >
                      {user.isActive ? 'Kích hoạt' : 'Chưa kích hoạt'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {
                      <Badge
                        variant='outline'
                        className={cn(
                          'font-normal',
                          user.isAdmin
                            ? 'border-red-200 bg-red-100 text-red-800 hover:bg-red-100/80'
                            : 'border-green-200 bg-green-100 text-green-800 hover:bg-green-100/80'
                        )}
                      >
                        {user.isAdmin ? 'Admin' : 'Client'}
                      </Badge>
                    }
                  </TableCell>
                  <TableCell>
                    <CellAction data={user} type='user' />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <AdminPagination page={page} setPage={setPage} pagination={pagination} isLoading={isLoading} />
      </div>
    </div>
  )
}

export default Users
