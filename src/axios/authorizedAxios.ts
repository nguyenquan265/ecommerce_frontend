import axios from 'axios'
import { useRefreshToken } from '@/apis/userApi'
import { toast } from 'sonner'

const API_BASE_URL = import.meta.env.VITE_SERVER_URL

let authorizedAxios = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

authorizedAxios.defaults.timeout = 1000 * 60 * 10
authorizedAxios.defaults.withCredentials = true

authorizedAxios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken')

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

let refreshTokenPromise: any = null

authorizedAxios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const originalRequest = error.config

    if (
      error.response.status === 401 &&
      (error.response.data.message === 'Unauthorized! (Access token invalid)' ||
        error.response.data.message === 'Unauthorized! (Access token not found)')
    ) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    }

    if (
      error.response.status === 401 &&
      error.response.data.message === 'Unauthorized! (Access token expired)' &&
      originalRequest
    ) {
      if (!refreshTokenPromise) {
        const refreshToken = localStorage.getItem('refreshToken')

        refreshTokenPromise = useRefreshToken(refreshToken as string)
          .then((res: any) => {
            const { accessToken } = res.data

            localStorage.setItem('accessToken', accessToken)
            authorizedAxios.defaults.headers.Authorization = `Bearer ${accessToken}`
          })
          .catch((_error: any) => {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')

            return Promise.reject(_error)
          })
          .finally(() => {
            refreshTokenPromise = null
          })
      }

      return refreshTokenPromise.then(() => {
        return authorizedAxios(originalRequest)
      })
    }

    if (error.response.status !== 401) {
      console.log('Not Show Error: ', error)

      if (!error.response.data.message) {
        toast.error('Đã xảy ra lỗi. Vui lòng thử lại sau')
      }
    }

    return Promise.reject(error)
  }
)

export default authorizedAxios
