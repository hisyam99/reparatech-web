// File: /frontend/src/app/(authenticated)/admin/layout.tsx

'use client'

import React, { ReactNode } from 'react'
import RouteProtection from '@/components/RouteProtection'
import { Home, Layers, Calendar, Users, MessageSquare } from 'lucide-react'

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <RouteProtection middleware="auth">
      <div className="flex min-h-screen bg-base-100">
        {/* Sidebar */}
        <aside className="w-64 bg-base-200 flex flex-col justify-between">
          <div>
            {/* Brand Logo */}
            <div className="p-4 text-2xl font-bold tracking-wide flex items-center gap-2">
              <span className="rounded-full bg-secondary w-8 h-8 flex items-center justify-center">
                <span className="text-xl">A</span>
              </span>
              Admin Panel
            </div>

            {/* Navigation Menu */}
            <nav className="mt-4">
              <ul className="menu p-4">
                <li>
                  <a className="flex items-center gap-2" href="/admin">
                    <Home className="text-xl" />
                    Dashboard
                  </a>
                </li>
                <li>
                  <a className="flex items-center gap-2" href="/admin/services/manage">
                    <Layers className="text-xl" />
                    Manage Services
                  </a>
                </li>
                <li>
                  <a className="flex items-center gap-2" href="/admin/services/orders">
                    <Calendar className="text-xl" />
                    Orders Management
                  </a>
                </li>
                {/* <li>
                  <a
                    className="flex items-center gap-2"
                    href="/admin/customers">
                    <Users className="text-xl" />
                    Customer Management
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center gap-2"
                    href="/admin/testimonials">
                    <MessageSquare className="text-xl" />
                    Testimonials Management
                  </a>
                </li> */}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 container mx-auto p-4">{children}</main>
      </div>
    </RouteProtection>
  )
}

export default AdminLayout
