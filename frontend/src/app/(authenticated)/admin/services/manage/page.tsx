'use client'

import { ServiceForm } from '@/components/service/ServiceForm'
import { ServiceList } from '@/components/service/ServiceList'
import { useService } from '@/hooks/useService'
import { ChangeEvent, FormEvent, useState } from 'react'
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
    editingService,
    setFormData,
    setSelectedFile,
    createMutation,
    updateMutation,
    deleteMutation,
    startEdit,
    resetForm,
  } = useService()

  const [isModalOpen, setIsModalOpen] = useState(false)

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
    if (editingService) {
      updateMutation.mutate()
    } else {
      createMutation.mutate()
    }
    setIsModalOpen(false)  // Close the modal after submission
  }

  return (
    <div className="p-4 space-y-6">
      <Toaster position="top-right" />

      {/* Button to open modal */}
      <button
        className="btn btn-primary"
        onClick={() => {
          setIsModalOpen(true)
          resetForm() // Reset form for new service
        }}
      >
        Add New Service
      </button>

      {/* Modal for creating/editing service */}
      <input
        type="checkbox"
        id="service-modal"
        className="modal-toggle"
        checked={isModalOpen}
        onChange={() => {}}
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="service-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => {
              setIsModalOpen(false)
              resetForm()  // Reset form when modal is closed
            }}
          >
            ✕
          </label>
          <h2 className="text-xl font-bold mb-4">
            {editingService ? 'Edit Service' : 'Create New Service'}
          </h2>

          {/* ServiceForm Component */}
          <ServiceForm
            formData={formData}
            onSubmit={handleSubmit}
            onInputChange={handleInputChange}
            onFileChange={handleFileChange}
            isLoading={createMutation.isPending || updateMutation.isPending}
            isEditing={!!editingService}
            onCancel={() => {
              setIsModalOpen(false)
              resetForm()  // Reset form when canceling
            }}
          />
        </div>
      </div>

      {/* Service List */}
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Services List</h2>
          <ServiceList
            services={serviceData?.data.data ?? []}
            onDelete={id => deleteMutation.mutate(id)}
            onEdit={(service) => {
              setFormData({
                nama_jasa: service.nama_jasa,
                kategori_id: service.kategori_id,
                perkiraan_harga: service.perkiraan_harga,
                estimasi: service.estimasi,
                // You can add other fields like images if necessary
              })
              startEdit(service)
              setIsModalOpen(true)  // Open modal when editing
            }}
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
