import { useEffect, useState } from 'react'

import Overview from './Overview'

const slides = [
  'https://indexlivingmallvn.com/media/mageplaza/bannerslider/banner/image/_/1/_1366x430_pc_takayama.jpg',
  'https://indexlivingmallvn.com/media/mageplaza/bannerslider/banner/image/_/1/_1366x430_pc_bronxplus.jpg'
]

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div className='relative w-full' style={{ paddingTop: 'calc(430 / 1366 * 100%)' }}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url('${slide}')`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat'
            }}
          />
        ))}
      </div>

      <div className='bg-zinc-800 text-white py-4'>
        <Overview />
      </div>
    </>
  )
}

export default Hero
