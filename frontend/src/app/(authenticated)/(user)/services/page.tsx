// /frontend/src/app/(authenticated)/category/page.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import CategoryJasaButtons from '@/components/CategoryJasaButtons'
import ServiceCardCategory from '@/components/ServiceCardCategory'
import customAxios from '@/lib/axios'
import useSWR from 'swr'
import { ServiceData } from '@/types/Service'

interface ApiResponse {
  success: boolean
  message: string
  data: {
    data: ServiceData[]
    current_page: number
    per_page: number
    total: number
  }
}

const fetcher = (url: string) =>
  customAxios.get<ApiResponse>(url).then(res => res.data)

const JasaPage: React.FC = () => {
  const [isClient, setIsClient] = useState(false)
  const searchParams = useSearchParams()
  const category = searchParams?.get('category') || 'smartphone'

  const { data: response, error } = useSWR<ApiResponse>(
    '/api/services',
    fetcher,
  )

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  if (error) {
    return <div className="alert alert-error">Error loading services</div>
  }

  // Filter services based on selected category
  const filteredServices =
    response?.data.data.filter(
      service => service.category.name.toLowerCase() === category.toLowerCase(),
    ) || []

  if (filteredServices.length === 0 && response) {
    // Only show no services message if data has loaded
    return (
      <div className="container mx-auto mt-8">
        <CategoryJasaButtons currentCategory={category} />
        <div className="text-center py-8">
          No services available for this category
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto mt-8">
      <CategoryJasaButtons currentCategory={category} />
      <h2 className="text-center text-2xl font-bold mb-8">
        Service {category.charAt(0).toUpperCase() + category.slice(1)}
      </h2>

      {!response ? (
        <div className="flex justify-center">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map(service => (
            <ServiceCardCategory key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  )
}

export default JasaPage
