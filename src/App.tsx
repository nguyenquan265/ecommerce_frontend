import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

import MainLayout from './components/layout/MainLayout'
import { About, Account, Cart, Compare, Contact, Home, Login, Shop, SignUp, WishList } from './pages'

const router = createBrowserRouter([
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
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/compare',
        element: <Compare />
      },
      {
        path: '/wishlist',
        element: <WishList />
      },
      {
        path: '/account',
        element: <Account />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/sign-up',
        element: <SignUp />
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
