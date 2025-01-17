'use client'

import { CategoryForm } from '@/components/category/CategoryForm'
import { CategoryList } from '@/components/category/CategoryList'
import { useCategory } from '@/hooks/useCategory'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Toaster } from 'sonner'

interface CustomError extends Error {
  response?: {
    status: number
  }
}

export default function CategoryPage() {
  const {
    categoryData,
    isLoading,
    error,
    formData,
    editingCategory,
    setFormData,
    setSelectedFile,
    createMutation,
    updateMutation,
    deleteMutation,
    startEdit,
    resetForm,
  } = useCategory()

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
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'name' ? value : value,
    }))
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editingCategory) {
      updateMutation.mutate()
    } else {
      createMutation.mutate()
    }
    setIsModalOpen(false) // Close the modal after submission
  }

  return (
    <div className="p-4 space-y-6">
      <Toaster position="top-right" />

      {/* Button to open modal */}
      <button
        className="btn btn-primary"
        onClick={() => {
          setIsModalOpen(true)
          resetForm() // Reset form for new category
        }}>
        Add New Category
      </button>

      {/* Modal for creating/editing category */}
      <input
        type="checkbox"
        id="category-modal"
        className="modal-toggle"
        checked={isModalOpen}
        onChange={() => {}}
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="category-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => {
              setIsModalOpen(false)
              resetForm() // Reset form when modal is closed
            }}>
            ✕
          </label>
          <h2 className="text-xl font-bold mb-4">
            {editingCategory ? 'Edit Category' : 'Create New Category'}
          </h2>

          {/* CategoryForm Component */}
          <CategoryForm
            formData={formData}
            onSubmit={handleSubmit}
            onInputChange={handleInputChange}
            onFileChange={handleFileChange}
            isLoading={createMutation.isPending || updateMutation.isPending}
            isEditing={!!editingCategory}
            onCancel={() => {
              setIsModalOpen(false)
              resetForm() // Reset form when canceling
            }}
          />
        </div>
      </div>

      {/* Category List */}
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Category List</h2>
          <CategoryList
            categories={categoryData?.data.data ?? []}
            onDelete={id => deleteMutation.mutate(id)}
            onEdit={category => {
              setFormData({
                name: category.name,
                // You can add other fields like image if necessary
              })
              startEdit(category)
              setIsModalOpen(true) // Open modal when editing
            }}
            isLoading={isLoading}
          />
        </div>
      </div>

      {categoryData && (
        <div className="text-sm opacity-50">
          Total Items: {categoryData.data.total} | Page:{' '}
          {categoryData.data.current_page} | Per Page:{' '}
          {categoryData.data.per_page}
        </div>
      )}
    </div>
  )
}
