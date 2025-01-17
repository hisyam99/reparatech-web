import { ServiceData } from '@/types/Service'

interface ServiceListProps {
  services: ServiceData[]
  onDelete: (id: number) => void
  onEdit: (service: ServiceData) => void
  isLoading: boolean
}

export function ServiceList({
  services,
  onDelete,
  onEdit,
  isLoading,
}: ServiceListProps) {
  if (isLoading) {
    return <div className="loading loading-spinner loading-lg"></div>
  }

  if (services.length === 0) {
    return <div className="text-center py-4">No services available</div>
  }

  return (
    <div className="space-y-4">
      {services.map(service => (
        <div key={service.id} className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                {service.image && (
                  <img
                    src={service.image}
                    alt={service.nama_jasa}
                    className="w-32 h-32 object-cover rounded"
                  />
                )}
                <div>
                  <h3 className="font-bold">{service.nama_jasa}</h3>
                  <p className="text-sm opacity-70">
                    Category: {service.category.name}
                  </p>
                  <p className="text-sm">
                    Price: Rp {service.perkiraan_harga.toLocaleString()}
                  </p>
                  <p className="text-sm">
                    Estimated time: {service.estimasi} days
                  </p>
                </div>
              </div>
              <div className="space-x-2">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => onEdit(service)}>
                  Edit
                </button>
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => onDelete(service.id)}>
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
