import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { categoryApi } from '@/lib/api/category'
import type { CategoryFormData } from '@/types/Category'
import { toast } from 'sonner'

export const useCategory = () => {
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
  })

  const {
    data: categoryData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryApi.getAll,
  })

  const createMutation = useMutation({
    mutationFn: async () => {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      return categoryApi.create(formDataToSend)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      toast.success('Category created successfully')
      resetForm()
    },
    onError: error => {
      toast.error(error.message || 'Something went wrong')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: categoryApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      toast.success('Category deleted successfully')
    },
    onError: error => {
      toast.error(error.message || 'Something went wrong')
    },
  })

  const resetForm = () => {
    setFormData({ name: '' })
  }

  return {
    categoryData,
    isLoading,
    error,
    formData,
    setFormData,
    createMutation,
    deleteMutation,
  }
}
