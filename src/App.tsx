import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'

import MainLayout from './components/layout/MainLayout'
import {
  About,
  Account,
  Cart,
  Categories,
  Compare,
  Contact,
  Dashboard,
  ForgotPassword,
  Home,
  Login,
  Orders,
  Products,
  ResetPassword,
  Shop,
  SignUp,
  SingleAdminProduct,
  SingleOrder,
  SingleProduct,
  SingleUser,
  Users,
  WishList
} from './pages'

import ChangePasswordForm from './components/forms/ChangePasswordForm'
import UserOrder from './components/shared/UserOrder'
import UserProfileForm from './components/forms/UserProfileForm'
import AdminLayout from './components/layout/AdminLayout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/shop',
        element: <Shop />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/compare',
        element: <Compare />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/wishlist',
        element: <WishList />
      },
      {
        path: '/account',
        element: <Account />,
        children: [
          {
            index: true,
            element: <UserProfileForm from='profile' />
          },
          {
            path: '/account/password',
            element: <ChangePasswordForm />
          },
          {
            path: '/account/orders',
            element: <UserOrder />
          }
        ]
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/sign-up',
        element: <SignUp />
      },
      {
        path: '/product',
        element: <Navigate to='/shop' />
      },
      {
        path: '/product/:productId',
        element: <SingleProduct />
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />
      },
      {
        path: '/reset-password',
        element: <Navigate to='/' />
      },
      {
        path: '/reset-password/:token',
        element: <ResetPassword />
      }
    ]
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: '/admin/users',
        element: <Users />
      },
      {
        path: '/admin/users/:userId',
        element: <SingleUser />
      },
      {
        path: '/admin/products',
        element: <Products />
      },
      {
        path: '/admin/products/:productId',
        element: <SingleAdminProduct />
      },
      {
        path: '/admin/categories',
        element: <Categories />
      },
      {
        path: '/admin/orders',
        element: <Orders />
      },
      {
        path: '/admin/orders/:orderId',
        element: <SingleOrder />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to='/' />
  }
])

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Analytics />
    </>
  )
}

export default App
