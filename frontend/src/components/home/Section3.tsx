'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import customAxios from '@/lib/axios'
import useSWR from 'swr'
import { ServiceData, ApiResponse } from '@/types/Service'
import Link from 'next/link'
import Image from 'next/image'

const fetcher = (url: string) =>
  customAxios.get<ApiResponse>(url).then(res => res.data)

const Section3 = () => {
  const [categories, setCategories] = useState<string[]>([])
  const { data, error } = useSWR<ApiResponse>('/api/services', fetcher)

  useEffect(() => {
    if (data?.data?.data) {
      const categoryList = Array.from(
        new Set(data.data.data.map(service => service.category.name)),
      )
      setCategories(categoryList)
    }
  }, [data])

  const getCategoryImage = (category: string): string => {
    const serviceWithImage = data?.data?.data.find(
      (service: ServiceData) =>
        service.category.name === category &&
        service.image &&
        service.image.trim() !== '',
    )

    if (serviceWithImage?.image) {
      // Assuming the API returns a full URL or path to the image
      return serviceWithImage.image
    }

    // Fallback to local assets if no API image is available
    return `/assets/${category.toLowerCase()}.png`
  }

  const dummyCategories = ['Laptop', 'Smartphone', 'Tablet']

  if (error) {
    return (
      <div className="w-full py-12 bg-base-100 text-center">
        <h2 className="text-xl font-bold mb-5 text-base-content">
          Layanan Kami
        </h2>
        <p className="text-base-content mb-10">
          Tidak dapat memuat kategori saat ini. Silakan login untuk melihat
          semua layanan kami.
        </p>
        <div className="flex justify-center flex-wrap gap-6">
          {dummyCategories.map((category, index) => (
            <div
              key={index}
              className="bg-base-100 border rounded-lg shadow-md p-6 max-w-[250px] text-left flex flex-col justify-between">
              <div className="flex justify-center mb-8 relative w-24 h-24">
                <Image
                  src={`/assets/${category.toLowerCase()}.png`}
                  alt={category}
                  layout="fill"
                  objectFit="contain"
                  onError={(e: any) => {
                    e.target.src = '/assets/placeholder.png'
                  }}
                  unoptimized
                />
              </div>
              <h3 className="text-lg font-bold mb-6 text-base-content">
                {category}
              </h3>
              <p className="text-sm text-base-content mb-4">
                Login untuk melihat semua jasa servis yang ada!
              </p>
              <Link href="/login" passHref>
                <button className="w-full px-4 py-2 bg-accent text-accent-content font-bold rounded hover:bg-accent-focus">
                  Login →
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full py-12 bg-base-100 text-center">
      <h2 className="text-xl font-bold mb-5 text-base-content">Layanan Kami</h2>
      <p className="text-base-content mb-10">
        Solusi lengkap untuk berbagai kebutuhan perbaikan gadget Anda dengan
        standar layanan profesional.
      </p>
      <div className="flex justify-center flex-wrap gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-base-100 border rounded-lg shadow-md p-6 max-w-[250px] text-left flex flex-col justify-between">
            <div className="flex justify-center mb-8 relative w-24 h-24">
              <Image
                src={getCategoryImage(category)}
                alt={category}
                layout="fill"
                objectFit="contain"
                onError={(e: any) => {
                  e.target.src = '/assets/placeholder.png'
                }}
                unoptimized
              />
            </div>
            <h3 className="text-lg font-bold mb-6 text-base-content">
              {category}
            </h3>
            <ul className="list-disc pl-5 text-sm text-base-content mb-4">
              {data?.data?.data
                .filter(
                  (service: ServiceData) => service.category.name === category,
                )
                .map((service: ServiceData, idx: number) => (
                  <li key={idx}>{service.nama_jasa}</li>
                ))}
            </ul>
            <Link
              href={`/services?category=${category.toLowerCase()}`}
              passHref>
              <button className="w-full px-4 py-2 bg-accent text-accent-content font-bold rounded hover:bg-accent-focus">
                Lihat Detail →
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Section3
