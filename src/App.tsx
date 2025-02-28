import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

import MainLayout from './components/layout/MainLayout'
import {
  About,
  Account,
  Cart,
  Compare,
  Contact,
  ForgotPassword,
  Home,
  Login,
  ResetPassword,
  Shop,
  SignUp,
  SingleProduct,
  WishList
} from './pages'

import ChangePasswordForm from './components/forms/ChangePasswordForm'
import UserOrder from './components/shared/UserOrder'
import UserProfileForm from './components/forms/UserProfileForm'

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
    path: '*',
    element: <Navigate to='/' />
  }
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
