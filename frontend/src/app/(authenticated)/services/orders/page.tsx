'use client'

import { ServiceOrderList } from '@/components/serviceOrder/ServiceOrderList'
import { useServiceOrder } from '@/hooks/useServiceOrder'
import { Toaster } from 'sonner'

export default function MyOrdersPage() {
  const { userOrders, userOrdersLoading, error } = useServiceOrder()

  if (error) {
    return <div className="alert alert-error">Error loading orders</div>
  }

  return (
    <div className="p-4 space-y-6">
      <Toaster position="top-right" />

      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">My Service Orders</h2>
          <ServiceOrderList
            orders={userOrders?.data.data ?? []}
            isLoading={userOrdersLoading}
          />
        </div>
      </div>

      {userOrders && (
        <div className="text-sm opacity-50">
          Total Orders: {userOrders.data.total} | Page:{' '}
          {userOrders.data.current_page} | Per Page: {userOrders.data.per_page}
        </div>
      )}
    </div>
  )
}
