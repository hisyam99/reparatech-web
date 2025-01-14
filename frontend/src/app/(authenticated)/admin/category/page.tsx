'use client'

import { CategoryForm } from '@/components/category/CategoryForm'
import { CategoryList } from '@/components/category/CategoryList'
import { useCategory } from '@/hooks/useCategory'
import { ChangeEvent, FormEvent } from 'react'
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
    setFormData,
    createMutation,
    deleteMutation,
  } = useCategory()

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
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createMutation.mutate()
  }

  return (
    <div className="p-4 space-y-6">
      <Toaster position="top-right" />

      <CategoryForm
        formData={formData}
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
        isLoading={createMutation.isPending}
      />

      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Category List</h2>
          <CategoryList
            categories={categoryData?.data.data ?? []}
            onDelete={id => deleteMutation.mutate(id)}
            isLoading={isLoading}
          />
        </div>
      </div>

      {categoryData && (
        <div className="text-sm opacity-50">
          Total Items: {categoryData.data.total} | Page:{' '}
          {categoryData.data.current_page} | Per Page: {categoryData.data.per_page}
        </div>
      )}
    </div>
  )
}
