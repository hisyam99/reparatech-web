'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import customAxios from '@/lib/axios'
import useSWR from 'swr'
import { ServiceData, ApiResponse } from '@/types/Service'
import Link from 'next/link'

const fetcher = (url: string) =>
  customAxios.get<ApiResponse>(url).then(res => res.data)

const Section3 = () => {
  const [categories, setCategories] = useState<string[]>([])

  // Fetch all services data to extract categories
  const { data, error } = useSWR<ApiResponse>('/api/services', fetcher)

  useEffect(() => {
    if (data?.data?.data) {
      // Initialize categories array
      const categoryList: string[] = []

      // Loop through all services and add categories
      data.data.data.forEach((service: ServiceData) => {
        // Correctly access `data.data.data`
        if (!categoryList.includes(service.category.name)) {
          categoryList.push(service.category.name)
        }
      })

      setCategories(categoryList)
    }
  }, [data])

  if (error) {
    return <div className="alert alert-error">Error loading categories</div>
  }

  return (
    <div className="w-full py-12 bg-base-100 text-center">
      <h2 className="text-xl font-bold mb-5 text-base-content">Layanan Kami</h2>
      <p className="text-base-content mb-10">
        Solusi lengkap untuk berbagai kebutuhan perbaikan gadget Anda dengan
        standar layanan profesional.
      </p>
      <div className="flex justify-center flex-wrap gap-6">
        {/* Dynamically generate service category cards */}
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-base-100 border rounded-lg shadow-md p-6 max-w-[250px] text-left flex flex-col justify-between">
            <div className="flex justify-center mb-8">
              {/* You can customize the icons or images per category */}
              <img
                src={`/assets/${category.toLowerCase()}.png`} // Assuming you have images named like 'smartphone.png'
                alt={category}
                className="w-24 h-auto"
              />
            </div>
            <h3 className="text-lg font-bold mb-6 text-base-content">
              {category}
            </h3>
            <ul className="list-disc pl-5 text-sm text-base-content mb-4">
              {/* Filter services by category */}
              {data?.data?.data
                .filter(
                  (service: ServiceData) => service.category.name === category,
                ) // Correctly access `data.data.data`
                .map((service: ServiceData, idx: number) => (
                  <li key={idx}>{service.nama_jasa}</li>
                ))}
            </ul>

            {/* Link to category-specific service page */}
            <Link
              href={`/services?category=${category.toLowerCase()}`} // Dynamic category link
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
