import { createContext, useContext, ReactNode } from 'react'
import { User } from '@/types'
import { useGetCurrentUser } from '@/apis/userApi'

type UserContextType = {
  currentUser?: User
  isUserLoading: boolean
}

const UserContext = createContext<UserContextType>({
  currentUser: undefined,
  isUserLoading: true
})

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { user, isLoading } = useGetCurrentUser()

  return (
    <UserContext.Provider
      value={{
        currentUser: user,
        isUserLoading: isLoading
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider')
  }

  return context
}
