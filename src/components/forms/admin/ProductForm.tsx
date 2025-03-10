import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Trash } from 'lucide-react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import AlertModal from '@/components/modals/admin/AlertModal'
import Heading from '@/components/shared/admin/Heading'
import ImageUpload from '@/components/shared/admin/ImageUpload'
import Editor from '@/components/rich-text/editor'

import { Category, Product } from '@/types'
import { useCreateProduct, useDeleteProduct, useUpdateProduct } from '@/apis/productApi'

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Vui lòng nhập tên sản phẩm.'
  }),
  slug: z.string().optional(),
  description: z.string().min(10, {
    message: 'Mô tả sản phẩm cần ít nhất 10 ký tự. Vui lòng cung cấp thêm thông tin chi tiết.'
  }),
  categoryId: z.string().min(1, {
    message: 'Vui lòng chọn danh mục cho sản phẩm.'
  }),
  size: z.string().min(1, {
    message: 'Vui lòng nhập kích thước của sản phẩm.'
  }),
  price: z.coerce.number().min(1, {
    message: 'Giá sản phẩm phải lớn hơn 0. Vui lòng nhập giá hợp lệ.'
  }),
  priceDiscount: z.coerce.number().min(0, {
    message: 'Giá giảm không được nhỏ hơn 0. Vui lòng kiểm tra lại.'
  }),
  quantity: z.coerce.number().min(1, {
    message: 'Số lượng sản phẩm phải lớn hơn 0. Vui lòng nhập số lượng hợp lệ.'
  }),
  mainImage: z.string().min(1, {
    message: 'Chỉ được tải lên một hình ảnh chính cho sản phẩm.'
  }),
  subImages: z.object({ url: z.string() }).array(),
  isDeleted: z.boolean().optional()
})

export type ProductFormValues = z.infer<typeof formSchema>

interface ProductFormProps {
  initialData?: Product
  categories: Category[]
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData, categories }) => {
  const [open, setOpen] = useState(false)
  const subImagesRef = useRef<{ url: string }[]>(initialData?.subImages || [])
  const { createProduct, isPending: isCreating } = useCreateProduct()
  const { updateProduct, isPending: isUpdating } = useUpdateProduct(initialData?._id)
  const { deleteProduct, isPending: isDeleting } = useDeleteProduct(initialData?._id)
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? { ...initialData, categoryId: initialData.category._id }
      : {
          title: '',
          slug: '',
          description: '',
          categoryId: '',
          size: '',
          price: 1,
          priceDiscount: 1,
          quantity: 100,
          mainImage: '',
          subImages: [],
          isDeleted: false
        },
    shouldUnregister: false
  })

  const onSubmit = async (values: ProductFormValues) => {
    if (initialData) {
      await updateProduct(values)
    } else {
      await createProduct(values)
    }

    navigate('/admin/products')
  }

  const onDelete = async () => {
    await deleteProduct()

    setOpen(false)

    navigate('/admin/products')
  }

  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={isDeleting} />

      <div className='flex items-center justify-between'>
        <Heading
          title={initialData ? 'Chỉnh sửa sản phẩm' : 'Tạo sản phẩm'}
          description={initialData ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
        />

        {initialData && (
          <Button
            disabled={isCreating || isUpdating || isDeleting}
            variant='destructive'
            size='sm'
            onClick={() => setOpen(true)}
          >
            <Trash className='h-4 w-4' />
          </Button>
        )}
      </div>

      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
          {/* Main Image */}
          <FormField
            control={form.control}
            name='mainImage'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hình ảnh chính</FormLabel>
                <FormControl>
                  <ImageUpload
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange('')}
                    value={field.value ? [field.value] : []}
                    disabled={isCreating || isUpdating}
                    type='single'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Sub Images */}
          <FormField
            control={form.control}
            name='subImages'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hình ảnh phụ</FormLabel>
                <FormControl>
                  <ImageUpload
                    onChange={(url) => {
                      // field.value.push({ url })

                      // field.onChange(field.value)

                      subImagesRef.current.push({ url })
                      field.onChange(subImagesRef.current)
                    }}
                    // onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                    onRemove={(url) => {
                      subImagesRef.current = subImagesRef.current.filter((current) => current.url !== url)
                      field.onChange(subImagesRef.current)
                    }}
                    // value={field.value.map((image) => image.url)}
                    value={subImagesRef.current.map((image) => image.url)}
                    disabled={isCreating || isUpdating || isDeleting}
                    type='multiple'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid grid-cols-2 gap-8'>
            {/* Title */}
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiêu đề sản phẩm</FormLabel>

                  <FormControl>
                    <Input
                      placeholder='Nhập tiêu đề sản phẩm'
                      {...field}
                      disabled={isCreating || isUpdating || isDeleting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Slug */}
            {initialData && (
              <FormField
                control={form.control}
                name='slug'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>

                    <FormControl>
                      <Input placeholder='Nhập Slug' {...field} disabled={isCreating || isUpdating || isDeleting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Description */}
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel>Mô tả sản phẩm</FormLabel>

                  <FormControl>
                    <Editor content={field.value} onChange={field.onChange} placeholder='Viết mô tả ở đây...' />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={form.control}
              name='categoryId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Danh mục</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                    disabled={isCreating || isUpdating || isDeleting}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} placeholder='Chọn danh mục sản phẩm' />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Size */}
            <FormField
              control={form.control}
              name='size'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kích cỡ</FormLabel>

                  <FormControl>
                    <Input placeholder='Nhập Kích thước' {...field} disabled={isCreating || isUpdating || isDeleting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price */}
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giá sản phẩm</FormLabel>

                  <FormControl>
                    <Input
                      placeholder='Nhập giá'
                      type='number'
                      {...field}
                      disabled={isCreating || isUpdating || isDeleting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Discount Price */}
            <FormField
              control={form.control}
              name='priceDiscount'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giảm giá</FormLabel>

                  <FormControl>
                    <Input
                      placeholder='Nhập Giảm giá'
                      type='number'
                      {...field}
                      disabled={isCreating || isUpdating || isDeleting}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Quantity */}
            <FormField
              control={form.control}
              name='quantity'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số lượng</FormLabel>

                  <FormControl>
                    <Input
                      placeholder='Nhập số lượng'
                      type='number'
                      {...field}
                      disabled={isCreating || isUpdating || isDeleting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* isDeleted */}
            {initialData && (
              <FormField
                control={form.control}
                name='isDeleted'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isCreating || isUpdating || isDeleting}
                      />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel>Đã xóa</FormLabel>
                      <FormDescription>Sản phẩm này sẽ không xuất hiện ở bất kỳ đâu trên trang web</FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            )}
          </div>

          <div className='flex justify-end gap-4'>
            <Button type='submit' className='bg-[#1570EF] hover:bg-[#1f4375]'>
              {initialData ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default ProductForm
