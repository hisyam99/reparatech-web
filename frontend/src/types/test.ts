export interface TestData {
  id: number
  title: string
  content: string
  image: string
  created_at: string
  updated_at: string
}

export interface ApiResponse {
  success: boolean
  message: string
  data: {
    data: TestData[]
    current_page: number
    per_page: number
    total: number
  }
}

export interface TestFormData {
  title: string
  content: string
}
