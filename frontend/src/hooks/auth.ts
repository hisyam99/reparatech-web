import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'
import { useRouter, useParams } from 'next/navigation'

export const useAuth = ({
  middleware,
  redirectIfAuthenticated,
}: {
  middleware?: string
  redirectIfAuthenticated?: string
}) => {
  const router = useRouter()
  const params = useParams()
  const [isLoading, setIsLoading] = useState(true)

  // Fetch data user dari API (pastikan URL API benar)
  const {
    data: user,
    error,
    mutate,
    isLoading: isSWRLoading,
  } = useSWR('/api/user', () =>
    axios
      .get('http://localhost:8000/api/user') // pastikan URL lengkap ke server backend kamu
      .then(res => {
        const userData = res.data
        return {
          ...userData,
          role: userData.role || 'user',
        }
      })
      .catch(error => {
        if (error.response?.status !== 409) {
          throw error
        }
        router.push('/verify-email') // Redirect jika email belum diverifikasi
      }),
  )

  // Meminta CSRF cookie sebelum melakukan login atau registrasi
  const csrf = () => axios.get('http://localhost:8000/sanctum/csrf-cookie')

  // Fungsi register
  const register = async (data: {
    name: string
    email: string
    password: string
    password_confirmation: string
  }) => {
    try {
      await csrf()
      await axios.post('http://localhost:8000/register', data) // Kirim data register
      mutate()
    } catch (error) {
      throw error
    }
  }

  // Fungsi login
  const login = async (data: {
    email: string
    password: string
    remember: boolean
  }) => {
    try {
      await csrf()
      await axios.post('http://localhost:8000/login', data) // Kirim data login
      mutate()
    } catch (error) {
      throw error
    }
  }

  // Fungsi untuk lupa password
  const forgotPassword = async (data: {
    email: string
  }): Promise<AxiosResponse> => {
    try {
      await csrf()
      return await axios.post('http://localhost:8000/forgot-password', data) // Kirim email untuk reset password
    } catch (error) {
      throw error
    }
  }

  // Fungsi reset password
  const resetPassword = async (data: {
    email: string
    password: string
    password_confirmation: string
  }) => {
    try {
      await csrf()
      const response = await axios.post('http://localhost:8000/reset-password', {
        ...data,
        token: params.token, // Gunakan token yang ada pada URL
      })
      router.push('/login?reset=' + btoa(response.data.status)) // Redirect ke halaman login
    } catch (error) {
      throw error
    }
  }

  // Fungsi untuk mengirim ulang verifikasi email
  const resendEmailVerification = async () => {
    try {
      return await axios.post('http://localhost:8000/email/verification-notification') // Kirim ulang email verifikasi
    } catch (error) {
      throw error
    }
  }

  // Fungsi logout
  const logout = async () => {
    if (!error) {
      await axios.post('http://localhost:8000/logout').then(() => mutate()) // Logout dan update state user
    }
    window.location.pathname = '/login' // Redirect ke halaman login setelah logout
  }

  // Mengecek apakah user memiliki role tertentu
  const hasRole = (role: string): boolean => {
    return user?.role === role
  }

  // Mengecek apakah halaman adalah route admin
  const isAdminRoute = (): boolean => {
    return window.location.pathname.startsWith('/admin')
  }

  // Menjalankan logika middleware dan redirect saat user sudah terautentikasi
  useEffect(() => {
    if (!isSWRLoading) {
      if (middleware === 'guest' && redirectIfAuthenticated && user) {
        router.push(redirectIfAuthenticated)
        return
      }

      if (
        window.location.pathname === '/verify-email' &&
        user?.email_verified_at &&
        redirectIfAuthenticated
      ) {
        router.push(redirectIfAuthenticated)
        return
      }

      if (middleware === 'auth' && error) {
        logout()
        return
      }

      if (
        middleware === 'auth' &&
        user &&
        isAdminRoute() &&
        !hasRole('admin')
      ) {
        router.push('/unauthorized') // Jika user tidak memiliki akses admin
        return
      }

      setIsLoading(false) // Set loading selesai setelah user terverifikasi
    }
  }, [user, error, middleware, redirectIfAuthenticated, isSWRLoading])

  return {
    user,
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
    isLoading,
  }
}
