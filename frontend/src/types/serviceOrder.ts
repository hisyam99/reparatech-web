export interface ServiceOrder {
  id: number
  user_id: number
  service_id: number
  delivery_type: 'pickup' | 'delivery'
  device_info: string
  estimated_price: number
  shipping_cost: number
  service_cost: number
  payment_status: 'unpaid' | 'paid' | 'refunded'
  total_amount: number
  order_status: 'pending' | 'processing' | 'completed' | 'cancelled'
  estimated_time: number
  created_at: string
  updated_at: string
  service?: {
    id: number
    nama_jasa: string
    gambar: string
    category: {
      id: number
      name: string
    }
  }
  user?: {
    // Add user information
    id: number
    name: string
    email: string
  }
}

export interface ApiResponse {
  success: boolean
  message: string
  data: {
    data: ServiceOrder[]
    current_page: number
    per_page: number
    total: number
  }
}

export interface FormData {
  id?: number
  service_id: number
  delivery_type: 'pickup' | 'delivery'
  device_info: string
}
