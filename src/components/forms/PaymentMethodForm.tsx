import { useNavigate } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Card } from '@/components/ui/card'
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Wallet, QrCode, CreditCard, BanknoteIcon, TruckIcon, Smartphone, ShieldCheck, Clock } from 'lucide-react'

import { useCreateOrder } from '@/apis/orderApi'

interface PaymentMethodFormProps {
  setCartStep: React.Dispatch<React.SetStateAction<1 | 2 | 3>>
}

const formSchema = z.object({
  paymentMethod: z.string()
})

export type PaymentMethodFormValues = z.infer<typeof formSchema>

const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({ setCartStep }) => {
  const { createOrder, isPending } = useCreateOrder()
  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentMethod: 'COD'
    }
  })

  const watchPaymentMethod = form.watch('paymentMethod')

  const onSubmit = async (values: PaymentMethodFormValues) => {
    const res = await createOrder(values)

    if (values.paymentMethod === 'COD') {
      navigate('/account/orders')
      setCartStep(1)
    }

    if (values.paymentMethod === 'ZALO') {
      window.location.href = res.detail.order_url
    }

    if (values.paymentMethod === 'MOMO') {
      window.location.href = res.detail.payUrl
    }

    if (values.paymentMethod === 'PAYOS') {
      window.location.href = res.detail.checkoutUrl
    }
  }

  const getPaymentMethodInfo = (
    method: string
  ): {
    title: string
    description: string | React.ReactNode
    icon: React.ReactNode
  } => {
    switch (method) {
      case 'COD':
        return {
          title: 'Thanh toán khi nhận hàng',
          description: 'Đơn hàng sẽ được vận chuyển tới bạn từ 3-5 ngày và thanh toán khi nhận được hàng',
          icon: <TruckIcon className='h-6 w-6 text-orange-500' />
        }
      case 'ZALO':
        return {
          title: 'Thanh toán qua ZaloPay',
          description: (
            <div className='space-y-3'>
              <p>
                Nếu bạn muốn quét QR thông qua cổng thanh toán của Zalo hãy sử dụng ứng dụng thanh toán theo link{' '}
                <a
                  href='https://beta-docs.zalopay.vn/docs/developer-tools/test-instructions/test-wallets/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-600 underline'
                >
                  tại đây
                </a>
              </p>

              <div>
                <p className='font-medium mb-1'>Nếu bạn sử dụng thẻ thanh toán quốc tế hãy dùng tài khoản sau:</p>
                <ul className='bg-white p-2 rounded border text-sm'>
                  <li>
                    <span className='font-medium'>Số thẻ:</span> 4111111111111111
                  </li>
                  <li>
                    <span className='font-medium'>Tên:</span> NGUYEN VAN A
                  </li>
                  <li>
                    <span className='font-medium'>Ngày hết hạn:</span> 01/25
                  </li>
                  <li>
                    <span className='font-medium'>Mã CVV:</span> 123
                  </li>
                  <li>
                    <span className='font-medium'>OTP:</span> 111111
                  </li>
                </ul>
              </div>

              <div>
                <p className='font-medium mb-1'>Nếu bạn sử dụng thẻ ATM nội địa hãy sử dụng tài khoản sau:</p>
                <div className='bg-white p-2 rounded border text-sm'>
                  <table className='w-full'>
                    <thead>
                      <tr className='border-b'>
                        <th className='text-left pr-2'>STT</th>
                        <th className='text-left pr-2'>Số thẻ</th>
                        <th className='text-left pr-2'>Tên chủ thẻ</th>
                        <th className='text-left'>Ngày phát hành</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='pr-2'>1</td>
                        <td className='pr-2'>9704540000000062</td>
                        <td className='pr-2'>NGUYEN VAN A</td>
                        <td>10/18</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ),
          icon: <Wallet className='h-6 w-6 text-blue-600' />
        }
      case 'MOMO':
        return {
          title: 'Thanh toán qua Momo',
          description: (
            <div className='space-y-3'>
              <p>
                Nếu bạn muốn quét QR thông qua cổng thanh toán của Momo hãy sử dụng ứng dụng thanh toán theo link{' '}
                <a
                  href='https://developers.momo.vn/v3/download/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-600 underline'
                >
                  tại đây
                </a>
              </p>

              <div>
                <p className='font-medium mb-1'>Nếu bạn sử dụng thẻ thanh toán quốc tế hãy dùng tài khoản sau:</p>
                <ul className='bg-white p-2 rounded border text-sm'>
                  <li>
                    <span className='font-medium'>Số thẻ:</span> 5200 0000 0000 1096
                  </li>
                  <li>
                    <span className='font-medium'>Tên:</span> NGUYEN VAN A
                  </li>
                  <li>
                    <span className='font-medium'>Ngày hết hạn:</span> 05/25
                  </li>
                  <li>
                    <span className='font-medium'>Mã CVV:</span> 111
                  </li>
                  <li>
                    <span className='font-medium'>OTP:</span> OTP
                  </li>
                </ul>
              </div>

              <div>
                <p className='font-medium mb-1'>Nếu bạn sử dụng thẻ ATM nội địa hãy sử dụng tài khoản sau:</p>
                <div className='bg-white p-2 rounded border text-sm'>
                  <table className='w-full'>
                    <thead>
                      <tr className='border-b'>
                        <th className='text-left pr-2'>STT</th>
                        <th className='text-left pr-2'>Số thẻ</th>
                        <th className='text-left pr-2'>Tên chủ thẻ</th>
                        <th className='text-left pr-2'>OTP</th>
                        <th className='text-left'>Ngày hết hạn</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='pr-2'>1</td>
                        <td className='pr-2'>9704 0000 0000 0018</td>
                        <td className='pr-2'>NGUYEN VAN A</td>
                        <td className='pr-2'>OTP</td>
                        <td>03/07</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ),
          icon: <Smartphone className='h-6 w-6 text-pink-600' />
        }
      case 'SEPAY':
        return {
          title: 'Thanh toán qua Sepay',
          description:
            'Thanh toán an toàn qua cổng thanh toán Sepay. Bạn sẽ được chuyển đến trang thanh toán của Sepay.',
          icon: <ShieldCheck className='h-6 w-6 text-green-600' />
        }
      default:
        return {
          title: '',
          description: '',
          icon: null
        }
    }
  }

  const paymentInfo = getPaymentMethodInfo(watchPaymentMethod)

  return (
    <Card className='max-w-3xl p-6 w-full'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <h1 className='text-xl font-semibold'>Phương thức thanh toán</h1>

          <div className='space-y-6'>
            <FormField
              control={form.control}
              name='paymentMethod'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-col space-y-3'
                    >
                      <FormItem className='flex items-center space-x-3 space-y-0 border rounded-lg p-4 transition-all hover:border-blue-300 hover:bg-blue-50'>
                        <FormControl>
                          <RadioGroupItem value='COD' />
                        </FormControl>
                        <FormLabel className='font-normal flex items-center gap-2 cursor-pointer w-full'>
                          <BanknoteIcon className='h-5 w-5 text-blue-500' />
                          <span>Thanh toán tiền mặt khi nhận hàng (COD)</span>
                        </FormLabel>
                      </FormItem>

                      <FormItem className='flex items-center space-x-3 space-y-0 border rounded-lg p-4 transition-all hover:border-blue-300 hover:bg-blue-50'>
                        <FormControl>
                          <RadioGroupItem value='ZALO' />
                        </FormControl>
                        <FormLabel className='font-normal flex items-center gap-2 cursor-pointer w-full'>
                          <Wallet className='h-5 w-5 text-blue-500' />
                          <span>Thanh toán bằng ZaloPay</span>
                        </FormLabel>
                      </FormItem>

                      <FormItem className='flex items-center space-x-3 space-y-0 border rounded-lg p-4 transition-all hover:border-blue-300 hover:bg-blue-50'>
                        <FormControl>
                          <RadioGroupItem value='MOMO' />
                        </FormControl>
                        <FormLabel className='font-normal flex items-center gap-2 cursor-pointer w-full'>
                          <CreditCard className='h-5 w-5 text-blue-500' />
                          <span>Thanh toán bằng Momo</span>
                        </FormLabel>
                      </FormItem>

                      <FormItem className='flex items-center space-x-3 space-y-0 border rounded-lg p-4 transition-all hover:border-blue-300 hover:bg-blue-50'>
                        <FormControl>
                          <RadioGroupItem value='SEPAY' disabled />
                        </FormControl>
                        <FormLabel className='font-normal flex items-center gap-2 cursor-pointer w-full'>
                          <QrCode className='h-5 w-5 text-blue-500' />
                          <span>Thanh toán bằng Sepay</span>
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            {paymentInfo.title && (
              <div className='mt-6 bg-gray-50 p-4 rounded-lg border border-gray-100 animate-fadeIn'>
                <div className='flex items-start gap-3'>
                  {paymentInfo.icon}
                  <div>
                    <h3 className='font-medium text-gray-800'>{paymentInfo.title}</h3>
                    <p className='text-gray-600 text-sm mt-1'>{paymentInfo.description}</p>

                    {watchPaymentMethod === 'COD' && (
                      <div className='flex items-center gap-2 mt-3 text-xs text-amber-700 bg-amber-50 p-2 rounded'>
                        <Clock className='h-4 w-4' />
                        <span>Thời gian giao hàng: 3-5 ngày làm việc</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className='flex gap-2 justify-between'>
            <Button type='button' onClick={() => setCartStep(2)}>
              Thông tin giỏ hàng
            </Button>

            <Button type='submit' disabled={isPending}>
              Thanh toán
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  )
}

export default PaymentMethodForm
