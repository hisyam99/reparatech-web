'use client'

import { TestForm } from '@/components/test/TestForm'
import { TestList } from '@/components/test/TestList'
import { useTest } from '@/hooks/useTest'
import { ChangeEvent, FormEvent } from 'react'
import { Toaster } from 'sonner'

interface CustomError extends Error {
  response?: {
    status: number
  }
}

export default function TestPage() {
  const {
    testData,
    isLoading,
    error,
    formData,
    setFormData,
    setSelectedFile,
    createMutation,
    deleteMutation,
  } = useTest()

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

      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Test List</h2>
          <TestList
            tests={testData?.data.data ?? []}
            onDelete={id => deleteMutation.mutate(id)}
            isLoading={isLoading}
          />
        </div>
      </div>

      {testData && (
        <div className="text-sm opacity-50">
          Total Items: {testData.data.total} | Page:{' '}
          {testData.data.current_page} | Per Page: {testData.data.per_page}
        </div>
      )}
    </div>
  )
}
