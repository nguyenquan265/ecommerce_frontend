import { useEffect } from 'react'

import LoadingSpinner from '@/components/skeletons/LoadingSpinner'

import { useGetCurrentUser } from '@/apis/userApi'
import { useUserContext } from '@/contexts/UserContext'

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { user, isLoading } = useGetCurrentUser()
  const { setCurrentUser } = useUserContext()

  useEffect(() => {
    if (user) {
      setCurrentUser(user)
    } else {
      setCurrentUser(undefined)
    }
  }, [user])

  if (isLoading) {
    return <LoadingSpinner />
  }

  return children
}

export default AuthProvider
