import { Link } from 'react-router-dom'

import { navigation, paymentMethods } from '@/lib/constants'

const Footer = () => {
  return (
    <footer className='bg-zinc-800 text-white py-16'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col items-center'>
          {/* Logo */}
          <Link to='/' className='text-center mb-8'>
            <h2 className='text-2xl font-serif'>Marseille</h2>
            <p className='text-xs text-zinc-400'>XSTORE THEME</p>
          </Link>

          {/* Navigation */}
          <nav className='flex flex-wrap justify-center gap-x-8 gap-y-2 mb-12'>
            {navigation.map((item) => (
              <Link key={item.name} to={item.href} className='text-sm hover:text-zinc-300 transition-colors'>
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Payment Methods */}
          <div className='text-center mb-8'>
            <h3 className='text-sm mb-4'>Đảm bảo thanh toán an toàn</h3>
            <div className='flex justify-center gap-2'>
              {paymentMethods.map((method) => (
                <div key={method.name} className='w-12 h-8 bg-white/10 rounded flex items-center justify-center'>
                  <img
                    src={method.image}
                    alt={method.name}
                    width={47}
                    height={30}
                    className='opacity-50 hover:opacity-75 transition-opacity'
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <p className='text-sm text-zinc-400 text-center'>
            Copyright © 2024 XStore theme. Created by 8theme – WordPress WooCommerce themes.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
