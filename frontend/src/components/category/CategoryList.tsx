import { CategoryData } from '@/types/Category'

interface CategoryListProps {
  categories: CategoryData[]
  onDelete: (id: number) => void
  onEdit: (category: CategoryData) => void
  isLoading: boolean
}

export function CategoryList({
  categories,
  onDelete,
  onEdit,
  isLoading,
}: CategoryListProps) {
  if (isLoading) {
    return <div className="loading loading-spinner loading-lg"></div>
  }

  if (categories.length === 0) {
    return <div className="text-center py-4">No data available</div>
  }

  return (
    <div className="space-y-4">
      {categories.map(category => (
        <div key={category.id} className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex justify-between items-start">
              <div>
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-32 h-32 object-cover rounded"
                />
                <h3 className="font-bold">{category.name}</h3>
              </div>
              <div className="space-x-2">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => onEdit(category)}>
                  Edit
                </button>
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => onDelete(category.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
