import customAxios from '@/lib/axios'
import { ApiResponse } from '@/types/Service'

export const serviceApi = {
  getAll: async () => {
    const response = await customAxios.get<ApiResponse>('/api/services')
    return response.data
  },

  create: async (formData: FormData) => {
    const response = await customAxios.post<ApiResponse>(
      '/api/services',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
    return response.data
  },

  delete: async (id: number) => {
    const response = await customAxios.delete(`/api/services/${id}`)
    return response.data
  },
}