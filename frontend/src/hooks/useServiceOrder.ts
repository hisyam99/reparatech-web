import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { serviceOrderApi } from '@/lib/api/serviceOrder'
import type { FormData, ServiceOrder } from '@/types/serviceOrder'
import { toast } from 'sonner'

export const useServiceOrder = (isAdminUser: boolean = false) => {
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState<FormData>({
    service_id: 0,
    delivery_type: 'pickup',
    device_info: '',
  })
  const [editingOrder, setEditingOrder] = useState<ServiceOrder | null>(null)
  const [isAdmin] = useState(isAdminUser)

  const {
    data: orderData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['service-orders'],
    queryFn: serviceOrderApi.getAll,
  })

  const { data: userOrders, isLoading: userOrdersLoading } = useQuery({
    queryKey: ['user-orders'],
    queryFn: serviceOrderApi.getUserOrders,
  })

  const createMutation = useMutation({
    mutationFn: async () => {
      const formDataToSubmit = new FormData()
      formDataToSubmit.append('service_id', formData.service_id.toString())
      formDataToSubmit.append('delivery_type', formData.delivery_type)
      formDataToSubmit.append('device_info', formData.device_info)
      return serviceOrderApi.create(formDataToSubmit)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['service-orders', 'user-orders'],
      })
      toast.success('Service order created successfully')
      resetForm()
    },
    onError: error => {
      toast.error(error.message || 'Something went wrong')
    },
  })

  const updateMutation = useMutation({
    mutationFn: async () => {
      if (!editingOrder) return
      const formDataToSubmit = new FormData()
      formDataToSubmit.append('service_id', formData.service_id.toString())
      formDataToSubmit.append('delivery_type', formData.delivery_type)
      formDataToSubmit.append('device_info', formData.device_info)

      if (isAdmin) {
        return serviceOrderApi.adminUpdate(editingOrder.id, formDataToSubmit)
      }
      return serviceOrderApi.update(editingOrder.id, formDataToSubmit)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['service-orders', 'user-orders'],
      })
      toast.success('Service order updated successfully')
      resetForm()
    },
    onError: error => {
      toast.error(error.message || 'Something went wrong')
    },
  })

  const updateStatusMutation = useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: number
      status: { order_status: string; payment_status: string }
    }) => serviceOrderApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['service-orders', 'user-orders'],
      })
      toast.success('Order status updated successfully')
    },
    onError: error => {
      toast.error(error.message || 'Something went wrong')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      if (isAdmin) {
        return serviceOrderApi.adminDelete(id)
      }
      return serviceOrderApi.delete(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['service-orders', 'user-orders'],
      })
      toast.success('Service order deleted successfully')
    },
    onError: error => {
      toast.error(error.message || 'Something went wrong')
    },
  })

  const resetForm = () => {
    setFormData({
      service_id: 0,
      delivery_type: 'pickup',
      device_info: '',
    })
    setEditingOrder(null)
  }

  const startEdit = (order: ServiceOrder) => {
    setEditingOrder(order)
    setFormData({
      id: order.id,
      service_id: order.service_id,
      delivery_type: order.delivery_type,
      device_info: order.device_info,
    })
  }

  return {
    orderData,
    userOrders,
    isLoading,
    userOrdersLoading,
    error,
    formData,
    editingOrder,
    isAdmin,
    setFormData,
    createMutation,
    updateMutation,
    updateStatusMutation,
    startEdit,
    resetForm,
    deleteMutation,
  }
}
