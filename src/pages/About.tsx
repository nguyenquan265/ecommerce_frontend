import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

import Breadcrumb from '@/components/shared/Breadcrumb'

import { brands, faqs, features } from '@/lib/constants'

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
                  <img src={feature.image} alt={`Feature ${index + 1}`} className='object-cover' loading='lazy' />
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
                loading='lazy'
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
