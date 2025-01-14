export interface CategoryData {
  id: number
  name: string
  created_at: string
  updated_at: string
}

export interface ApiResponse {
  success: boolean
  message: string
  data: {
    data: CategoryData[]
    current_page: number
    per_page: number
    total: number
  }
}

export interface CategoryFormData {
  name: string
}
