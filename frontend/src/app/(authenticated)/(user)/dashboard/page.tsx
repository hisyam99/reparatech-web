'use client'

import { useAuth } from '@/hooks/auth'
import { ServiceOrderList } from '@/components/serviceOrder/ServiceOrderList'
import { useServiceOrder } from '@/hooks/useServiceOrder'
import { Toaster } from 'sonner'
import Link from 'next/link'
import { Plus, FileText } from 'lucide-react'
import { useState } from 'react'

export default function UserDashboard() {
  const { user } = useAuth({ middleware: 'guest' })
  const { userOrders, userOrdersLoading, error } = useServiceOrder()

  // State untuk modal, status pembayaran, dan jumlah pembayaran
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPaymentCompletedPopupOpen, setIsPaymentCompletedPopupOpen] =
    useState(false)
  const [paymentAmount, setPaymentAmount] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const totalAmount = 120000 // Jumlah total pembayaran (simulasi)

  if (error) {
    return <div className="alert alert-error">Error loading orders</div>
  }

  // Fungsi untuk membuka dan menutup modal
  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setErrorMessage('')
    setPaymentAmount('')
  }

  // Fungsi untuk menangani pembayaran
  const handlePayment = () => {
    if (parseFloat(paymentAmount) === totalAmount) {
      setIsModalOpen(false)
      setIsPaymentCompletedPopupOpen(true) // Buka pop-up pembayaran selesai
    } else {
      setErrorMessage('The amount entered does not match the total amount!')
    }
  }

  // Fungsi untuk menutup pop-up "Payment Completed"
  const handleClosePaymentCompletedPopup = () => {
    setIsPaymentCompletedPopupOpen(false)
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
          <div className="card-body relative">
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
        <div className="card-body relative">
          <h2 className="card-title">Recent Order Status</h2>
          {userOrdersLoading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <>
              <ServiceOrderList
                orders={userOrders?.data.data.slice(0, 1) ?? []} // Menampilkan status terbaru (order pertama)
                isLoading={userOrdersLoading}
              />
              {/* Tombol Pembayaran */}
              <div className="absolute bottom-20 right-16">
                <button
                  className="btn bg-blue-500 text-black px-4 py-2 rounded"
                  onClick={handleOpenModal}
                >
                  Pay Now
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal Pop-Up */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-xl w-96">
            <h3 className="text-xl font-bold mb-4">Confirm Payment</h3>
            <p className="mb-2">Total Amount: Rp {totalAmount.toLocaleString()}</p>
            <input
              type="number"
              placeholder="Enter payment amount"
              className="w-full p-2 border rounded mb-2"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
            />
            {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
            <div className="flex justify-end space-x-4">
              <button
                className="btn bg-gray-300 text-black px-4 py-2 rounded"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="btn bg-blue-500 text-black px-4 py-2 rounded"
                onClick={handlePayment}
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pop-Up Payment Completed */}
      {isPaymentCompletedPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-xl w-96">
            <h3 className="text-xl font-bold mb-4 text-green-500">
              Payment Completed
            </h3>
            <p className="mb-4">Your payment has been successfully processed!</p>
            <div className="flex justify-end">
              <button
                className="btn bg-blue-500 text-black px-4 py-2 rounded"
                onClick={handleClosePaymentCompletedPopup}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

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
