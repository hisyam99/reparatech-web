import { ServiceOrder } from '@/types/serviceOrder'

interface ServiceOrderListProps {
  orders: ServiceOrder[]
  onUpdateStatus?: (
    id: number,
    status: { order_status: string; payment_status: string },
  ) => void
  onEdit?: (order: ServiceOrder) => void
  onDelete?: (id: number) => void
  isLoading: boolean
  isAdmin?: boolean
  userId?: number
}

export function ServiceOrderList({
  orders,
  onUpdateStatus,
  onEdit,
  onDelete,
  isLoading,
  isAdmin = false,
  userId,
}: ServiceOrderListProps) {
  if (isLoading) {
    return <div className="loading loading-spinner loading-lg"></div>
  }

  if (orders.length === 0) {
    return <div className="text-center py-4">No orders available</div>
  }

  const canDeleteOrder = (order: ServiceOrder) => {
    return isAdmin || order.user_id === userId
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
      case 'completed':
        return 'badge-success'
      case 'processing':
        return 'badge-info'
      case 'cancelled':
        return 'badge-error'
      case 'refunded':
        return 'badge-warning'
      default:
        return 'badge-warning'
    }
  }

  return (
    <div className="space-y-4">
      {orders.map(order => (
        <div key={order.id} className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex flex-col lg:flex-row justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-lg">
                    {order.service?.nama_jasa}
                  </h3>
                  <div className="flex gap-2">
                    {order.order_status === 'pending' && onEdit && (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => onEdit(order)}>
                        Edit Order
                      </button>
                    )}
                    {onDelete && (isAdmin || order.user_id === userId) && (
                      <button
                        className="btn btn-error btn-sm"
                        onClick={() => {
                          if (
                            window.confirm(
                              'Are you sure you want to delete this order?',
                            )
                          ) {
                            onDelete(order.id)
                          }
                        }}>
                        Delete
                      </button>
                    )}
                  </div>
                </div>

                {isAdmin && order.user && (
                  <div className="bg-base-200 p-3 rounded-lg mb-4">
                    <h4 className="font-semibold text-sm text-primary mb-2">
                      Customer Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-600">Name:</span>
                        <p className="font-medium">{order.user.name}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Email:</span>
                        <p className="font-medium">{order.user.email}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">User ID:</span>
                        <p className="font-medium">{order.user.id}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Category:</p>
                    <p className="font-medium">
                      {order.service?.category.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Delivery Type:</p>
                    <p className="font-medium capitalize">
                      {order.delivery_type}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600">Device Information:</p>
                    <p className="font-medium">{order.device_info}</p>
                  </div>
                </div>

                <div className="space-y-1 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Service Cost:</span>
                    <span>Rp {order.service_cost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping Cost:</span>
                    <span>Rp {order.shipping_cost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total Amount:</span>
                    <span>Rp {order.total_amount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <span
                    className={`badge ${getStatusColor(order.payment_status)}`}>
                    {order.payment_status}
                  </span>
                  <span
                    className={`badge ${getStatusColor(order.order_status)}`}>
                    {order.order_status}
                  </span>
                  {order.estimated_time && (
                    <span className="badge badge-neutral">
                      Est. Time: {order.estimated_time} days
                    </span>
                  )}
                </div>

                <div className="mt-2 text-xs text-gray-500">
                  <p>Created: {new Date(order.created_at).toLocaleString()}</p>
                  <p>
                    Last Updated: {new Date(order.updated_at).toLocaleString()}
                  </p>
                </div>
              </div>

              {isAdmin && onUpdateStatus && (
                <div className="ml-4 mt-4 lg:mt-0 space-y-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Order Status:</p>
                    <select
                      className="select select-bordered select-sm w-full"
                      value={order.order_status}
                      onChange={e =>
                        onUpdateStatus(order.id, {
                          order_status: e.target.value,
                          payment_status: order.payment_status,
                        })
                      }>
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-medium">Payment Status:</p>
                    <select
                      className="select select-bordered select-sm w-full"
                      value={order.payment_status}
                      onChange={e =>
                        onUpdateStatus(order.id, {
                          order_status: order.order_status,
                          payment_status: e.target.value,
                        })
                      }>
                      <option value="unpaid">Unpaid</option>
                      <option value="paid">Paid</option>
                      <option value="refunded">Refunded</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
