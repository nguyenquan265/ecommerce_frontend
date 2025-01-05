import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'

const Compare = () => {
  return (
    <div className='min-h-screen bg-background lg:hidden'>
      <div className='bg-zinc-50 py-6'>
        <h1 className='container mx-auto px-4 text-center text-2xl font-medium flex items-center justify-center gap-2'>
          <RefreshCw className='w-5 h-5' />
          Compare
        </h1>
      </div>

      <div className='container mx-auto px-4 py-8'>
        <div className='flex flex-col items-center justify-center text-center max-w-md mx-auto'>
          <RefreshCw className='w-12 h-12 mb-6 text-muted-foreground' />
          <h1 className='text-2xl font-medium mb-4'>Your compare is empty</h1>
          <p className='text-muted-foreground mb-8'>
            We invite you to get acquainted with an assortment of our shop. Surely you can find something for yourself!
          </p>
          <Button asChild className='bg-zinc-800 hover:bg-zinc-900 rounded-none px-8'>
            <Link to='/shop'>RETURN TO SHOP</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Compare
