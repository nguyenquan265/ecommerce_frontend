import { Link } from 'react-router-dom'

import { ChevronLeft, Facebook, Instagram, Youtube, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const Contact = () => {
  return (
    <div className='min-h-screen bg-background'>
      {/* Breadcrumb */}
      <div className='border-b mb-4'>
        <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
          <div className='flex items-center gap-2 text-sm text-muted-foreground'>
            <Link to='/' className='hover:text-foreground'>
              Home
            </Link>
            <span>/</span>
            <span>Contact Us</span>
          </div>
          <Link to='/' className='text-sm text-muted-foreground hover:text-foreground flex items-center gap-1'>
            <ChevronLeft className='h-4 w-4' />
            Return to previous page
          </Link>
        </div>
      </div>

      {/* Map */}
      <div className='container mx-auto px-4 h-[300px]'>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.6042401462377!2d-119.787398384689!3d36.737589979962736'
          width='100%'
          height='100%'
          style={{ border: 0 }}
          allowFullScreen
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
        ></iframe>
      </div>

      {/* Contact Content */}
      <div className='container mx-auto px-4 py-16'>
        <div className='grid md:grid-cols-2 gap-12'>
          {/* Information */}
          <div>
            <h2 className='text-xl font-medium mb-8'>Information</h2>
            <div className='space-y-6'>
              <div>
                <h3 className='text-sm font-medium mb-2'>Address</h3>
                <p className='text-sm text-muted-foreground'>
                  7895 Fairmont Dr NE
                  <br />
                  Albuquerque, NM
                  <br />
                  108566
                </p>
              </div>
              <div>
                <h3 className='text-sm font-medium mb-2'>Phones</h3>
                <p className='text-sm text-muted-foreground'>
                  +391 (0)35 2568 4593
                  <br />
                  hello@domain.com
                </p>
              </div>
              <div>
                <h3 className='text-sm font-medium mb-2'>We're Open</h3>
                <p className='text-sm text-muted-foreground'>Every day 11am to 7pm</p>
              </div>
              <div className='flex gap-4 pt-4'>
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
            <h2 className='text-xl font-medium mb-4'>Contact Us</h2>
            <p className='text-sm text-muted-foreground mb-8'>
              If you've got great products your looking to work with us then drop us a line.
            </p>
            <form className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <Input type='text' placeholder='Name' className='rounded-none' />
                <Input type='email' placeholder='Email' className='rounded-none' />
              </div>
              <Textarea placeholder='Message' className='min-h-[150px] rounded-none' />
              <Button className='w-full bg-zinc-800 hover:bg-zinc-900 rounded-none'>Send Now</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
