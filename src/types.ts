export type User = {
  _id: string
  name: string
  email: string
  phoneNumber?: string
  photoUrl?: string
  shippingAddress?: {
    address: string
    province: string
    provinceName: string
    district: string
    districtName: string
    ward: string
    wardName: string
  }
  wishlistItems: Product[]
  isGoogleAccount: boolean
  createdAt: string
  updatedAt: string
}

export type Category = {
  _id: string
  name: string
  slug: string
  createdAt: string
  updatedAt: string
}

export type Product = {
  _id: string
  title: string
  slug: string
  description: string
  category: Category
  size: string
  price: number
  priceDiscount: number
  quantity: number
  mainImage: string
  subImages: {
    url: string
  }[]
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}

export type Cart = {
  _id: string
  user: string | User
  cartItems: {
    product: Product
    quantity: number
  }[]
  totalQuantity: number
  createdAt: string
  updatedAt: string
}
