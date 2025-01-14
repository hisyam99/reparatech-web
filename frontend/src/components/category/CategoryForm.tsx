import { ChangeEvent, FormEvent } from 'react'
import { FormData } from '@/types/category'

interface CategoryFormProps {
  formData: FormData
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  onInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  isLoading: boolean
}

export function CategoryForm({
  formData,
  onSubmit,
  onInputChange,
  isLoading,
}: CategoryFormProps) {
  return (
    <div className="card bg-base-200 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Create New Category</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="form-control">
            <input
              type="text"
              name="name"
              placeholder="Category Name"
              className="input input-bordered"
              value={formData.name}
              onChange={onInputChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  )
}
