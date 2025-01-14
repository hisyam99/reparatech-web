import { ChangeEvent, FormEvent } from 'react'
import { TestFormData } from '@/types/test'

interface TestFormProps {
  formData: TestFormData
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  onInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void
  isLoading: boolean
}

export function TestForm({
  formData,
  onSubmit,
  onInputChange,
  onFileChange,
  isLoading,
}: TestFormProps) {
  return (
    <div className="card bg-base-200 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Create New Test</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="form-control">
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="input input-bordered"
              value={formData.title}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="form-control">
            <textarea
              name="content"
              placeholder="Content"
              className="textarea textarea-bordered"
              value={formData.content}
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
