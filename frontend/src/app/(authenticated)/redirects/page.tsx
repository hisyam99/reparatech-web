// File: /frontend/src/pages/dashboard.tsx

'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/auth'
import { useEffect } from 'react'

const RedirectsPage = () => {
  const { user } = useAuth({ middleware: 'guest' })
  const router = useRouter()

  useEffect(() => {
    // Jika user belum login, arahkan ke halaman login
    if (!user) {
      router.push('/login')
      return
    }

    // Jika user adalah admin, arahkan ke /dashboard/admin
    if (user.role === 'admin') {
      router.push('/admin/dashboard')
    } else {
      // Jika bukan admin, arahkan ke /services
      router.push('/services')
    }
  }, [user, router])
}

export default RedirectsPage
