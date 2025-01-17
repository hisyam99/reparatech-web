'use client'

import { ServiceOrderList } from '@/components/serviceOrder/ServiceOrderList'
import { ServiceList } from '@/components/service/ServiceList'
import { ServiceOrder } from '@/types/serviceOrder'
import { ServiceData } from '@/types/Service'
import useSWR from 'swr'
import customAxios from '@/lib/axios'
import { Toaster } from 'sonner'

interface OrdersApiResponse {
  success: boolean
  message: string
  data: {
    data: ServiceOrder[]
    current_page: number
    per_page: number
    total: number
  }
}

interface ServicesApiResponse {
  success: boolean
  message: string
  data: {
    data: ServiceData[]
    current_page: number
    per_page: number
    total: number
  }
}

const fetcher = (url: string) => customAxios.get(url).then(res => res.data)

export default function Dashboard() {
  const {
    data: ordersData,
    error: ordersError,
    isLoading: isOrdersLoading,
  } = useSWR<OrdersApiResponse>('/api/service-orders', fetcher)

  const {
    data: servicesData,
    error: servicesError,
    isLoading: isServicesLoading,
  } = useSWR<ServicesApiResponse>('/api/services', fetcher)

  if (ordersError || servicesError) {
    return <div className="alert alert-error">Error loading dashboard data</div>
  }

  const isLoading = isOrdersLoading || isServicesLoading
  const totalOrders = ordersData?.data.total || 0
  const totalServices = servicesData?.data.total || 0

  return (
    <div className="p-6 space-y-8">
      <Toaster position="top-right" />

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="text-sm opacity-50">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card bg-primary text-primary-content shadow-xl">
          <div className="card-body">
            <h2 className="text-lg font-bold">Total Orders</h2>
            {isLoading ? (
              <div className="loading loading-spinner"></div>
            ) : (
              <p className="text-4xl font-bold">{totalOrders}</p>
            )}
          </div>
        </div>

        <div className="card bg-secondary text-secondary-content shadow-xl">
          <div className="card-body">
            <h2 className="text-lg font-bold">Total Services</h2>
            {isLoading ? (
              <div className="loading loading-spinner"></div>
            ) : (
              <p className="text-4xl font-bold">{totalServices}</p>
            )}
          </div>
        </div>
      </div>

      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Recent Orders</h2>
          <ServiceOrderList
            orders={ordersData?.data.data.slice(0, 5) ?? []}
            isLoading={isOrdersLoading}
            isAdmin={true}
          />
        </div>
      </div>

      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Recent Services</h2>
          <ServiceList
            services={servicesData?.data.data ?? []}
            onDelete={() => {}} // Fungsi tetap, tetapi tidak akan aktif karena tombol dinonaktifkan
            onEdit={() => {}} // Fungsi tetap, tetapi tidak akan aktif karena tombol dinonaktifkan
            isLoading={isServicesLoading}
            disableActions={true} // Properti baru untuk menonaktifkan tombol
          />
        </div>
      </div>

      {servicesData && (
        <div className="text-sm opacity-50">
          Total Services: {servicesData.data.total} | Page:{' '}
          {servicesData.data.current_page} | Per Page:{' '}
          {servicesData.data.per_page}
        </div>
      )}
      {ordersData && (
        <div className="text-sm opacity-50 mt-2">
          Total Orders: {ordersData.data.total} | Page:{' '}
          {ordersData.data.current_page}
        </div>
      )}
    </div>
  )
}
