import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { BadgeAlert, Edit, MoreHorizontal, RotateCcw, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import AlertModal from '@/components/modals/admin/AlertModal'

import { Category, Order, Product, User } from '@/types'
import { useDeleteCategory } from '@/apis/categoryApi'
import { useDeleteProduct } from '@/apis/productApi'
import { useDeleteUser } from '@/apis/userApi'
import { useDeleteOrder } from '@/apis/orderApi'

interface CellActionProps {
  data: Category | Product | User | Order
  type: 'category' | 'product' | 'user' | 'order'
  onOpenChange?: (open: boolean) => void
  setSelectedCategoryObject?: (object: Category | null) => void
  setSelectedOrderObject?: (object: Order | null) => void
}

const CellAction: React.FC<CellActionProps> = ({
  data,
  type,
  onOpenChange,
  setSelectedCategoryObject,
  setSelectedOrderObject
}) => {
  const [alertOpen, setAlertOpen] = useState(false)
  const { deleteCategory, isPending: isCategoryDeleting } = useDeleteCategory(data._id)
  const { deleteProduct, isPending: isProductDeleting } = useDeleteProduct(data._id)
  const { deleteUser, isPending: isUserDeleting } = useDeleteUser(data._id)
  const { deleteOrder, isPending: isOrderDeleting } = useDeleteOrder(data._id)
  const navigate = useNavigate()

  const onDelete = async () => {
    if (type === 'category') {
      await deleteCategory()
    }

    if (type === 'product') {
      await deleteProduct()
    }

    if (type === 'user') {
      await deleteUser()
    }

    if (type === 'order') {
      await deleteOrder()
    }

    setAlertOpen(false)
  }

  const onUpdate = () => {
    if (type === 'category') {
      setSelectedCategoryObject && setSelectedCategoryObject(data as Category)
      onOpenChange && onOpenChange(true)
    }

    if (type === 'product') {
      navigate(`/admin/products/${data._id}`)
    }

    if (type === 'user') {
      navigate(`/admin/users/${data._id}`)
    }

    if (type === 'order') {
      setSelectedOrderObject && setSelectedOrderObject(data as Order)
      onOpenChange && onOpenChange(true)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={alertOpen}
        onClose={setAlertOpen}
        onConfirm={onDelete}
        loading={isCategoryDeleting || isProductDeleting || isUserDeleting || isOrderDeleting}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Mở menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Hành động</DropdownMenuLabel>

          {type == 'order' && (
            <DropdownMenuItem onClick={() => navigate(`/admin/orders/${data._id}`)}>
              <BadgeAlert className='mr-2 h-4 w-4' />
              Chi tiết
            </DropdownMenuItem>
          )}

          <DropdownMenuItem onClick={onUpdate}>
            <Edit className='mr-2 h-4 w-4' />
            Cập nhật
          </DropdownMenuItem>

          {type !== 'product' ? (
            <DropdownMenuItem onClick={() => setAlertOpen(true)}>
              <Trash className='mr-2 h-4 w-4' />
              Xóa bỏ
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => setAlertOpen(true)}>
              {'isDeleted' in data && data.isDeleted ? (
                <>
                  <RotateCcw className='mr-2 h-4 w-4' />
                  Khôi phục
                </>
              ) : (
                <>
                  <Trash className='mr-2 h-4 w-4' />
                  Xóa tạm thời
                </>
              )}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default CellAction
