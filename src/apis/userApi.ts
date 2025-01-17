import { useQuery, useMutation } from '@tanstack/react-query'
import authorizedAxios from '@/axios/authorizedAxios'

export const useGetCurrentUser = () => {
  const createGetUserRequest = async (): Promise<any> => {
    const res = await authorizedAxios.get('/auth/check-auth')

    return res.data.user
  }

  const { data: user, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: createGetUserRequest,
    staleTime: 0
  })

  return { user, isLoading }
}

export const useLogin = () => {
  const createLoginRequest = async (data: { email: string; password: string }) => {
    const res = await authorizedAxios.post('/auth/login', data)

    localStorage.setItem('accessToken', res.data.accessToken)
    localStorage.setItem('refreshToken', res.data.refreshToken)
    localStorage.setItem('userInfo', JSON.stringify(res.data.user))

    return res.data
  }

  const { mutateAsync: login, isPending } = useMutation({
    mutationFn: createLoginRequest
  })

  return { login, isPending }
}

export const useGoogleLogin = () => {
  const createGoogleLoginRequest = async (data: { name: string; email: string; photoUrl: string }) => {
    const res = await authorizedAxios.post('/auth/google-login', data)

    localStorage.setItem('accessToken', res.data.accessToken)
    localStorage.setItem('refreshToken', res.data.refreshToken)
    localStorage.setItem('userInfo', JSON.stringify(res.data.user))

    return res.data
  }

  const { mutateAsync: googleLogin, isPending } = useMutation({
    mutationFn: createGoogleLoginRequest
  })

  return { googleLogin, isPending }
}

export const useSignUp = () => {
  const createSignUpRequest = async (data: { name: string; email: string; password: string }) => {
    const res = await authorizedAxios.post('/auth/sign-up', data)

    localStorage.setItem('accessToken', res.data.accessToken)
    localStorage.setItem('refreshToken', res.data.refreshToken)
    localStorage.setItem('userInfo', JSON.stringify(res.data.user))

    return res.data
  }

  const { mutateAsync: signUp, isPending } = useMutation({
    mutationFn: createSignUpRequest
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
