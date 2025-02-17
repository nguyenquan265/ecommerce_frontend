import { useState, useEffect } from 'react'

interface Location {
  code: string
  name: string
}

export const useAddressData = () => {
  const [provinces, setProvinces] = useState<Location[]>([])
  const [districts, setDistricts] = useState<Location[]>([])
  const [wards, setWards] = useState<Location[]>([])

  useEffect(() => {
    fetch('https://provinces.open-api.vn/api/p/')
      .then((response) => response.json())
      .then((data) => setProvinces(data))
  }, [])

  const fetchDistricts = (provinceCode: string) => {
    fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
      .then((response) => response.json())
      .then((data) => setDistricts(data.districts))
  }

  const fetchWards = (districtCode: string) => {
    fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
      .then((response) => response.json())
      .then((data) => setWards(data.wards))
  }

  return { provinces, districts, wards, fetchDistricts, fetchWards }
}
