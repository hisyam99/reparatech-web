'use client'

import React, { ReactNode } from 'react'
import RouteProtection from '@/components/RouteProtection'

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <RouteProtection middleware="auth">
      <div className="min-h-screen bg-base-100">
        <main className="container mx-auto p-4">{children}</main>
      </div>
    </RouteProtection>
  )
}

export default AdminLayout
