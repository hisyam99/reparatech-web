import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { categoryApi } from '@/lib/api/category'
import type { CategoryFormData } from '@/types/Category'
import { toast } from 'sonner'

export const useCategory = () => {
  const queryClient = useQueryClient()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
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
      if (selectedFile) {
        formDataToSend.append('image', selectedFile)
      }
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
    setSelectedFile(null)
  }

  return {
    categoryData,
    isLoading,
    error,
    formData,
    selectedFile,
    setSelectedFile,
    setFormData,
    createMutation,
    deleteMutation,
  }
}
