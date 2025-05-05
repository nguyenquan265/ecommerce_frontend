import {
  Truck,
  CreditCard,
  RotateCcw,
  HeadphonesIcon,
  Box,
  Folder,
  LayoutDashboard,
  Package,
  Users,
  Wallet,
  QrCode,
  BanknoteIcon,
  CornerUpLeft
} from 'lucide-react'
import About1 from '@/assets/about1.jpg'
import About2 from '@/assets/about2.jpg'
import About3 from '@/assets/about3.jpg'
import BietThuQuan9 from '@/assets/bietthuquan9.jpg'
import BietThuTanPhu from '@/assets/bietthutanphu.jpg'
import CafeThaoDien from '@/assets/cafethaodien.jpg'
import DaiHocRmit from '@/assets/daihocrmit.jpg'
import KhachSanDaLat from '@/assets/khachsandalat.jpg'
import VinHomeGrandPark from '@/assets/vinhomegrandpark.jpg'

export const errorMessages: Record<string, string> = {
  'Not authorized to perform this action': 'Không có quyền thực hiện hành động này.',
  'Email already exists': 'Email đã tồn tại. Vui lòng chọn email khác.',
  'Invalid phone number': 'Số điện thoại không hợp lệ. Vui lòng kiểm tra lại.',
  'Please provide name, email and password': 'Vui lòng nhập đầy đủ thông tin.',
  'Please provide email and password': 'Vui lòng nhập email và mật khẩu.',
  'Invalid credentials': 'Thông tin đăng nhập không chính xác.',
  'Please login with Google': 'Vui lòng đăng nhập bằng Google.',
  'User is not active': 'Tài khoản chưa được kích hoạt.',
  'User not found': 'Tài khoản không tồn tại.',
  'Please provide name and phone number': 'Vui lòng nhập tên và số điện thoại.',
  'Please provide current password and new password': 'Vui lòng nhập mật khẩu hiện tại và mật khẩu mới.',
  'Invalid current password': 'Mật khẩu hiện tại không chính xác.',
  'Please provide productId': 'Vui lòng nhập productId.',
  'Product already in wishlist': 'Sản phẩm đã có trong danh sách yêu thích.',
  'Category name is required': 'Vui lòng nhập tên danh mục.',
  'Category ID is required': 'Vui lòng nhập ID danh mục.',
  'Category not found': 'Danh mục không tồn tại.',
  'Category has products, cannot delete': 'Danh mục đã có sản phẩm, không thể xóa.',
  'Product not found': 'Sản phẩm không tồn tại.',
  'Out of stock': 'Hết hàng.',
  'Product not in cart': 'Sản phẩm không có trong giỏ hàng.',
  'Email is required': 'Vui lòng nhập email.',
  'Password and confirm password are required': 'Vui lòng nhập mật khẩu và xác nhận mật khẩu.',
  'Passwords do not match': 'Mật khẩu không khớp.',
  'Invalid or expired reset password token': 'Token đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.',
  'Quantity cannot be negative': 'Số lượng không thể âm.',
  'You are not allowed to cancel this order': 'Bạn không được phép hủy đơn hàng này.',
  'Order is already paid': 'Đơn hàng đã được thanh toán. Không thể hủy.',
  'Order not found': 'Đơn hàng không tồn tại.',
  'Please reset password with Google': 'Vui lòng đặt lại mật khẩu bằng Google.'
}

export const features = [
  {
    image: About1,
    description:
      'Với hệ thống máy móc hiện đại và đội ngũ thợ lành nghề, chúng tôi cam kết mang đến những sản phẩm nội thất chất lượng cao, đảm bảo độ bền và tính thẩm mỹ.'
  },
  {
    image: About2,
    description: 'Để đảm bảo chất lượng và độ bền của sản phẩm nội thất, chúng tôi sử dụng hệ thống xử lý gỗ tiên tiến.'
  },
  {
    image: About3,
    description:
      'Tại đây, các sản phẩm được gia công tỉ mỉ từ khâu xử lý gỗ, cắt ghép, mài dũa cho đến hoàn thiện, đảm bảo chất lượng cao và độ bền vượt trội.'
  },
  {
    image: BietThuQuan9,
    description: 'Biệt thự Quận 9'
  },
  {
    image: BietThuTanPhu,
    description: 'Biệt thự Tân Phú'
  },
  {
    image: CafeThaoDien,
    description: 'Cafe Thảo Điền'
  },
  {
    image: DaiHocRmit,
    description: 'Đại học RMIT'
  },
  {
    image: KhachSanDaLat,
    description: 'Khách sạn Đà Lạt'
  },
  {
    image: VinHomeGrandPark,
    description: 'VinHome Grand Park'
  }
]

