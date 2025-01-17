import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { serviceApi } from '@/lib/api/service'
import type { ServiceFormData } from '@/types/Service'
import { toast } from 'sonner'

export const useService = () => {
  const queryClient = useQueryClient()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [formData, setFormData] = useState<ServiceFormData>({
    nama_jasa: '',
    perkiraan_harga: 0,
    kategori_id: 0,
    estimasi: 0,
  })

  const {
    data: serviceData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['services'],
    queryFn: serviceApi.getAll,
  })

  const createMutation = useMutation({
    mutationFn: async () => {
      const formDataToSubmit = new FormData()
      formDataToSubmit.append('nama_jasa', formData.nama_jasa)
      formDataToSubmit.append('perkiraan_harga', formData.perkiraan_harga.toString())
      formDataToSubmit.append('kategori_id', formData.kategori_id.toString())
      formDataToSubmit.append('estimasi', formData.estimasi.toString())
      if (selectedFile) {
        formDataToSubmit.append('image', selectedFile)
      }
      return serviceApi.create(formDataToSubmit)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
      toast.success('Service created successfully')
      resetForm()
    },
    onError: (error) => {
      toast.error(error.message || 'Something went wrong')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: serviceApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
      toast.success('Service deleted successfully')
    },
    onError: (error) => {
      toast.error(error.message || 'Something went wrong')
    },
  })

  const resetForm = () => {
    setFormData({
      nama_jasa: '',
      perkiraan_harga: 0,
      kategori_id: 0,
      estimasi: 0,
    })
    setSelectedFile(null)
  }

  return {
    serviceData,
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