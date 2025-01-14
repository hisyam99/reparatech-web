import customAxios from '@/lib/axios'
import { ApiResponse } from '@/types/test'

export const testApi = {
  getAll: async () => {
    const response = await customAxios.get<ApiResponse>('/api/test')
    return response.data
  },

  create: async (formData: FormData) => {
    const response = await customAxios.post<ApiResponse>(
      '/api/test',
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
    const response = await customAxios.delete(`/api/test/${id}`)
    return response.data
  },
}