export const brands = [
  {
    name: 'Brand 1',
    logo: 'https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2024/04/brand-01-min.png'
  },
  {
    name: 'Brand 2',
    logo: 'https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/brand-03-min.png'
  },
  {
    name: 'Brand 3',
    logo: 'https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/brand-04-min.png'
  },
  {
    name: 'Brand 4',
    logo: 'https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/brand-05-min.png'
  },
  {
    name: 'Brand 5',
    logo: 'https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/brand-02-min.png'
  }
]

export const faqs = [
  {
    question: 'Feugiat purus mi nisl dolor pellentesque tellus?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.'
  },
  {
    question: 'Suspendisse nunc sagittis adipiscing imperdiet turpis sodales massa convallis elit?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.'
  },
  {
    question: 'Facilisis adipiscing lacus, nisl et in consectetur in?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.'
  }
]

export const paymentMethods = [
  { name: 'COD', icon: BanknoteIcon },
  { name: 'ZALO', icon: Wallet },
  { name: 'MOMO', icon: CreditCard },
  { name: 'SEPAY', icon: QrCode }
]

export const navigateItems = [
  { href: '/', label: 'Trang chủ' },
  { href: '/shop', label: 'Sản phẩm' },
  { href: '/about', label: 'Giới thiệu' },
  { href: '/contact', label: 'Liên hệ' },
  { href: '/compare', label: 'So sánh' }
]

export const overviewFeatures = [
  { icon: Truck, title: 'Vận chuyển nhanh nhất', description: 'Đặt hàng với giá $39' },
  { icon: CreditCard, title: 'Thanh toán an toàn 100%', description: 'Trả góp 9 tháng' },
  { icon: RotateCcw, title: 'Trả hàng trong 14 ngày', description: 'Mua sắm một cách tự tin' },
  { icon: HeadphonesIcon, title: 'Hỗ trợ trực tuyến 24/7', description: 'Giao tận nhà' }
]

const orderStatusMap: Record<string, string> = {
  Pending: 'Chờ xử lý',
  Processing: 'Đang xử lý',
  Delivering: 'Đang giao hàng',
  Delivered: 'Đã giao hàng',
  Cancelled: 'Đã hủy'
}

export const getStatusLabel = (status: string): string => {
  return orderStatusMap[status] || 'Không xác định'
}

export const adminNavItems = [
  {
    title: 'Trang chủ',
    href: '/admin',
    icon: LayoutDashboard
  },
  {
    title: 'Quản lý người dùng',
    href: '/admin/users',
    icon: Users
  },
  {
    title: 'Quản lý danh mục',
    href: '/admin/categories',
    icon: Folder
  },
  {
    title: 'Quản lý sản phẩm',
    href: '/admin/products',
    icon: Box
  },
  {
    title: 'Quản lý đơn hàng',
    href: '/admin/orders',
    icon: Package
  },
  {
    title: 'Quay lại',
    href: '/',
    icon: CornerUpLeft
  }
]

export const orderPaymentMethodOptions = ['COD', 'ZALO', 'MOMO', 'PAYOS']

const orderPaymentMethodMap: Record<string, string> = {
  COD: 'COD',
  ZALO: 'Zalo Pay',
  MOMO: 'Momo',
  PAYOS: 'PayOs'
}

export const getPaymentMethodLabel = (method: string): string => {
  return orderPaymentMethodMap[method] || 'Không xác định'
}

export const orderStatusOptions = ['Pending', 'Processing', 'Delivering', 'Delivered', 'Cancelled']

export const orderTimeOptions = ['today', 'yesterday', 'thisWeek', 'thisMonth', 'thisYear']

const orderTimeMap: Record<string, string> = {
  today: 'Hôm nay',
  yesterday: 'Hôm qua',
  thisWeek: 'Tuần này',
  thisMonth: 'Tháng này',
  thisYear: 'Năm nay'
}

export const getOrderTimeLabel = (time: string): string => {
  return orderTimeMap[time] || 'Không xác định'
}
