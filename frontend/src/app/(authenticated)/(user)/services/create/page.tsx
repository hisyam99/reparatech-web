// In /frontend/src/app/(authenticated)/(user)/services/create/page.tsx

'use client'

import { ServiceOrderForm } from '@/components/serviceOrder/ServiceOrderForm'
import { ServiceOrderList } from '@/components/serviceOrder/ServiceOrderList'
import { useServiceOrder } from '@/hooks/useServiceOrder'
import { useQuery } from '@tanstack/react-query'
import { serviceApi } from '@/lib/api/service'
import { useAuth } from '@/hooks/auth'
import { ChangeEvent, FormEvent } from 'react'
import { Toaster } from 'sonner'

interface CustomError extends Error {
  response?: {
    status: number
  }
}

export default function ServiceOrdersPage() {
  const { user } = useAuth({
    middleware: 'auth',
  })

  const {
    orderData,
    isLoading,
    error,
    formData,
    editingOrder,
    setFormData,
    createMutation,
    updateMutation,
    updateStatusMutation,
    deleteMutation,
    userOrders,
    userOrdersLoading,
    startEdit,
    resetForm,
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
    if (editingOrder) {
      updateMutation.mutate()
    } else {
      createMutation.mutate()
    }
  }

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id)
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

      {/* Order Creation/Edit Form */}
      <ServiceOrderForm
        formData={formData}
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
        services={servicesData?.data.data ?? []}
        isLoading={createMutation.isPending || updateMutation.isPending}
        isEditing={!!editingOrder}
        onCancel={resetForm}
      />

      {/* My Orders List */}
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">My Service Orders</h2>
          <ServiceOrderList
            orders={userOrders?.data.data ?? []}
            isLoading={userOrdersLoading}
            onUpdateStatus={handleUpdateStatus}
            onEdit={startEdit}
            onDelete={handleDelete}
            userId={user?.id} // Pass the current user's ID from useAuth hook
          />
        </div>
      </div>

      {userOrders && (
        <div className="text-sm opacity-50">
          Total Orders: {userOrders.data.total} | Page:{' '}
          {userOrders.data.current_page} | Per Page: {userOrders.data.per_page}
        </div>
      )}
    </div>
  )
}
