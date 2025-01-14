import React, { useState, ChangeEvent, FormEvent } from 'react'
import { isAxiosError } from 'axios'
import customAxios from '@/lib/axios'
import useSWR from 'swr'

interface DataPelanggan {
  id: number
  name: string
  email: string
  phone: string
  created_at: string
  updated_at: string
}

interface ApiResponse {
  success: boolean
  message: string
  data: {
    data: DataPelanggan[]
    current_page: number
    per_page: number
    total: number
  }
}

interface FormData {
  name: string
  email: string
  phone: string
}

const fetcher = (url: string) =>
  customAxios.get<ApiResponse>(url).then(res => res.data)

const DataPelangganPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
  })

  const {
    data: response,
    error: swrError,
    mutate,
  } = useSWR<ApiResponse>('/api/data_pelanggan', fetcher)

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
      await customAxios.post('/api/data_pelanggan', formData)
      alert('Data pelanggan created successfully')
      setFormData({ name: '', email: '', phone: '' })
      mutate()
    } catch (error) {
      if (isAxiosError(error)) {
        alert(error.response?.data?.message || 'Something went wrong')
      }
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await customAxios.delete(`/api/data_pelanggan/${id}`)
      alert('Data pelanggan deleted successfully')
      mutate()
    } catch (error) {
      if (isAxiosError(error)) {
        alert(error.response?.data?.message || 'Something went wrong')
      }
    }
  }

  if (swrError) {
    return <div className="alert alert-error">Error loading data</div>
  }

  return (
    <div className="p-4 space-y-6">
      {/* Create Form */}
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Create New Data Pelanggan</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="input input-bordered"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-control">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-control">
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                className="input input-bordered"
                value={formData.phone}
                onChange={handleInputChange}
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
          <h2 className="card-title">Data Pelanggan List</h2>
          {!response ? (
            <div className="loading loading-spinner loading-lg"></div>
          ) : (
            <div className="space-y-4">
              {response.data.data.map(data => (
                <div key={data.id} className="card bg-base-100 shadow-sm">
                  <div className="card-body">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold">{data.name}</h3>
                        <p className="text-sm opacity-70">{data.email}</p>
                        <p className="text-sm opacity-70">{data.phone}</p>
                      </div>
                      <button
                        className="btn btn-error btn-sm"
                        onClick={() => handleDelete(data.id)}>
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

export default DataPelangganPage
