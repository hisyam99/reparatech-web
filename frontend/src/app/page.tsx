'use client'

import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import ThemeChange from '@/components/ThemeChange'
import DashboardPage from './(authenticated)/dashboard/page'
import Dashboard from '@/components/Layouts/Dashboard'


export default function Home() {
  const { user } = useAuth({ middleware: 'guest' })

  return (
    <>
      <Head>
        <title>ReparaTech</title>
      </Head>

      <div className="min-h-screen bg-base-100 flex flex-col justify-center items-center">
        <div className="fixed top-4 right-4 flex space-x-4">
          <ThemeChange />
          {user ? (
            <Link href="/dashboard" className="btn btn-primary btn-sm">
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className="btn btn-secondary btn-sm">
                Login
              </Link>
              <Link href="/register" className="btn btn-accent btn-sm">
                Register
              </Link>
            </>
          )}
        </div>

        <div className="text-center">
          <h1 className="text-4xl font-bold mt-4 text-base-content">
            ReparaTech
          </h1>
        </div>
      </div>
      <Dasboard/>
    </>
  )
}
