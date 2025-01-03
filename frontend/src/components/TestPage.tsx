import React, { useState, ChangeEvent, FormEvent } from 'react'
import { isAxiosError } from 'axios'
import customAxios from '@/lib/axios'
import useSWR from 'swr'

interface TestData {
  id: number
  title: string
  content: string
  image: string
  created_at: string
  updated_at: string
}

interface ApiResponse {
  success: boolean
  message: string
  data: {
    data: TestData[]
    current_page: number
    per_page: number
    total: number
  }
}

interface FormData {
  title: string
  content: string
}

const fetcher = (url: string) =>
  customAxios.get<ApiResponse>(url).then(res => res.data)

const TestPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
  })

  const {
    data: response,
    error: swrError,
    mutate,
  } = useSWR<ApiResponse>('/api/test', fetcher)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
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
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('title', formData.title)
      formDataToSend.append('content', formData.content)
      if (selectedFile) {
        formDataToSend.append('image', selectedFile)
      }

      await customAxios.post('/api/test', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      alert('Test data created successfully')
      setFormData({ title: '', content: '' })
      setSelectedFile(null)
      mutate()
    } catch (error) {
      if (isAxiosError(error)) {
        alert(error.response?.data?.message || 'Something went wrong')
      }
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await customAxios.delete(`/api/test/${id}`)
      alert('Test data deleted successfully')
      mutate()
    } catch (error) {
      if (isAxiosError(error)) {
        alert(error.response?.data?.message || 'Something went wrong')
      }
    }
  }

  if (swrError) {
    if (isAxiosError(swrError) && swrError.response?.status === 403) {
      return (
        <div className="alert alert-error">
          You are not authorized to access this page. Admin access required.
        </div>
      )
    }
    return <div className="alert alert-error">Error loading data</div>
  }

  return (
    <div className="p-4 space-y-6">
      {/* Create Form */}
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Create New Test</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="input input-bordered"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-control">
              <textarea
                name="content"
                placeholder="Content"
                className="textarea textarea-bordered"
                value={formData.content}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-control">
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                onChange={handleFileChange}
                accept="image/*"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* List View */}
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Test List</h2>
          {!response ? (
            <div className="loading loading-spinner loading-lg"></div>
          ) : (
            <div className="space-y-4">
              {response.data.data.map(test => (
                <div key={test.id} className="card bg-base-100 shadow-sm">
                  <div className="card-body">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold">{test.title}</h3>
                        <p className="text-sm opacity-70">{test.content}</p>
                        {test.image && (
                          <img
                            src={test.image}
                            alt={test.title}
                            className="mt-2 w-32 h-32 object-cover rounded"
                          />
                        )}
                      </div>
                      <button
                        className="btn btn-error btn-sm"
                        onClick={() => handleDelete(test.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {response.data.data.length === 0 && (
                <div className="text-center py-4">No data available</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Debug Info - Temporary */}
      {response && (
        <div className="text-sm opacity-50">
          Total Items: {response.data.total} | Page:{' '}
          {response.data.current_page} | Per Page: {response.data.per_page}
        </div>
      )}
    </div>
  )
}

export default TestPage
