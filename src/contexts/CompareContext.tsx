import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Product } from '@/types'

type CompareContextType = {
  compareItems: Product[]
  addToCompare: (product: Product) => void
  removeFromCompare: (id: string) => void
  clearCompare: () => void
  isInCompare: (id: string) => boolean
}

const CompareContext = createContext<CompareContextType>({
  compareItems: [],
  addToCompare: () => {},
  removeFromCompare: () => {},
  clearCompare: () => {},
  isInCompare: () => false
})

export const CompareProvider = ({ children }: { children: React.ReactNode }) => {
  const [compareItems, setCompareItems] = useState<Product[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const storedItems = localStorage.getItem('compareItems')
    if (storedItems) {
      setCompareItems(JSON.parse(storedItems))
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('compareItems', JSON.stringify(compareItems))
    }
  }, [compareItems, mounted])

  const addToCompare = (product: Product) => {
    if (compareItems.length >= 4) {
      toast.error('Chỉ có thể so sánh tối đa 4 sản phẩm!')
      return
    }

    if (isInCompare(product._id)) {
      toast.error('Sản phẩm đã tồn tại trong danh sách so sánh!')
      return
    }

    setCompareItems([...compareItems, product])
    toast.success('Đã thêm sản phẩm vào danh sách so sánh!')
  }

  const removeFromCompare = (id: string) => {
    setCompareItems(compareItems.filter((item) => item._id !== id))
    toast.success('Đã xóa sản phẩm khỏi danh sách so sánh!')
  }

  const clearCompare = () => {
    setCompareItems([])
    toast.success('Đã xóa tất cả sản phẩm khỏi danh sách so sánh!')
  }

  const isInCompare = (id: string) => {
    return compareItems.some((item) => item._id === id)
  }

  return (
    <CompareContext.Provider
      value={{
        compareItems,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare
      }}
    >
      {children}
    </CompareContext.Provider>
  )
}

export const useCompare = () => {
  return useContext(CompareContext)
}
