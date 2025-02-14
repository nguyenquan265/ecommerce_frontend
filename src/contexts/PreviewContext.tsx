import { createContext, useContext, useState, ReactNode } from 'react'
import { Product } from '@/types'

interface PreviewContextType {
  previewProduct: Product | null
  showPreview: (product: Product) => void
  closePreview: () => void
}

const PreviewContext = createContext<PreviewContextType | undefined>(undefined)

export const PreviewProvider = ({ children }: { children: ReactNode }) => {
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null)

  const showPreview = (product: Product) => setPreviewProduct(product)
  const closePreview = () => setPreviewProduct(null)

  return (
    <PreviewContext.Provider value={{ previewProduct, showPreview, closePreview }}>{children}</PreviewContext.Provider>
  )
}

export const usePreview = () => {
  const context = useContext(PreviewContext)

  if (!context) throw new Error('usePreview must be used within a PreviewProvider')

  return context
}
