const CartStepper = ({ currentStep = 1 }: { currentStep?: 1 | 2 | 3 }) => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='relative flex justify-between'>
        {/* Progress Line */}
        <div className='absolute top-1/2 left-0 w-full h-[2px] bg-zinc-200 -translate-y-1/2' />

        {/* Steps */}
        <div className='relative flex items-center flex-1 justify-between'>
          {/* Step 1 */}
          <div className='relative flex flex-col items-center gap-2'>
            <div
              className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm 
          ${currentStep >= 1 ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-400'}`}
            >
              1
            </div>
            <span className='mt-12 text-sm font-medium'>Giỏ Hàng</span>
          </div>

          {/* Step 2 */}
          <div className='relative flex flex-col items-center gap-2'>
            <div
              className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm
          ${currentStep >= 2 ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-400'}`}
            >
              2
            </div>
            <span className='mt-12 text-sm font-medium'>Thông Tin Đặt Hàng</span>
          </div>

          {/* Step 3 */}
          <div className='relative flex flex-col items-center gap-2'>
            <div
              className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm
          ${currentStep >= 3 ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-400'}`}
            >
              3
            </div>
            <span className='mt-12 text-sm font-medium'>Thanh Toán</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartStepper
