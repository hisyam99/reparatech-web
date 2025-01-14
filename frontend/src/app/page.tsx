'use client';

import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import ThemeChange from '@/components/ThemeChange'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Section1 from '@/components/home/Section1';
import Section2 from '@/components/home/Section2';
import Section3 from '@/components/home/Section3';
import Section4 from '@/components/home/Section4';
import Section5 from '@/components/home/Section5';



export default function Home() {

  return (
    <>
    <Navbar />
    <Section1 />
    <Section2 />
    <Section3 />
    <Section4 />
    <Section5 />
    <Footer />
    </>
  )
}
