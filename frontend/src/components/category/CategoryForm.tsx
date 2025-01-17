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
  isEditing: boolean
  onCancel: () => void
}

export function CategoryForm({
  formData,
  onSubmit,
  onInputChange,
  onFileChange,
  isLoading,
  isEditing,
  onCancel,
}: CategoryFormProps) {
  return (
    <div className="card bg-base-200 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          {isEditing ? 'Edit Category' : 'Create New Category'}
        </h2>
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
              required={!isEditing}
            />
            {isEditing && (
              <label className="label">
                <span className="label-text-alt">
                  Leave empty to keep current image
                </span>
              </label>
            )}
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}>
              {isLoading ? 'Submitting...' : isEditing ? 'Update' : 'Submit'}
            </button>
            {isEditing ? (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCancel}>
                Cancel Edit
              </button>
            ) : (
              <Link href="/admin/services/manage">
                <button type="button" className="btn btn-secondary">
                  Cancel
                </button>
              </Link>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
