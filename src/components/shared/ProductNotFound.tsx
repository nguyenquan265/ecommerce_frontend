import { Link } from 'react-router-dom'

import { PackageX } from 'lucide-react'
import { Button } from '../ui/button'

const ProductNotFound = () => {
  return (
    <div className='min-h-screen bg-background flex items-center justify-center px-4'>
      <div className='max-w-md w-full text-center'>
        <PackageX className='mx-auto h-24 w-24 text-muted-foreground mb-6' />
        <h1 className='text-4xl font-bold mb-4'>Không tìm thấy sản phẩm</h1>
        <p className='text-lg text-muted-foreground mb-8'>
          Rất tiếc, nhưng sản phẩm bạn đang tìm kiếm có vẻ như không tồn tại hoặc đã bị xóa.
        </p>
        <Button asChild className='bg-primary hover:bg-primary/90'>
          <Link to='/shop'>Quay lại Cửa hàng</Link>
        </Button>
      </div>
    </div>
  )
}

export default ProductNotFound
