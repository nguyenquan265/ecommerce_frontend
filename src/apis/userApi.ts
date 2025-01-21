import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import authorizedAxios from '@/axios/authorizedAxios'
import { LoginFormValues } from '@/pages/Login'
import { SignUpFormValues } from '@/pages/SignUp'
import { User } from '@/types'

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
    localStorage.setItem('userInfo', JSON.stringify(res.data.user))

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
    localStorage.setItem('userInfo', JSON.stringify(res.data.user))

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
    localStorage.setItem('userInfo', JSON.stringify(res.data.user))

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
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('userInfo')
}

export const useRefreshToken = async (refreshToken: string) => {
  return await authorizedAxios.patch('/auth/refresh-token', {
    refreshToken
  })
}
