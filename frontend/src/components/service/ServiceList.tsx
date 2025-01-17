import { ServiceData } from '@/types/Service'

interface ServiceListProps {
  services: ServiceData[]
  onDelete: (id: number) => void
  onEdit: (service: ServiceData) => void
  isLoading: boolean
  disableActions?: boolean
}

export function ServiceList({
  services,
  onDelete,
  onEdit,
  isLoading,
  disableActions,
}: ServiceListProps) {
  if (isLoading) {
    return <div className="loading loading-spinner loading-lg"></div>
  }

  if (services.length === 0) {
    return <div className="text-center py-4">No services available</div>
  }

  return (
    <div className="space-y-4 md:grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-4">
      {services.map(service => (
        <div
          key={service.id}
          className="card bg-base-100 shadow-sm w-full flex flex-col">
          <div className="card-body flex-1 flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="flex-1 flex gap-4">
                {service.image && (
                  <img
                    src={service.image}
                    alt={service.nama_jasa}
                    className="w-32 h-32 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{service.nama_jasa}</h3>
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
            </div>
            {!disableActions && (
              <div className="space-x-2 mt-4 sm:mt-0 flex justify-end">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => onEdit(service)}
                  disabled={disableActions}>
                  Edit
                </button>
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => onDelete(service.id)}
                  disabled={disableActions}>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
