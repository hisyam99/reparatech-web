import { CategoryData } from './Category'

export interface ServiceData {
  id: number
  nama_jasa: string
  image: string
  perkiraan_harga: number
  kategori_id: number
  estimasi: number
  category: CategoryData
  created_at: string
  updated_at: string
}

export interface ApiResponse {
  success: boolean
  message: string
  data: {
    data: ServiceData[]
    current_page: number
    per_page: number
    total: number
  }
}

export interface ServiceFormData {
  nama_jasa: string
  perkiraan_harga: number
  kategori_id: number
  estimasi: number
}