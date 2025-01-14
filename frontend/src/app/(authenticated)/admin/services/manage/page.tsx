'use client'

import { ServiceForm } from '@/components/service/ServiceForm'
import { ServiceList } from '@/components/service/ServiceList'
import { useService } from '@/hooks/useService'
import { ChangeEvent, FormEvent } from 'react'
import { Toaster } from 'sonner'

interface CustomError extends Error {
  response?: {
    status: number
  }
}

export default function ServicesPage() {
  const {
    serviceData,
    isLoading,
    error,
    formData,
    setFormData,
    setSelectedFile,
    createMutation,
    deleteMutation,
  } = useService()

  const customError = error as CustomError

  if (customError?.response?.status === 403) {
    return (
      <div className="alert alert-error">
        You are not authorized to access this page. Admin access required.
      </div>
    )
  }

  if (error) {
    return <div className="alert alert-error">Error loading data</div>
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'nama_jasa' ? value : Number(value),
    }))
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createMutation.mutate()
  }

  return (
    <div className="p-4 space-y-6">
      <Toaster position="top-right" />

      <ServiceForm
        formData={formData}
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
        onFileChange={handleFileChange}
        isLoading={createMutation.isPending}
      />

      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Services List</h2>
          <ServiceList
            services={serviceData?.data.data ?? []}
            onDelete={id => deleteMutation.mutate(id)}
            isLoading={isLoading}
          />
        </div>
      </div>

      {serviceData && (
        <div className="text-sm opacity-50">
          Total Items: {serviceData.data.total} | Page:{' '}
          {serviceData.data.current_page} | Per Page:{' '}
          {serviceData.data.per_page}
        </div>
      )}
    </div>
  )
}
