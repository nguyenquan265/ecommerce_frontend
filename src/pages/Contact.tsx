import { Link } from 'react-router-dom'

import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Breadcrumb from '@/components/shared/Breadcrumb'

const Contact = () => {
  return (
    <div className='min-h-screen bg-background'>
      <Breadcrumb text='liên hệ với chúng tôi' />

      {/* Map */}
      <div className='container mx-auto px-4 h-[300px]'>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.8581690910487!2d106.6842704741396!3d10.82216415835026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174deb3ef536f31%3A0x8b7bb8b7c956157b!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2hp4buHcCBUUC5IQ00!5e0!3m2!1svi!2s!4v1736995736644!5m2!1svi!2s'
          width='100%'
          height='100%'
          style={{ border: 0 }}
          allowFullScreen
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
        ></iframe>
      </div>

      {/* Contact Content */}
      <div className='container mx-auto px-4 lg:px-32 py-16'>
        <div className='grid md:grid-cols-2 gap-12'>
          {/* Information */}
          <div className='max-lg:text-center'>
            <h2 className='text-xl font-medium mb-8'>Thông tin</h2>
            <div className='space-y-6'>
              <div>
                <h3 className='text-sm font-medium mb-2'>Địa chỉ</h3>
                <p className='text-sm text-muted-foreground'>
                  7895 Fairmont Dr NE
                  <br />
                  Albuquerque, NM
                  <br />
                  108566
                </p>
              </div>
              <div>
                <h3 className='text-sm font-medium mb-2'>Điện thoại</h3>
                <p className='text-sm text-muted-foreground'>
                  +391 (0)35 2568 4593
                  <br />
                  hello@domain.com
                </p>
              </div>
              <div>
                <h3 className='text-sm font-medium mb-2'>Chúng tôi mở</h3>
                <p className='text-sm text-muted-foreground'>Mỗi ngày từ 11 giờ sáng đến 7 giờ tối</p>
              </div>

              <div className='flex gap-4 pt-4 max-lg:items-center max-lg:justify-center'>
                <Link to='#' className='text-muted-foreground hover:text-foreground'>
                  <Facebook className='h-4 w-4' />
                </Link>
                <Link to='#' className='text-muted-foreground hover:text-foreground'>
                  <Instagram className='h-4 w-4' />
                </Link>
                <Link to='#' className='text-muted-foreground hover:text-foreground'>
                  <Youtube className='h-4 w-4' />
                </Link>
                <Link to='#' className='text-muted-foreground hover:text-foreground'>
                  <Twitter className='h-4 w-4' />
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className='text-xl font-medium mb-4'>Liên hệ với chúng tôi</h2>
            <p className='text-sm text-muted-foreground mb-8'>
              Nếu bạn có những sản phẩm tuyệt vời và muốn hợp tác với chúng tôi, hãy liên hệ với chúng tôi.
            </p>
            <form className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <Input type='text' placeholder='Name' className='rounded-none' />
                <Input type='email' placeholder='Email' className='rounded-none' />
              </div>
              <Textarea placeholder='Message' className='min-h-[150px] rounded-none' />
              <Button className='w-full bg-zinc-800 hover:bg-zinc-900 rounded-none'>Gửi ngay</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
