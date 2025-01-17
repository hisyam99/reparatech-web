'use client'

import React, { ReactNode, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import RouteProtection from '@/components/RouteProtection'
import { Home, Layers, Calendar, Folder, X, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigationItems = [
  { path: '/admin', label: 'Dashboard Admin', icon: Home },
  { path: '/admin/category', label: 'Manage Categories', icon: Folder },
  { path: '/admin/services/manage', label: 'Manage Services', icon: Layers },
  {
    path: '/admin/services/orders',
    label: 'Orders Management',
    icon: Calendar,
  },
]

interface NavItemProps {
  path: string
  label: string
  icon: React.ElementType
  isActive: boolean
  onClick?: () => void
}

const NavItem = ({
  path,
  label,
  icon: Icon,
  isActive,
  onClick,
}: NavItemProps) => (
  <li>
    <Link
      href={path}
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
        'hover:bg-base-300',
        isActive && 'bg-primary text-primary-content',
      )}>
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </Link>
  </li>
)

const BrandLogo = () => (
  <div className="p-4 text-2xl font-bold tracking-wide flex items-center gap-2">
    <span className="rounded-full bg-secondary w-8 h-8 flex items-center justify-center">
      <span className="text-xl">A</span>
    </span>
    <span>Admin Panel</span>
  </div>
)

interface AdminLayoutProps {
  children: ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()

  const closeSidebar = useCallback(() => setIsSidebarOpen(false), [])

  useEffect(() => {
    closeSidebar()
  }, [pathname, closeSidebar])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) closeSidebar()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [closeSidebar])

  return (
    <RouteProtection middleware="auth">
      <div className="min-h-screen bg-base-100">
        {/* Header (Mobile Only) */}
        <div className="md:hidden bg-base-200 p-4 flex items-center justify-between shadow-sm h-16 sticky top-16 z-10">
          <BrandLogo />
          <button
            onClick={() => setIsSidebarOpen(prev => !prev)}
            className="p-2 hover:bg-base-300 rounded-lg transition-colors"
            aria-label="Toggle navigation menu">
            {isSidebarOpen ? <X /> : <Menu />}
          </button>
        </div>

        <div className="flex flex-row relative">
          {/* Sidebar */}
          <aside
            className={cn(
              'bg-base-200 w-full md:w-64 flex-shrink-0 fixed md:sticky top-0 md:top-16 z-10 h-auto md:h-[calc(100vh-4rem)] transition-transform duration-300',
              !isSidebarOpen && '-translate-y-full md:translate-y-0',
            )}
            style={{
              top: isSidebarOpen ? '8rem' : undefined, // Menyesuaikan posisi top sesuai tinggi header di mode mobile
            }}>
            <div className="hidden md:block">
              <BrandLogo />
            </div>

            <nav className="flex-1 overflow-y-auto">
              <ul className="menu p-4 gap-2">
                {navigationItems.map(item => (
                  <NavItem
                    key={item.path}
                    {...item}
                    isActive={pathname === item.path}
                    onClick={closeSidebar}
                  />
                ))}
              </ul>
            </nav>
          </aside>

          {/* Backdrop for Sidebar (Mobile Only) */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 md:hidden"
              onClick={closeSidebar}
            />
          )}

          {/* Main Content */}
          <main className="flex-1 p-4 md:p-6 overflow-x-hidden w-full md:px-0">
            <div className="max-w-full mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </RouteProtection>
  )
}

export default AdminLayout
