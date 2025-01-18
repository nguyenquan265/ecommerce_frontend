import { Link, useLocation } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useSidebar } from '../ui/sidebar'
import { Heart, ShoppingCart, Menu, User2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const socialLinks = [
  {
    href: '#',
    svg: (
      <svg xmlns='http://www.w3.org/2000/svg' height={16} width={16} fill='#fff' viewBox='0 0 320 512'>
        <path d='M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z' />
      </svg>
    )
  },
  {
    href: '#',
    svg: (
      <svg xmlns='http://www.w3.org/2000/svg' height={16} width={16} fill='#fff' viewBox='0 0 448 512'>
        <path d='M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z' />
      </svg>
    )
  },
  {
    href: '#',
    svg: (
      <svg xmlns='http://www.w3.org/2000/svg' height={16} width={16} fill='#fff' viewBox='0 0 576 512'>
        <path d='M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z' />
      </svg>
    )
  }
]

const SocialLinks = () => (
  <div className='hidden lg:flex items-center gap-4'>
    {socialLinks.map((link, index) => (
      <Link
        key={index}
        to={link.href}
        className='bg-black opacity-1 hover:opacity-50 w-[20px] h-[20px] rounded-full flex items-center justify-center'
      >
        {link.svg}
      </Link>
    ))}
  </div>
)

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Link to={to} className={cn('relative group text-sm', isActive && 'font-semibold')}>
      {children}
      <span
        className={cn(
          'absolute bottom-0 left-0 h-[2px] bg-current transition-all duration-300',
          isActive ? 'w-full' : 'w-0 group-hover:w-full'
        )}
      ></span>
    </Link>
  )
}

const Header = () => {
  const { toggleSidebar } = useSidebar()

  return (
    <header className='py-4 px-12 flex items-center justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50'>
      <Button variant='ghost' size='icon' className='lg:hidden hover:bg-transparent' onClick={toggleSidebar}>
        <Menu className='h-5 w-5' />
      </Button>

      {/* Socials */}
      <SocialLinks />

      {/* Shop, About */}
      <nav className='hidden w-[160px] lg:flex items-center gap-6'>
        <NavLink to='/shop'>Our Shop</NavLink>
        <NavLink to='/about'>About Us</NavLink>
      </nav>

      {/* Logo */}
      <Link to='/' className='flex items-center justify-center'>
        <img
          src='https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Logo-retina.png'
          alt='logo'
          width={150}
          height={52}
          loading='lazy'
        />
      </Link>

      {/* Contact, Search */}
      <nav className='hidden w-[160px] lg:flex items-center gap-6'>
        <NavLink to='/contact'>Contacts</NavLink>
        <NavLink to='#'>Search</NavLink>
      </nav>

      {/* Account, Wishlist, Cart */}
      <div className='flex items-center gap-4'>
        <Link to='/account' className='hidden lg:block'>
          <User2 className='h-5 w-5 hover:cursor-pointer opacity-1 hover:opacity-50' />
        </Link>

        <Link to='/wishlist' className='relative group hidden lg:block'>
          <Heart className='h-5 w-5 hover:cursor-pointer opacity-1 hover:opacity-50' />

          <span className='absolute -top-2 -right-2 h-4 w-4 text-[10px] font-medium rounded-full bg-primary text-primary-foreground flex items-center justify-center'>
            0
          </span>
        </Link>

        <Link to='/cart' className='relative group hidden lg:block'>
          <ShoppingCart className='h-5 w-5 hover:cursor-pointer opacity-1 hover:opacity-50' />

          <span className='absolute -top-2 -right-2 h-4 w-4 text-[10px] font-medium rounded-full bg-primary text-primary-foreground flex items-center justify-center'>
            0
          </span>
        </Link>
      </div>
    </header>
  )
}

export default Header
