"use client"

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/auth'
import { ChevronDown } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import ThemeChange from '../ThemeChange'

const Navigation = () => {
  const pathname = usePathname()
  const { user } = useAuth({ middleware: 'guest' })

  const { logout } = useAuth({})

  return (
    <div className="border-b bg-base-100">
      <div className="container mx-auto">
        <nav className="navbar flex items-center">
          {/* Logo Section */}
          <div className="flex-1">
            <Link href="/" className="btn btn-ghost text-xl">
              ReparaTech
            </Link>
          </div>

          {/* Centered Menu */}
          <div className="flex-1 flex justify-center">
            <ul className="menu menu-horizontal px-1 bg-base-200 rounded-lg">
              <li>
                <Link href="/">Beranda</Link>
              </li>
              <li>
                <Link href="/fitur">Fitur</Link>
              </li>
              <li>
                <Link href="/layanan">Layanan</Link>
              </li>
              <li>
                <Link href="/testimoni">Testimoni</Link>
              </li>
              <li>
                <Link href="/kontak">Kontak</Link>
              </li>
            </ul>
          </div>

          {/* Right Menu */}
          <div className="flex-1 flex justify-end items-center gap-4">
            <ThemeChange />
            {user ? (
              <>
                <ul className="menu menu-horizontal px-1">
                  <li>
                    <Link
                      href="/dashboard"
                      className={pathname === '/dashboard' ? 'active' : ''}>
                      Dashboard
                    </Link>
                  </li>
                </ul>
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
                    className="dropdown-content menu bg-base-200 rounded-box z-10 w-52 p-2 shadow-lg">
                    <li className="menu-title">
                      <span>{user?.name}</span>
                      <span className="text-xs opacity-60">{user?.email}</span>
                    </li>
                    <li>
                      <button onClick={logout}>Logout</button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <ul className="menu menu-horizontal px-1">
                <li>
                  <Link
                    href="/register"
                    className={pathname === '/register' ? 'active' : ''}>
                    Register
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className={pathname === '/login' ? 'active' : ''}>
                    Login
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navigation
