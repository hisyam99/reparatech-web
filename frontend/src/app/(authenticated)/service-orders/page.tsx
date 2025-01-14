'use client'

import { ServiceOrderForm } from '@/components/serviceOrder/ServiceOrderForm'
import { ServiceOrderList } from '@/components/serviceOrder/ServiceOrderList'
import { useServiceOrder } from '@/hooks/useServiceOrder'
import { useQuery } from '@tanstack/react-query'
import { serviceApi } from '@/lib/api/service'
import { ChangeEvent, FormEvent } from 'react'
import { Toaster } from 'sonner'

interface CustomError extends Error {
  response?: {
    status: number
  }
}

export default function ServiceOrderPage() {
  const {
    orderData,
    isLoading,
    error,
    formData,
    setFormData,
    createMutation,
    updateStatusMutation,
  } = useServiceOrder()

  const { data: servicesData } = useQuery({
    queryKey: ['services'],
    queryFn: serviceApi.getAll,
  })

  const customError = error as CustomError

  if (customError?.response?.status === 403) {
    return (
      <div className="alert alert-error">
        You are not authorized to access this page.
      </div>
    )
  }

  if (error) {
    return <div className="alert alert-error">Error loading data</div>
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createMutation.mutate()
  }

  const handleUpdateStatus = (
    id: number,
    status: { order_status: string; payment_status: string },
  ) => {
    updateStatusMutation.mutate({ id, status })
  }

  return (
    <div className="p-4 space-y-6">
      <Toaster position="top-right" />

      <ServiceOrderForm
        formData={formData}
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
        services={servicesData?.data.data ?? []}
        isLoading={createMutation.isPending}
      />

      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Service Orders</h2>
          <ServiceOrderList
            orders={orderData?.data.data ?? []}
            onUpdateStatus={handleUpdateStatus}
            isLoading={isLoading}
            isAdmin={true}
          />
        </div>
      </div>

      {orderData && (
        <div className="text-sm opacity-50">
          Total Orders: {orderData.data.total} | Page:{' '}
          {orderData.data.current_page} | Per Page: {orderData.data.per_page}
        </div>
      )}
    </div>
  )
}
