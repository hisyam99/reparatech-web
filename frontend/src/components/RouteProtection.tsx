// File: /frontend/src/components/RouteProtection.tsx
import { useAuth } from '@/hooks/auth'
import { ReactNode } from 'react'

interface RouteProtectionProps {
  children: ReactNode
  middleware?: string
  redirectIfAuthenticated?: string
}

export default function RouteProtection({
  children,
  middleware,
  redirectIfAuthenticated,
}: RouteProtectionProps) {
  const { isLoading } = useAuth({
    middleware,
    redirectIfAuthenticated,
  })

  if (isLoading) {
    // Anda bisa mengganti ini dengan loading spinner atau skeleton
    return null
  }

  return <>{children}</>
}
