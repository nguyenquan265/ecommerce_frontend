import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import authorizedAxios from '@/axios/authorizedAxios'

import { User } from '@/types'
import { LoginFormValues } from '@/pages/Login'
import { SignUpFormValues } from '@/pages/SignUp'
import { UserProfileFormValues } from '@/components/forms/UserProfileForm'
import { ForgotPasswordFormValues } from '@/pages/ForgotPassword'
import { ResetPasswordFormValues } from '@/pages/ResetPassword'
import { UserFormValues } from '@/components/forms/admin/UserForm'

// default user
export const useGetCurrentUser = () => {
  const createGetUserRequest = async (): Promise<User> => {
    const res = await authorizedAxios.get('/auth/check-auth')

    return res.data.user
  }

  const { data: user, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: createGetUserRequest
  })

  return { user, isLoading }
}

export const useLogin = () => {
  const queryClient = useQueryClient()

  const createLoginRequest = async (data: LoginFormValues) => {
    const res = await authorizedAxios.post('/auth/login', data)

    localStorage.setItem('accessToken', res.data.accessToken)
    localStorage.setItem('refreshToken', res.data.refreshToken)

    return res.data
  }

  const { mutateAsync: login, isPending } = useMutation({
    mutationFn: createLoginRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] })
    }
  })

  return { login, isPending }
}

export const useGoogleLogin = () => {
  const queryClient = useQueryClient()

  const createGoogleLoginRequest = async (data: { name: string; email: string; photoUrl: string }) => {
    const res = await authorizedAxios.post('/auth/google-login', data)

    localStorage.setItem('accessToken', res.data.accessToken)
    localStorage.setItem('refreshToken', res.data.refreshToken)

    return res.data
  }

  const { mutateAsync: googleLogin, isPending } = useMutation({
    mutationFn: createGoogleLoginRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] })
    }
  })

  return { googleLogin, isPending }
}

export const useSignUp = () => {
  const queryClient = useQueryClient()

  const createSignUpRequest = async (data: SignUpFormValues) => {
    const res = await authorizedAxios.post('/auth/sign-up', data)

    localStorage.setItem('accessToken', res.data.accessToken)
    localStorage.setItem('refreshToken', res.data.refreshToken)

    return res.data
  }

  const { mutateAsync: signUp, isPending } = useMutation({
    mutationFn: createSignUpRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] })
    }
  })

  return { signUp, isPending }
}

export const useLogout = () => {
  const queryClient = useQueryClient()

  const createLogoutRequest = async () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
  }

  const { mutateAsync: logout } = useMutation({
    mutationFn: createLogoutRequest,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['currentUser'] })
    }
  })

  return { logout }
}

export const useRefreshToken = async (refreshToken: string) => {
  return await authorizedAxios.patch('/auth/refresh-token', {
    refreshToken
  })
}

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient()

  const createUpdateUserProfileRequest = async (data: UserProfileFormValues): Promise<User> => {
    const res = await authorizedAxios.patch('/auth/me/update-profile', data)

    return res.data.user
  }

  const { mutateAsync: updateUserProfile, isPending } = useMutation({
    mutationFn: createUpdateUserProfileRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] })
      toast.success('Cập nhật thông tin thành công.')
    }
  })

  return { updateUserProfile, isPending }
}

export const useChangeUserPassword = () => {
  const createChangeUserPasswordRequest = async (data: { currentPassword: string; newPassword: string }) => {
    await authorizedAxios.patch('/auth/me/update-password', data)
  }

  const { mutateAsync: changeUserPassword, isPending } = useMutation({
    mutationFn: createChangeUserPasswordRequest,
    onSuccess: () => {
      toast.success('Đổi mật khẩu thành công.')
    }
  })

  return { changeUserPassword, isPending }
}

