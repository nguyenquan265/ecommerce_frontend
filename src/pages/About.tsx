import { Link } from 'react-router-dom'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ChevronLeft } from 'lucide-react'

const features = [
  {
    image: '/placeholder.svg?height=400&width=400',
    description:
      'At urna cras augue nisi neque lauinis in aliquam. Odio pellentesque sed ultricies dolor amet nunc habitusse grave conec. Eur feugiat egestas eget.'
  },
  {
    image: '/placeholder.svg?height=400&width=400',
    description:
      'Arcu volutpat sollicitudin sapien sit justo tellus eu fames senect. Faucibus et eu nulla adipiscing. Ipsum a morbi urtor ullamcorper sit semper.'
  },
  {
    image: '/placeholder.svg?height=400&width=400',
    description:
      'Nibh luctus eu dignissim sit. Lorem netue ultrices neque elementum. Et convallis consectetur lacus luctus iaculis quisque sed.'
  }
]

const brands = [
  { name: 'Brand 1', logo: '/placeholder.svg?height=50&width=120' },
  { name: 'Brand 2', logo: '/placeholder.svg?height=50&width=120' },
  { name: 'Brand 3', logo: '/placeholder.svg?height=50&width=120' },
  { name: 'Brand 4', logo: '/placeholder.svg?height=50&width=120' },
  { name: 'Brand 5', logo: '/placeholder.svg?height=50&width=120' }
]

const faqs = [
  {
    question: 'Feugiat purus mi nisl dolor pellentesque tellus?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.'
  },
  {
    question: 'Suspendisse nunc sagittis adipiscing imperdiet turpis sodales massa convallis elit?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.'
  },
  {
    question: 'Facilisis adipiscing lacus, nisl et in consectetur in?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.'
  }
]

const About = () => {
  return (
    <div className='min-h-screen bg-background'>
      {/* Breadcrumb */}
      <div className='border-b'>
        <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
          <div className='flex items-center gap-2 text-sm text-muted-foreground'>
            <Link to='/' className='hover:text-foreground'>
              Home
            </Link>
            <span>/</span>
            <span>About Us</span>
          </div>
          <Link to='/' className='text-sm text-muted-foreground hover:text-foreground flex items-center gap-1'>
            <ChevronLeft className='h-4 w-4' />
            Return to previous page
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className='container mx-auto px-4 py-16'>
        {/* Features Section */}
        <div className='text-center mb-16'>
          <span className='text-sm text-muted-foreground uppercase tracking-wider'>WE TRY OUR BEST FOR YOU</span>
          <h1 className='text-3xl font-medium mt-4 mb-12'>Welcome to the Marseille04 Shop</h1>

          <div className='grid md:grid-cols-3 gap-8 mb-16'>
            {features.map((feature, index) => (
              <div key={index} className='text-center'>
                <div className='relative aspect-square mb-6 bg-zinc-100'>
                  <img src={feature.image} alt={`Feature ${index + 1}`} className='object-cover' />
                </div>
                <p className='text-muted-foreground leading-relaxed'>{feature.description}</p>
              </div>
            ))}
          </div>

          <div className='flex flex-wrap justify-center items-center gap-12'>
            {brands.map((brand, index) => (
              <img
                key={index}
                src={brand.logo}
                alt={brand.name}
                width={120}
                height={50}
                className='opacity-50 hover:opacity-100 transition-opacity'
              />
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className='max-w-3xl mx-auto'>
          <div className='text-center mb-8'>
            <span className='text-sm text-muted-foreground uppercase tracking-wider'>WE ARE HAPPY TO HELP YOU</span>
            <h2 className='text-2xl font-medium mt-4'>Have Any Questions?</h2>
          </div>

          <Accordion type='single' collapsible className='w-full'>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className='text-left'>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}

export default About
