import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type SortOption = 'default' | 'asc' | 'desc' | 'a-z' | 'z-a' | 'price-asc' | 'price-desc'

export const getSortLabel = (option: SortOption): string => {
  switch (option) {
    case 'default':
      return 'Mặc định'
    case 'desc':
      return 'Mới nhất'
    case 'asc':
      return 'Cũ nhất'
    case 'a-z':
      return 'Sắp xếp từ A - Z'
    case 'z-a':
      return 'Sắp xếp từ Z - A'
    case 'price-asc':
      return 'Giá từ thấp đến cao'
    case 'price-desc':
      return 'Giá từ cao đến thấp'
    default:
      return ''
  }
}

export const currencyFormatter = (price: number) => {
  return Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}

export const priceFormatter = (discount: number, price: number) => {
  return discount ? Math.round(price - (price * discount) / 100) : price
}
