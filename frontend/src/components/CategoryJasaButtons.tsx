// /frontend/src/components/CategoryJasaButtons.tsx
import React from 'react'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import customAxios from '@/lib/axios'
import { CategoryData } from '@/types/Category'

interface CategoryJasaButtonsProps {
  currentCategory: string
}

interface ApiResponse {
  success: boolean
  message: string
  data: {
    data: CategoryData[]
    current_page: number
    per_page: number
    total: number
  }
}

const fetcher = (url: string) =>
  customAxios.get<ApiResponse>(url).then(res => res.data)

const CategoryJasaButtons: React.FC<CategoryJasaButtonsProps> = ({
  currentCategory,
}) => {
  const router = useRouter()
  const { data: response, error } = useSWR<ApiResponse>(
    '/api/categories',
    fetcher,
  )

  if (error) {
    return <div className="alert alert-error">Error loading categories</div>
  }

  if (!response) {
    return (
      <div className="flex justify-center">
        <div className="loading loading-spinner loading-md"></div>
      </div>
    )
  }

  const handleCategoryChange = (categoryName: string) => {
    router.push(`/services?category=${categoryName.toLowerCase()}`)
  }

  return (
    <div className="flex justify-center flex-wrap gap-4 mb-6">
      {response.data.data.map(category => (
        <button
          key={category.id}
          onClick={() => handleCategoryChange(category.name)}
          className={`py-2 px-4 rounded flex items-center gap-2 ${
            currentCategory.toLowerCase() === category.name.toLowerCase()
              ? 'bg-primary text-white'
              : 'bg-base-200 hover:bg-base-300'
          }`}>
          {category.image && (
            <img
              src={category.image}
              alt={category.name}
              className="w-6 h-6 object-cover rounded"
            />
          )}
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  )
}

export default CategoryJasaButtons
