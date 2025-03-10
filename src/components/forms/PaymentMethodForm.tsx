import { useNavigate } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Card } from '@/components/ui/card'
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Wallet, QrCode, CreditCard, BanknoteIcon } from 'lucide-react'

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

  return (
    <Card className='max-w-3xl p-6 w-full'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <h1 className='text-xl font-semibold'>Phương thức thanh toán</h1>

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
                    <FormItem className='flex items-center space-x-3 space-y-0 border rounded-lg p-4'>
                      <FormControl>
                        <RadioGroupItem value='COD' />
                      </FormControl>
                      <FormLabel className='font-normal flex items-center gap-2'>
                        <BanknoteIcon className='h-5 w-5 text-blue-500' />
                        Thanh toán bằng tiền mặt khi nhận hàng (COD)
                      </FormLabel>
                    </FormItem>

                    <FormItem className='flex items-center space-x-3 space-y-0 border rounded-lg p-4'>
                      <FormControl>
                        <RadioGroupItem value='ZALO' />
                      </FormControl>
                      <FormLabel className='font-normal flex items-center gap-2'>
                        <Wallet className='h-5 w-5 text-blue-500' />
                        Thanh toán bằng ZaloPay
                      </FormLabel>
                    </FormItem>

                    <FormItem className='flex items-center space-x-3 space-y-0 border rounded-lg p-4'>
                      <FormControl>
                        <RadioGroupItem value='MOMO' />
                      </FormControl>
                      <FormLabel className='font-normal flex items-center gap-2'>
                        <CreditCard className='h-5 w-5 text-blue-500' />
                        Thanh toán bằng Momo
                      </FormLabel>
                    </FormItem>

                    <FormItem className='flex items-center space-x-3 space-y-0 border rounded-lg p-4'>
                      <FormControl>
                        <RadioGroupItem value='SEPAY' />
                      </FormControl>
                      <FormLabel className='font-normal flex items-center gap-2'>
                        <QrCode className='h-5 w-5 text-blue-500' />
                        Thanh toán bằng Sepay
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

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
