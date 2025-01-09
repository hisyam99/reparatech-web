import React from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'

const Navbar = () => {
  const { user } = useAuth({ middleware: 'guest' })
  return (
    <nav className="flex justify-between items-center px-4 py-3 bg-gray-100 border-b border-gray-300">
      <div className="text-2xl font-bold text-black">ReparaTech</div>
      <ul className="flex space-x-6 bg-gray-200 p-2 rounded-md">
        <li>
          <Link href="/" className="text-black hover:text-blue-500">
            Beranda
          </Link>
        </li>
        <li>
          <Link href="#" className="text-black hover:text-blue-500">
            Fitur
          </Link>
        </li>
        <li>
          <Link href="#" className="text-black hover:text-blue-500">
            Layanan
          </Link>
        </li>
        <li>
          <Link href="#" className="text-black hover:text-blue-500">
            Testimoni
          </Link>
        </li>
        <li>
          <Link href="#" className="text-black hover:text-blue-500">
            Kontak
          </Link>
        </li>
        <li>
          <Link href="#" className="text-black hover:text-blue-500">
            Pembayaran
          </Link>
        </li>
      </ul>
      <div className="flex space-x-4">
        {user ? (
          <Link
            href="/dashboard"
            className="px-4 py-2 border border-gray-700 text-black rounded-md hover:bg-gray-200">
            Dashboard
          </Link>
        ) : (
          <>
            <Link
              href="/register"
              className="px-4 py-2 border border-gray-700 text-black rounded-md hover:bg-gray-200">
              Register
            </Link>
            <Link
              href="/login"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-600">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
