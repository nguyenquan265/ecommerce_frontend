import { useEffect, useState } from 'react'

import Overview from './Overview'

import HomeSlide1 from '@/assets/home_slide1.jpg'
import HomeSlide2 from '@/assets/home_slide2.jpg'

const slides = [HomeSlide1, HomeSlide2]

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
