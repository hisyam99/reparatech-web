'use client'

import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import ThemeChange from '@/components/ThemeChange'
import Navbar from '@/components/Navbar'

export default function Home() {
  const { user } = useAuth({ middleware: 'guest' })

  return (
    <>
    <Navbar />
    </>
  )
}
