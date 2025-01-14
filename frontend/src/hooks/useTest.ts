import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { testApi } from '@/lib/api/test'
import type { TestFormData } from '@/types/test'
import { toast } from 'sonner'

export const useTest = () => {
  const queryClient = useQueryClient()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [formData, setFormData] = useState<TestFormData>({
    title: '',
    content: '',
  })

  const {
    data: testData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['tests'],
    queryFn: testApi.getAll,
  })

  const createMutation = useMutation({
    mutationFn: async () => {
      const formDataToSend = new FormData()
      formDataToSend.append('title', formData.title)
      formDataToSend.append('content', formData.content)
      if (selectedFile) {
        formDataToSend.append('image', selectedFile)
      }
      return testApi.create(formDataToSend)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tests'] })
      toast.success('Test data created successfully')
      resetForm()
    },
    onError: (error) => {
      toast.error(error.message || 'Something went wrong')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: testApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tests'] })
      toast.success('Test data deleted successfully')
    },
    onError: (error) => {
      toast.error(error.message || 'Something went wrong')
    },
  })

  const resetForm = () => {
    setFormData({ title: '', content: '' })
    setSelectedFile(null)
  }

  return {
    testData,
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