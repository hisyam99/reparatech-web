import customAxios from '@/lib/axios'
import { ApiResponse } from '@/types/serviceOrder'

export const serviceOrderApi = {
  getAll: async () => {
    const response = await customAxios.get<ApiResponse>('/api/service-orders')
    return response.data
  },

  create: async (formData: FormData) => {
    const response = await customAxios.post<ApiResponse>(
      '/api/service-orders',
      formData,
    )
    return response.data
  },

  getUserOrders: async () => {
    const response = await customAxios.get<ApiResponse>(
      '/api/user/service-orders',
    )
    return response.data
  },

  updateStatus: async (
    id: number,
    status: { order_status: string; payment_status: string },
  ) => {
    const response = await customAxios.put(
      `/api/service-orders/${id}/status`,
      status,
    )
    return response.data
  },

  update: async (id: number, formData: FormData) => {
    formData.append('_method', 'PUT') // For Laravel backend
    const response = await customAxios.post<ApiResponse>(
      `/api/service-orders/${id}`,
      formData,
    )
    return response.data
  },

  delete: async (id: number) => {
    const response = await customAxios.delete<ApiResponse>(
      `/api/service-orders/${id}`,
    )
    return response.data
  },

  adminUpdate: async (id: number, formData: FormData) => {
    formData.append('_method', 'PUT')
    const response = await customAxios.post<ApiResponse>(
      `/api/admin/service-orders/${id}`,
      formData,
    )
    return response.data
  },

  adminDelete: async (id: number) => {
    const response = await customAxios.delete<ApiResponse>(
      `/api/admin/service-orders/${id}`,
    )
    return response.data
  },
}