export const useAddToWishlist = () => {
  const queryClient = useQueryClient()

  const createAddToWishlistRequest = async (productId: string) => {
    await authorizedAxios.patch('/auth/me/add-to-wishlist', { productId })
  }

  const { mutateAsync: addToWishlist, isPending } = useMutation({
    mutationFn: createAddToWishlistRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] })
      toast.success('Đã thêm sản phẩm vào mục yêu thích.')
    }
  })

  return { addToWishlist, isPending }
}

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient()

  const createRemoveFromWishlistRequest = async (productId: string) => {
    await authorizedAxios.patch('/auth/me/remove-from-wishlist', { productId })
  }

  const { mutateAsync: removeFromWishlist, isPending } = useMutation({
    mutationFn: createRemoveFromWishlistRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] })
    }
  })

  return { removeFromWishlist, isPending }
}

export const useForgotPassword = () => {
  const createForgotPasswordRequest = async (data: ForgotPasswordFormValues) => {
    await authorizedAxios.post('/auth/forgot-password', data)
  }

  const { mutateAsync: forgotPassword, isPending } = useMutation({
    mutationFn: createForgotPasswordRequest,
    onSuccess: () => {
      toast.success('Vui lòng kiểm tra email để đặt lại mật khẩu.')
    }
  })

  return { forgotPassword, isPending }
}

export const useResetPassword = () => {
  const createResetPasswordRequest = async (data: ResetPasswordFormValues) => {
    await authorizedAxios.post('/auth/reset-password', data)
  }

  const { mutateAsync: resetPassword, isPending } = useMutation({
    mutationFn: createResetPasswordRequest,
    onSuccess: () => {
      toast.success('Đặt lại mật khẩu thành công.')
    }
  })

  return { resetPassword, isPending }
}

// admin
export const useGetAllUsers = (params: { page?: number; limit?: number; searchString?: string; sortBy?: string }) => {
  const createGetUsersRequest = async (): Promise<{
    users: User[]
    pagination: { totalUsers: number; totalPages: number; currentPage: number; limit: number }
  }> => {
    const res = await authorizedAxios.get('/users/admin', { params })

    return res.data
  }

  const { data, isLoading } = useQuery({
    queryKey: ['users', params],
    queryFn: createGetUsersRequest
  })

  return { users: data?.users, pagination: data?.pagination, isLoading }
}

export const useGetUser = (userId: string = '') => {
  const createGetUserRequest = async (): Promise<User> => {
    const res = await authorizedAxios.get(`/users/admin/${userId}`)

    return res.data.user
  }

  const { data, isLoading } = useQuery({
    queryKey: ['user', { userId }],
    queryFn: createGetUserRequest,
    enabled: userId === 'new' ? false : !!userId
  })

  return { user: data, isLoading }
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()

  const createCreateUserRequest = async (data: UserFormValues): Promise<User> => {
    const res = await authorizedAxios.post('/users', data)

    return res.data.user
  }

  const { mutateAsync: createUser, isPending } = useMutation({
    mutationFn: createCreateUserRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.invalidateQueries({ queryKey: ['shopOverview'] })
      toast.success('Tạo người dùng thành công.')
    }
  })

  return { createUser, isPending }
}

export const useUpdateUser = (userId: string = '') => {
  const queryClient = useQueryClient()

  const createUpdateUserRequest = async (data: UserFormValues): Promise<User> => {
    const res = await authorizedAxios.patch(`/users/${userId}`, data)

    return res.data.user
  }

  const { mutateAsync: updateUser, isPending } = useMutation({
    mutationFn: createUpdateUserRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.invalidateQueries({ queryKey: ['user', { userId }] })
      toast.success('Cập nhật người dùng thành công.')
    }
  })

  return { updateUser, isPending }
}

export const useDeleteUser = (userId: string = '') => {
  const queryClient = useQueryClient()

  const createDeleteUserRequest = async (): Promise<User> => {
    const res = await authorizedAxios.delete(`/users/${userId}`)

    return res.data
  }

  const { mutateAsync: deleteUser, isPending } = useMutation({
    mutationFn: createDeleteUserRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.removeQueries({ queryKey: ['user', { userId }] })
      queryClient.invalidateQueries({ queryKey: ['shopOverview'] })
      toast.success('Xóa người dùng thành công.')
    }
  })

  return { deleteUser, isPending }
}
