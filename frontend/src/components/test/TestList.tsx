import { TestData } from '@/types/test'

interface TestListProps {
  tests: TestData[]
  onDelete: (id: number) => void
  isLoading: boolean
}

export function TestList({ tests, onDelete, isLoading }: TestListProps) {
  if (isLoading) {
    return <div className="loading loading-spinner loading-lg"></div>
  }

  if (tests.length === 0) {
    return <div className="text-center py-4">No data available</div>
  }

  return (
    <div className="space-y-4">
      {tests.map(test => (
        <div key={test.id} className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold">{test.title}</h3>
                <p className="text-sm opacity-70">{test.content}</p>
                {test.image && (
                  <img
                    src={test.image}
                    alt={test.title}
                    className="mt-2 w-32 h-32 object-cover rounded"
                  />
                )}
              </div>
              <button
                className="btn btn-error btn-sm"
                onClick={() => onDelete(test.id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
