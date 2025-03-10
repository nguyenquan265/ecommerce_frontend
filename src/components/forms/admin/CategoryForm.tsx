import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { Category } from '@/types'
import { useCreateCategory, useUpdateCategory } from '@/apis/categoryApi'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Category name must be at least 2 characters.'
  }),
  slug: z.string().optional()
})

export type CategoryFormValues = z.infer<typeof formSchema>

interface CategoryFormProps {
  onOpenChange: (isOpen: boolean) => void
  selectedCategory: Category | null
}

const CategoryForm: React.FC<CategoryFormProps> = ({ onOpenChange, selectedCategory }) => {
  const { createCategory, isPending: isCreating } = useCreateCategory()
  const { updateCategory, isPending: isUpdating } = useUpdateCategory(selectedCategory?._id || '')

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: selectedCategory?.name || '',
      slug: selectedCategory?.slug || ''
    }
  })

  const onSubmit = async (values: CategoryFormValues) => {
    if (selectedCategory) {
      await updateCategory(values)
    } else {
      await createCategory(values)
    }

    onOpenChange(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
        <div className='flex flex-col gap-1'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='flex items-center gap-4'>
                <FormLabel className='w-1/3'>Tên danh mục</FormLabel>

                <div className='flex-1'>
                  <FormControl>
                    <Input placeholder='Nhập tên danh mục' {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {selectedCategory && (
            <FormField
              control={form.control}
              name='slug'
              render={({ field }) => (
                <FormItem className='flex items-center gap-4'>
                  <FormLabel className='w-1/3'>Slug</FormLabel>
                  <div className='flex-1'>
                    <FormControl>
                      <Input placeholder='Nhập slug danh mục' {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          )}
        </div>

        <div className='flex justify-end gap-4'>
          <Button
            variant='outline'
            type='button'
            disabled={isCreating || isUpdating}
            onClick={() => onOpenChange(false)}
          >
            Hủy bỏ
          </Button>
          <Button type='submit' disabled={isCreating || isUpdating}>
            {selectedCategory ? 'Cập nhật' : 'Tạo'} danh mục
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default CategoryForm
