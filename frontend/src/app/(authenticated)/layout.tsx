'use client'
import { ReactNode } from 'react'
import { useAuth } from '@/hooks/auth'
import Navigation from '@/components/Layouts/Navigation'

const AppLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth({ middleware: 'auth' })

  return (
    <div className="min-h-screen bg-base-100">
      <main className="container mx-auto p-4">{children}</main>
    </div>
  )
}

export default AppLayout
