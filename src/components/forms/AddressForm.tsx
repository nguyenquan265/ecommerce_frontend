import { useEffect, useState } from 'react'

import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { User } from '@/types'

interface Location {
  name: string
  code: number
}

interface AddressFormProps {
  user: User
}

const AddressForm: React.FC<AddressFormProps> = ({ user }) => {
  const [provinces, setProvinces] = useState<Location[]>([])
  const [districts, setDistricts] = useState<Location[]>([])
  const [wards, setWards] = useState<Location[]>([])

  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedWard, setSelectedWard] = useState('')
  const [address, setAddress] = useState('')

  useEffect(() => {
    fetch('https://provinces.open-api.vn/api/p/')
      .then((res) => res.json())
      .then((data) => setProvinces(data))
  }, [])

  const handleProvinceChange = async (provinceCode: string) => {
    setSelectedProvince(provinceCode)
    setSelectedDistrict('')
    setSelectedWard('')

    const res = await fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
    const data = await res.json()
    setDistricts(data.districts)
  }

  const handleDistrictChange = async (districtCode: string) => {
    setSelectedDistrict(districtCode)
    setSelectedWard('')

    const res = await fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
    const data = await res.json()
    setWards(data.wards)
  }

  return (
    <Card className='max-w-3xl mx-auto p-6'>
      <div className='space-y-6'>
        {/* Personal Information */}
        <div>
          <h1 className='text-xl font-semibold'>Thông tin cá nhân</h1>
          <p className='text-sm text-muted-foreground mb-4'>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
          <div className='space-y-4'>
            <div>
              <label className='text-sm font-medium'>Tên</label>
              <Input defaultValue={user.name} />
            </div>
            <div>
              <label className='text-sm font-medium'>Email</label>
              <Input defaultValue={user.email} disabled />
            </div>
            <div>
              <label className='text-sm font-medium'>Số điện thoại</label>
              <Input defaultValue={user.phoneNumber} />
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div>
          <h2 className='text-xl font-semibold mb-4'>Thông tin nhận hàng</h2>
          <div className='space-y-4'>
            <div>
              <label className='text-sm font-medium'>Tỉnh/Thành phố</label>
              <Select value={selectedProvince} onValueChange={handleProvinceChange}>
                <SelectTrigger>
                  <SelectValue placeholder='Chọn Tỉnh/Thành' />
                </SelectTrigger>
                <SelectContent>
                  {provinces.map((province) => (
                    <SelectItem key={province.code} value={province.code.toString()}>
                      {province.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className='text-sm font-medium'>Quận/Huyện</label>
              <Select value={selectedDistrict} onValueChange={handleDistrictChange} disabled={!selectedProvince}>
                <SelectTrigger>
                  <SelectValue placeholder='Chọn Quận/Huyện' />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((district) => (
                    <SelectItem key={district.code} value={district.code.toString()}>
                      {district.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className='text-sm font-medium'>Phường/Xã</label>
              <Select value={selectedWard} onValueChange={setSelectedWard} disabled={!selectedDistrict}>
                <SelectTrigger>
                  <SelectValue placeholder='Chọn Phường/Xã' />
                </SelectTrigger>
                <SelectContent>
                  {wards.map((ward) => (
                    <SelectItem key={ward.code} value={ward.code.toString()}>
                      {ward.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className='text-sm font-medium'>Địa chỉ</label>
              <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Nhập địa chỉ' />
            </div>
          </div>
        </div>

        <div className='flex justify-end'>
          <Button>Cập nhật</Button>
        </div>
      </div>
    </Card>
  )
}

export default AddressForm
