import customAxios from '@/lib/axios'
import { ApiResponse } from '@/types/category'

export const categoryApi = {
  getAll: async () => {
    const response = await customAxios.get<ApiResponse>('/api/categories')
    return response.data
  },

  create: async (formData: FormData) => {
    const response = await customAxios.post<ApiResponse>(
      '/api/categories',
      formData,
    )
    return response.data
  },

  delete: async (id: number) => {
    const response = await customAxios.delete(`/api/categories/${id}`)
    return response.data
  },
}
