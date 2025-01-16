/// File 1: /frontend/src/app/page.tsx

'use client'

import { useEffect } from 'react'
import axios from 'axios'

import Section1 from '@/components/home/Section1'
import Section2 from '@/components/home/Section2'
import Section3 from '@/components/home/Section3'
import Section4 from '@/components/home/Section4'
import Section5 from '@/components/home/Section5'

export default function Home() {
  useEffect(() => {
    const initializeCsrf = async () => {
      try {
        await axios.get('/sanctum/csrf-cookie')
        console.log('CSRF initialized successfully')
      } catch (error) {
        console.error('Failed to initialize CSRF', error)
      }
    }

    initializeCsrf()
  }, [])

  return (
    <>
      <Section1 />
      <Section2 />
      <Section3 />
      {/* <Section4 /> */}
      <Section5 />
    </>
  )
}
