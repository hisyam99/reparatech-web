// File 1: /frontend/src/app/(authenticated)/admin/layout.tsx

'use client'

import React, { ReactNode, useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import RouteProtection from '@/components/RouteProtection'
import {
  Home,
  Layers,
  Calendar,
  Users,
  MessageSquare,
  Menu,
  X,
  Folder, // Import icon for categories
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Navigation items configuration
const navigationItems = [
  {
    path: '/admin',
    label: 'Dashboard',
    icon: Home,
  },
  {
    path: '/admin/category',
    label: 'Manage Categories',
    icon: Folder, // Icon for Manage Categories
  },
  {
    path: '/admin/services/manage',
    label: 'Manage Services',
    icon: Layers,
  },
  {
    path: '/admin/services/orders',
    label: 'Orders Management',
    icon: Calendar,
  },
  // Commented items can be uncommented when needed
  // {
  //   path: '/admin/customers',
  //   label: 'Customer Management',
  //   icon: Users
  // },
  // {
  //   path: '/admin/testimonials',
  //   label: 'Testimonials Management',
  //   icon: MessageSquare
  // }
]

interface NavItemProps {
  path: string
  label: string
  icon: React.ElementType
  isActive: boolean
  onClick?: () => void
}

// Navigation Item Component
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

// Brand Logo Component
const BrandLogo = ({
  showTitleOnMobile = false,
}: {
  showTitleOnMobile?: boolean
}) => (
  <div className="p-4 text-2xl font-bold tracking-wide flex items-center gap-2">
    <span className="rounded-full bg-secondary w-8 h-8 flex items-center justify-center">
      <span className="text-xl">A</span>
    </span>
    <span className={showTitleOnMobile ? 'inline' : 'hidden md:inline'}>
      Admin Panel
    </span>
  </div>
)

interface AdminLayoutProps {
  children: ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setIsSidebarOpen(false)
  }, [pathname])

  // Close sidebar when screen size becomes larger
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <RouteProtection middleware="auth">
      <div className="min-h-screen bg-base-100 flex flex-col md:flex-row relative">
        {/* Mobile Header */}
        <header className="md:hidden bg-base-200 p-4 flex items-center justify-between">
          <BrandLogo showTitleOnMobile={true} />
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-base-300 rounded-lg transition-colors"
            aria-label="Toggle navigation menu">
            {isSidebarOpen ? <X /> : <Menu />}
          </button>
        </header>

        {/* Sidebar */}
        <aside
          className={cn(
            'bg-base-200 w-full md:w-64 flex-shrink-0',
            'fixed md:static inset-0 z-20 transition-transform duration-300',
            'flex flex-col h-[calc(100vh-4rem)] md:h-screen',
            !isSidebarOpen && '-translate-x-full md:translate-x-0',
          )}>
          {/* Desktop Brand Logo */}
          <div className="hidden md:block">
            <BrandLogo />
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto">
            <ul className="menu p-4 gap-2">
              {navigationItems.map(item => (
                <NavItem
                  key={item.path}
                  {...item}
                  isActive={pathname === item.path}
                  onClick={() => setIsSidebarOpen(false)}
                />
              ))}
            </ul>
          </nav>
        </aside>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-10 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </RouteProtection>
  )
}

export default AdminLayout
