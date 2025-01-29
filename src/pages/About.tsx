import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

import Breadcrumb from '@/components/shared/Breadcrumb'

const features = [
  {
    image: 'https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image-min.jpg',
    description:
      'At urna cras augue nisi neque lauinis in aliquam. Odio pellentesque sed ultricies dolor amet nunc habitusse grave conec. Eur feugiat egestas eget.'
  },
  {
    image: 'https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image-copy-2-min.jpg',
    description:
      'Arcu volutpat sollicitudin sapien sit justo tellus eu fames senect. Faucibus et eu nulla adipiscing. Ipsum a morbi urtor ullamcorper sit semper.'
  },
  {
    image: 'https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image-copy-min.jpg',
    description:
      'Nibh luctus eu dignissim sit. Lorem netue ultrices neque elementum. Et convallis consectetur lacus luctus iaculis quisque sed.'
  }
]

const brands = [
  {
    name: 'Brand 1',
    logo: 'https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2024/04/brand-01-min.png'
  },
  {
    name: 'Brand 2',
    logo: 'https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/brand-03-min.png'
  },
  {
    name: 'Brand 3',
    logo: 'https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/brand-04-min.png'
  },
  {
    name: 'Brand 4',
    logo: 'https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/brand-05-min.png'
  },
  {
    name: 'Brand 5',
    logo: 'https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/brand-02-min.png'
  }
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
      <Breadcrumb text='Giới thiệu về chúng tôi' />

      {/* Main Content */}
      <div className='container mx-auto px-4 py-16'>
        {/* Features Section */}
        <div className='text-center mb-16'>
          <span className='text-sm text-muted-foreground uppercase tracking-wider'>
            CHÚNG TÔI CỐ GẮNG HẾT MÌNH VÌ BẠN
          </span>
          <h1 className='text-3xl font-medium mt-4 mb-12'>Chào mừng đến với Cửa hàng Marseille04</h1>

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
            <span className='text-sm text-muted-foreground uppercase tracking-wider'>
              CHÚNG TÔI RẤT VUI ĐƯỢC GIÚP ĐỠ BẠN
            </span>
            <h2 className='text-2xl font-medium mt-4'>Bạn có thắc mắc gì không?</h2>
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
