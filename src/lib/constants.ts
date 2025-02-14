import { Truck, CreditCard, RotateCcw, HeadphonesIcon } from 'lucide-react'

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
  'Invalid or expired reset password token': 'Token đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.'
}

export const features = [
  {
    image: 'https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image-min.jpg',
    description:
      'At urna cras augue nisi neque lauinis in aliquam. Odio pellentesque sed ultricies dolor amet nunc habitusse grave conec. Eur feugiat egestas eget.'
  },
  {
    image: 'https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image-copy-2-min.jpg',
    description:
      'Arcu volutpat sollicitudin sapien sit justo tellus eu fames senect. Faucibus et eu nulla adipiscing. Ipsum a morbi urtor ullamcorper sit semper.'
  },
  {
    image: 'https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image-copy-min.jpg',
    description:
      'Nibh luctus eu dignissim sit. Lorem netue ultrices neque elementum. Et convallis consectetur lacus luctus iaculis quisque sed.'
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

export const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact Us', href: '/contact' }
]

export const paymentMethods = [
  { name: 'American Express', image: '/placeholder.svg?height=30&width=47' },
  { name: 'Discover', image: '/placeholder.svg?height=30&width=47' },
  { name: 'Mastercard', image: '/placeholder.svg?height=30&width=47' },
  { name: 'PayPal', image: '/placeholder.svg?height=30&width=47' },
  { name: 'Visa', image: '/placeholder.svg?height=30&width=47' }
]

export const navigateItems = [
  { href: '/', label: 'Trang chủ' },
  { href: '/shop', label: 'Cửa hàng' },
  { href: '/about', label: 'Về chúng tôi' },
  { href: '/contact', label: 'Liên hệ' }
]

export const overviewFeatures = [
  { icon: Truck, title: 'Vận chuyển nhanh nhất', description: 'Đặt hàng với giá $39' },
  { icon: CreditCard, title: 'Thanh toán an toàn 100%', description: 'Trả góp 9 tháng' },
  { icon: RotateCcw, title: 'Trả hàng trong vòng 14 ngày', description: 'Mua sắm một cách tự tin' },
  { icon: HeadphonesIcon, title: 'Hỗ trợ trực tuyến 24/7', description: 'Giao tận nhà' }
]
