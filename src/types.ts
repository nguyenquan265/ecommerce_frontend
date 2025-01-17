export type User = {
  _id: string
  name: string
  firstName?: string
  lastName?: string
  email: string
  phoneNumber?: string
  photoUrl?: string
  rule: number
  address?: string
  isGoogleAccount: boolean
  isActive: boolean
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
