'use client';

import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import ThemeChange from '@/components/ThemeChange'
import Navbar from '@/components/Navbar'
import LandingPage from '@/components/home/Landing_page'
import Footer from '@/components/Footer'

export default function Home() {

  return (
    <>
    <Navbar />
    <LandingPage />
    <Footer />
    </>
  )
}
