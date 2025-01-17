'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/auth'
import { ChevronDown, Menu, X } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import ThemeChange from '../ThemeChange'

const NavigationLink = ({ href, children, className = '' }: { href: string; children: React.ReactNode; className?: string }) => {
  const pathname = usePathname()
  const isActive = pathname === href
  
  return (
    <Link 
      href={href}
      className={`${className} ${isActive ? 'active' : ''} hover:bg-base-300 px-4 py-2 rounded-lg transition-colors`}>
      {children}
    </Link>
  )
}

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user } = useAuth({ middleware: 'guest' })
  const { logout } = useAuth({})

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/#fitur', label: 'Fitur' },
    { href: '/services', label: 'Layanan' },
    { href: '/#kontak', label: 'Kontak' }
  ]

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  return (
    <div className="bg-base-100 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <nav className="navbar min-h-16">
          {/* Logo */}
          <div className="flex-1 lg:flex-none">
            <Link href="/" className="btn btn-ghost normal-case text-xl px-0 lg:px-4">
              ReparaTech
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex-none lg:hidden">
            <button
              className="btn btn-square btn-ghost"
              onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 justify-center">
            <ul className="menu menu-horizontal bg-base-200 rounded-lg">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <NavigationLink href={link.href}>
                    {link.label}
                  </NavigationLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Right Menu */}
          <div className="hidden lg:flex justify-end items-center gap-4">
            <ThemeChange />
            {user ? (
              <div className="flex items-center gap-2">
                {/* Dashboard & Admin Links */}
                <ul className="menu menu-horizontal">
                  <li>
                    <NavigationLink href="/dashboard">
                      Dashboard
                    </NavigationLink>
                  </li>
                  {user.role === 'admin' && (
                    <li>
                      <NavigationLink href="/admin">
                        Admin Panel
                      </NavigationLink>
                    </li>
                  )}
                </ul>

                {/* User Dropdown */}
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user?.avatar || '/default-avatar.png'}
                        alt={user?.name || 'User avatar'}
                      />
                      <AvatarFallback>
                        {user?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="h-4 w-4" />
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-200 rounded-box w-52 p-2 shadow-lg mt-2">
                    <li className="menu-title">
                      <span>{user?.name}</span>
                      <span className="text-xs opacity-60">{user?.email}</span>
                    </li>
                    <li>
                      <button 
                        onClick={logout}
                        className="text-error hover:bg-error hover:text-error-content">
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  href="/register"
                  className="btn btn-outline btn-primary">
                  Register
                </Link>
                <Link
                  href="/login"
                  className="btn btn-primary">
                  Login
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="flex flex-col gap-4 py-4">
              {/* Mobile Navigation Links */}
              <ul className="menu bg-base-200 rounded-lg w-full">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <NavigationLink 
                      href={link.href}
                      className="w-full">
                      {link.label}
                    </NavigationLink>
                  </li>
                ))}
              </ul>

              {/* Mobile User Menu */}
              {user ? (
                <div className="flex flex-col gap-2">
                  <ul className="menu bg-base-200 rounded-lg w-full">
                    <li>
                      <NavigationLink href="/dashboard">
                        Dashboard
                      </NavigationLink>
                    </li>
                    {user.role === 'admin' && (
                      <li>
                        <NavigationLink href="/admin">
                          Admin Panel
                        </NavigationLink>
                      </li>
                    )}
                    <li className="menu-title pt-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={user?.avatar || '/default-avatar.png'}
                            alt={user?.name || 'User avatar'}
                          />
                          <AvatarFallback>
                            {user?.name?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span>{user?.name}</span>
                          <span className="text-xs opacity-60">{user?.email}</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <button 
                        onClick={logout}
                        className="text-error hover:bg-error hover:text-error-content">
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/register"
                    className="btn btn-outline btn-primary w-full">
                    Register
                  </Link>
                  <Link
                    href="/login"
                    className="btn btn-primary w-full">
                    Login
                  </Link>
                </div>
              )}

              {/* Mobile Theme Toggle */}
              <div className="flex justify-center">
                <ThemeChange />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navigation