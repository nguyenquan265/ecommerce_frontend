import { overviewFeatures } from '@/lib/constants'

const Overview = () => {
  return (
    <div className='container mx-auto px-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        {overviewFeatures.map(({ icon: Icon, title, description }, index) => (
          <div key={index} className='flex items-center gap-4'>
            <Icon className='h-6 w-6 flex-shrink-0' />
            <div>
              <h3 className='font-medium mb-1'>{title}</h3>
              <p className='text-sm text-zinc-400'>{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Overview
