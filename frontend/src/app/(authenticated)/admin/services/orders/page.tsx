// /frontend/src/app/(authenticated)/admin/services/orders/page.tsx

'use client'

import { ServiceOrderList } from '@/components/serviceOrder/ServiceOrderList'
import { useServiceOrder } from '@/hooks/useServiceOrder'
import { useQuery } from '@tanstack/react-query'
import { serviceApi } from '@/lib/api/service'
import { ChangeEvent, FormEvent } from 'react'
import { Toaster } from 'sonner'
import { ServiceOrderForm } from '@/components/serviceOrder/ServiceOrderForm'

interface CustomError extends Error {
  response?: {
    status: number
  }
}

export default function ManageOrderPage() {
  const {
    orderData,
    isLoading,
    error,
    formData,
    editingOrder,
    setFormData,
    updateMutation,
    updateStatusMutation,
    deleteMutation,
    startEdit,
    resetForm,
    isAdmin, // Now we can use isAdmin from the hook
  } = useServiceOrder(true) // Pass true to indicate this is an admin page

  const { data: servicesData } = useQuery({
    queryKey: ['services'],
    queryFn: serviceApi.getAll,
  })

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id)
  }

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
    if (editingOrder) {
      updateMutation.mutate()
    }
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

      {editingOrder && (
        <div className="mb-6">
          <ServiceOrderForm
            formData={formData}
            onSubmit={handleSubmit}
            onInputChange={handleInputChange}
            services={servicesData?.data.data ?? []}
            isLoading={updateMutation.isPending}
            isEditing={true}
            onCancel={resetForm}
          />
        </div>
      )}

      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Service Orders</h2>
          <ServiceOrderList
            orders={orderData?.data.data ?? []}
            onUpdateStatus={handleUpdateStatus}
            onEdit={startEdit}
            onDelete={handleDelete}
            isLoading={isLoading}
            isAdmin={isAdmin} // Pass isAdmin from the hook
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
