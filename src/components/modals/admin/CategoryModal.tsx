import React from 'react'

import { Modal } from '@/components/ui/modal'
import CategoryForm from '@/components/forms/admin/CategoryForm'

import { Category } from '@/types'

interface CategoryModalProps {
  open: boolean
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
  selectedCategory: Category | null
}

const CategoryModal: React.FC<CategoryModalProps> = ({ open, onOpenChange, selectedCategory }) => {
  return (
    <Modal
      title={selectedCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục'}
      description={selectedCategory ? 'Chỉnh sửa thông tin danh mục' : 'Thêm mới danh mục'}
      isOpen={open}
      onChange={onOpenChange}
    >
      <CategoryForm onOpenChange={onOpenChange} selectedCategory={selectedCategory} />
    </Modal>
  )
}

export default CategoryModal
