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
    <div className="space-y-4 md:grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {categories.map(category => (
        <div
          key={category.id}
          className="card bg-base-100 shadow-sm w-full flex flex-col">
          <div className="card-body flex-1 flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="flex-1 flex gap-4">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-32 h-32 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{category.name}</h3>
                </div>
              </div>
            </div>
            <div className="space-x-2 mt-4 sm:mt-0 flex justify-end">
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
      ))}
    </div>
  )
}
