import { Skeleton } from '../ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { User, Lock, ShoppingBag, LogOut } from 'lucide-react'
import { Card } from '../ui/card'

const AccountSkeleton = () => {
  return (
    <div className='min-h-screen bg-background'>
      <div className='h-12 bg-zinc-100'></div>
      <div className='container mx-auto py-8 px-4'>
        <Tabs defaultValue='account' className='w-full'>
          <div className='grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8'>
            {/* Sidebar Skeleton */}
            <div className='bg-white rounded-lg shadow-sm p-4'>
              <div className='flex items-center gap-3 mb-6 pb-4 border-b'>
                <Skeleton className='w-10 h-10 rounded-full' />
                <div>
                  <Skeleton className='h-4 w-24 mb-1' />
                  <Skeleton className='h-3 w-32' />
                </div>
              </div>
              <TabsList className='flex flex-col items-start justify-start h-auto bg-transparent border-0 p-0'>
                <TabsTrigger
                  value='account'
                  className='w-full justify-start rounded-md mb-1 data-[state=active]:bg-primary/5'
                  disabled
                >
                  <User size={16} className='mr-2' />
                  <Skeleton className='h-4 w-32' />
                </TabsTrigger>
                <TabsTrigger
                  value='password'
                  className='w-full justify-start rounded-md mb-1 data-[state=active]:bg-primary/5'
                  disabled
                >
                  <Lock size={16} className='mr-2' />
                  <Skeleton className='h-4 w-32' />
                </TabsTrigger>
                <TabsTrigger
                  value='orders'
                  className='w-full justify-start rounded-md mb-1 data-[state=active]:bg-primary/5'
                  disabled
                >
                  <ShoppingBag size={16} className='mr-2' />
                  <Skeleton className='h-4 w-32' />
                </TabsTrigger>
              </TabsList>
              <Button
                variant='ghost'
                className='w-full justify-start text-left mt-4 hover:bg-destructive/10 hover:text-destructive'
                disabled
              >
                <LogOut size={16} className='mr-2' />
                <Skeleton className='h-4 w-24' />
              </Button>
            </div>

            {/* Main Content Skeleton */}
            <div className='bg-white rounded-lg shadow-sm'>
              <TabsContent value='account' className='m-0'>
                <div className='p-6'>
                  <Card className='max-w-3xl mx-auto p-6'>
                    <div className='space-y-6'>
                      {/* Personal Information */}
                      <div>
                        <Skeleton className='h-6 w-48 mb-2' />
                        <Skeleton className='h-4 w-64 mb-4' />
                        <div className='space-y-4'>
                          {[...Array(3)].map((_, index) => (
                            <div key={index} className='space-y-2'>
                              <Skeleton className='h-4 w-24' />
                              <Skeleton className='h-10 w-full' />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Delivery Information */}
                      <div>
                        <Skeleton className='h-6 w-48 mb-4' />
                        <div className='space-y-4'>
                          {[...Array(4)].map((_, index) => (
                            <div key={index} className='space-y-2'>
                              <Skeleton className='h-4 w-24' />
                              <Skeleton className='h-10 w-full' />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className='flex justify-end'>
                        <Skeleton className='h-10 w-24' />
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

export default AccountSkeleton
