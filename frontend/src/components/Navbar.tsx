// File 1: /frontend/src/components/Navbar.tsx
import React from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import ThemeChange from './ThemeChange'


const Navbar = () => {
  const { user } = useAuth({ middleware: 'guest' })
  return (
    <nav className="navbar bg-transparent shadow-md">
      <div className="navbar-start">
        <div className="text-2xl font-bold text-primary">ReparaTech</div>
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal bg-secondary px-1 space-x-2">
          <li>
            <Link href="/" className="btn btn-ghost">
              Beranda
            </Link>
          </li>
          <li>
            <Link href="#" className="btn btn-ghost">
              Fitur
            </Link>
          </li>
          <li>
            <Link href="/PesanJasa" className="btn btn-ghost">
              Layanan
            </Link>
          </li>
          <li>
            <Link href="#" className="btn btn-ghost">
              Testimoni
            </Link>
          </li>
          <li>
            <Link href="#" className="btn btn-ghost">
              Kontak
            </Link>
          </li>
        </ul>
      </div>
      
      <div className="navbar-end space-x-2">
        <ThemeChange/>
        {user ? (
          <Link
            href="/dashboard"
            className="btn btn-outline btn-primary">
            Dashboard
          </Link>
        ) : (
          <>
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
          </>
        )}
      </div>
    </nav>
  )
}


export default Navbar