import { ServiceOrder } from '@/types/serviceOrder'

interface ServiceOrderListProps {
  orders: ServiceOrder[]
  onUpdateStatus?: (id: number, status: { order_status: string; payment_status: string }) => void
  isLoading: boolean
  isAdmin?: boolean
}

export function ServiceOrderList({
  orders,
  onUpdateStatus,
  isLoading,
  isAdmin = false
}: ServiceOrderListProps) {
  if (isLoading) {
    return <div className="loading loading-spinner loading-lg"></div>
  }

  if (orders.length === 0) {
    return <div className="text-center py-4">No orders available</div>
  }

  return (
    <div className="space-y-4">
      {orders.map(order => (
        <div key={order.id} className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold">{order.service?.nama_jasa}</h3>
                <p className="text-sm">Category: {order.service?.category.name}</p>
                <p className="text-sm">Device Info: {order.device_info}</p>
                <p className="text-sm">Delivery: {order.delivery_type}</p>
                <div className="mt-2">
                  <p className="text-sm">Service Cost: Rp {order.service_cost.toLocaleString()}</p>
                  <p className="text-sm">Shipping Cost: Rp {order.shipping_cost.toLocaleString()}</p>
                  <p className="font-bold">Total: Rp {order.total_amount.toLocaleString()}</p>
                </div>
                <div className="mt-2">
                  <span className={`badge ${order.payment_status === 'paid' ? 'badge-success' : 'badge-warning'}`}>
                    {order.payment_status}
                  </span>
                  <span className="badge badge-info ml-2">{order.order_status}</span>
                </div>
              </div>
              
              {isAdmin && onUpdateStatus && (
                <div className="space-y-2">
                  <select
                    className="select select-bordered select-sm"
                    value={order.order_status}
                    onChange={(e) => onUpdateStatus(order.id, {
                      order_status: e.target.value,
                      payment_status: order.payment_status
                    })}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  
                  <select
                    className="select select-bordered select-sm"
                    value={order.payment_status}
                    onChange={(e) => onUpdateStatus(order.id, {
                      order_status: order.order_status,
                      payment_status: e.target.value
                    })}
                  >
                    <option value="unpaid">Unpaid</option>
                    <option value="paid">Paid</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}