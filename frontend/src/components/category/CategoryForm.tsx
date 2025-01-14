import { ChangeEvent, FormEvent } from 'react'
import { CategoryFormData } from '@/types/Category'
import Link from 'next/link'

interface CategoryFormProps {
  formData: CategoryFormData
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  onInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void
  isLoading: boolean
}

export function CategoryForm({
  formData,
  onSubmit,
  onInputChange,
  onFileChange,
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
          <div className="form-control">
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              onChange={onFileChange}
              accept="image/*"
              required
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
            <Link href="/admin/services/manage">
              <button type="button" className="btn btn-primary">
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
