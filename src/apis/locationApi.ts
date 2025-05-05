import { useState } from 'react'

interface Location {
  code: string
  name: string
}

export const useAddressData = () => {
  const [provinces, setProvinces] = useState<Location[]>([])
  const [districts, setDistricts] = useState<Location[]>([])
  const [wards, setWards] = useState<Location[]>([])

  const fetchProvinces = () => {
    fetch('https://provinces.open-api.vn/api/?depth=1')
      .then((response) => response.json())
      .then((data) => {
        setProvinces(data)
      })
  }

  const fetchDistricts = (provinceCode: string) => {
    setDistricts([])
    setWards([])

    fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
      .then((response) => response.json())
      .then((data) => {
        setDistricts(data.districts)
      })
  }

  const fetchWards = (districtCode: string) => {
    setWards([])

    fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
      .then((response) => response.json())
      .then((data) => {
        setWards(data.wards)
      })
  }

  return {
    provinces,
    districts,
    wards,
    fetchProvinces,
    fetchDistricts,
    fetchWards
  }
}
