import { ChangeEvent, FormEvent } from 'react'
import { ServiceFormData } from '@/types/Service'
import { useCategory } from '@/hooks/useCategory'
import Link from 'next/link'

interface ServiceFormProps {
  formData: ServiceFormData
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void
  isLoading: boolean
  isEditing: boolean
  onCancel: () => void
}

export function ServiceForm({
  formData,
  onSubmit,
  onInputChange,
  onFileChange,
  isLoading,
  isEditing,
  onCancel,
}: ServiceFormProps) {
  const { categoryData, isLoading: categoriesLoading } = useCategory()
  const categories = categoryData?.data.data ?? []

  return (
    <div className="card bg-base-200 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          {isEditing ? 'Edit Service' : 'Create New Service'}
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="form-control">
            <input
              type="text"
              name="nama_jasa"
              placeholder="Service Name"
              className="input input-bordered"
              value={formData.nama_jasa}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="form-control">
            <input
              type="number"
              name="perkiraan_harga"
              placeholder="Estimated Price"
              className="input input-bordered"
              value={formData.perkiraan_harga}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="form-control">
            <div className="flex items-center space-x-2">
              <Link href="/admin/category">
                <button className="btn btn-primary">Add Categories</button>
              </Link>
              <select
                name="kategori_id"
                className="select select-bordered flex-1"
                value={formData.kategori_id}
                onChange={onInputChange}
                required>
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-control">
            <input
              type="number"
              name="estimasi"
              placeholder="Estimated Days"
              className="input input-bordered"
              value={formData.estimasi}
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
              disabled={isLoading || categoriesLoading}>
              {isLoading ? 'Submitting...' : isEditing ? 'Update' : 'Submit'}
            </button>
            {isEditing && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCancel}>
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
