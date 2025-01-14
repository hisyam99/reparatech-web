import { ChangeEvent, FormEvent } from 'react'
import { FormData } from '@/types/serviceOrder'

interface ServiceOrderFormProps {
  formData: FormData
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  services: Array<{ id: number; nama_jasa: string }>
  isLoading: boolean
}

export function ServiceOrderForm({
  formData,
  onSubmit,
  onInputChange,
  services,
  isLoading
}: ServiceOrderFormProps) {
  return (
    <div className="card bg-base-200 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Create Service Order</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="form-control">
            <select
              name="service_id"
              className="select select-bordered w-full"
              value={formData.service_id}
              onChange={onInputChange}
              required
            >
              <option value="">Select Service</option>
              {services.map(service => (
                <option key={service.id} value={service.id}>
                  {service.nama_jasa}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <select
              name="delivery_type"
              className="select select-bordered w-full"
              value={formData.delivery_type}
              onChange={onInputChange}
              required
            >
              <option value="pickup">Pick Up</option>
              <option value="delivery">Delivery (+ Rp 20.000)</option>
            </select>
          </div>

          <div className="form-control">
            <textarea
              name="device_info"
              placeholder="Device Information"
              className="textarea textarea-bordered"
              value={formData.device_info}
              onChange={onInputChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Order...' : 'Create Order'}
          </button>
        </form>
      </div>
    </div>
  )
}