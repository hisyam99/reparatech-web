'use client'

import { useAuth } from '@/hooks/auth'
import { ServiceOrderList } from '@/components/serviceOrder/ServiceOrderList'
import { useServiceOrder } from '@/hooks/useServiceOrder'
import { Toaster } from 'sonner'
import Link from 'next/link'
import { Plus, FileText } from 'lucide-react'

export default function UserDashboard() {
  const { user } = useAuth({ middleware: 'guest' })
  const { userOrders, userOrdersLoading, error } = useServiceOrder()

  if (error) {
    return <div className="alert alert-error">Error loading orders</div>
  }

  return (
    <div className="p-6 space-y-8">
      <Toaster position="top-right" />

      {/* Halo, nama lengkap */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Halo, {user?.name || 'User'}</h1>
      </div>

      {/* Grid menampilkan total order */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="card bg-primary text-primary-content shadow-xl">
          <div className="card-body">
            <h2 className="text-lg font-bold">Total Orders</h2>
            {userOrdersLoading ? (
              <div className="loading loading-spinner"></div>
            ) : (
              <p className="text-4xl font-bold">
                {userOrders?.data.total ?? 0}
              </p>
            )}
          </div>
        </div>

        {/* Menu Create Order */}
        <Link href="/services/create">
          <div className="card bg-success text-success-content shadow-xl">
            <div className="card-body flex flex-col items-center">
              <h2 className="text-lg font-bold">Create/Edit Order</h2>
              <div className="mt-4 text-4xl">
                <Plus />
              </div>
            </div>
          </div>
        </Link>

        {/* Menu List All My Orders */}
        <Link href="/services/orders">
          <div className="card bg-info text-info-content shadow-xl">
            <div className="card-body flex flex-col items-center">
              <h2 className="text-lg font-bold">List All My Orders</h2>
              <div className="mt-4 text-4xl">
                <FileText />
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Status terbaru mengenai orderan */}
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Recent Order Status</h2>
          {userOrdersLoading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <ServiceOrderList
              orders={userOrders?.data.data.slice(0, 1) ?? []} // Menampilkan status terbaru (order pertama)
              isLoading={userOrdersLoading}
            />
          )}
        </div>
      </div>

      {/* Informasi lebih lanjut mengenai status */}
      {userOrders && (
        <div className="text-sm opacity-50">
          <span>
            Total Orders: {userOrders.data.total} | Page:{' '}
            {userOrders.data.current_page}
          </span>
        </div>
      )}
    </div>
  )
}
