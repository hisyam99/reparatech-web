import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/auth'
import { UserType } from '@/types/User'
import { ChevronDown } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import ThemeChange from '../ThemeChange'

const Navigation = ({ user }: { user: UserType }) => {
  const pathname = usePathname()

  const { logout } = useAuth({})
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className="border-b bg-base-100">
      <div className="container mx-auto">
        <nav className="navbar">
          {/* Logo Section */}
          <div className="flex-1">
            <Link href="/" className="btn btn-ghost text-xl">
              AppLogo
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="flex-none hidden lg:flex items-center gap-4">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link
                  href="/dashboard"
                  className={pathname === '/dashboard' ? 'active' : ''}>
                  Dashboard
                </Link>
              </li>
            </ul>
            <ThemeChange />
            {user && (
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
            )}
          </div>

          {/* Mobile Menu */}
          <div className="flex-none lg:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {open && (
          <div className="lg:hidden">
            <ul className="menu w-full p-2 bg-base-200">
              <li>
                <Link
                  href="/dashboard"
                  className={pathname === '/dashboard' ? 'active' : ''}
                  onClick={() => setOpen(false)}>
                  Dashboard
                </Link>
              </li>
              <li>
                <ThemeChange />
              </li>
              {user && (
                <>
                  <div className="divider my-1"></div>
                  <li>
                    <button
                      onClick={() => {
                        setOpen(false)
                        logout()
                      }}>
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navigation
