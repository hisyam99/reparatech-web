'use client';

import Navbar from '@/components/Navbar';
import React, { useState } from 'react';

interface Order {
  id: number;
  title: string;
  priceRange: string;
  estimatedTime: string;
  deliveryType: string;
  deliveryFee: string;
  status: string;
  tagihan: string;
  total: string;
  imageUrl: string;
}

const PaymentCard = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      title: 'Ganti LCD & Touchscreen',
      priceRange: 'Rp100.000 - Rp150.000',
      estimatedTime: '3 - 7 hari kerja',
      deliveryType: 'Datang ke lokasi',
      deliveryFee: 'Rp0',
      status: 'On process',
      tagihan: 'Belum dibayar',
      total: 'Rp150.000',
      imageUrl: 'https://via.placeholder.com/100',
    },
    {
      id: 2,
      title: 'Ganti LCD & Touchscreen',
      priceRange: 'Rp100.000 - Rp150.000',
      estimatedTime: '3 - 7 hari kerja',
      deliveryType: 'Datang ke lokasi',
      deliveryFee: 'Rp0',
      status: 'On process',
      tagihan: 'Belum dibayar',
      total: 'Rp150.000',
      imageUrl: 'https://via.placeholder.com/100',
    },
  ]);

  const [cancelledOrders, setCancelledOrders] = useState<Order[]>([]);
  const [historyOrders, setHistoryOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<'orders' | 'cancelled' | 'history'>('orders');

  const handleDelete = (id: number) => {
    const removedOrder = orders.find((order) => order.id === id);
    if (!removedOrder) return;
    setOrders(orders.filter((order) => order.id !== id));
    setCancelledOrders([...cancelledOrders, removedOrder]);
  };

  const handlePayment = (id: number) => {
    const paidOrder = orders.find((order) => order.id === id);
    if (!paidOrder) return;
    setOrders(orders.filter((order) => order.id !== id));
    setHistoryOrders([...historyOrders, paidOrder]);
  };

  const renderOrders = (list: Order[]) => {
    if (list.length === 0) {
      return <p className="text-center text-gray-600">Tidak ada data yang tersedia.</p>;
    }

    return list.map((order) => (
      <div
        key={order.id}
        className="w-full max-w-3xl bg-white shadow-md border rounded-lg p-5 flex flex-col mb-6" // Jarak antar kartu
      >
        <div className="flex items-start gap-4">
          <img src={order.imageUrl} alt="Product" className="w-20 h-20 object-cover rounded-lg" />
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-lg text-black">{order.title}</h3>
              <p className="text-gray-600 text-sm">
                <span className="font-semibold">Perkiraan Harga:</span>
                <br />
                {order.priceRange}
              </p>
              <p className="text-gray-600 text-sm">
                <span className="font-semibold">Estimasi:</span>
                <br />
                {order.estimatedTime}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">
                <span className="font-semibold">Jenis Pengiriman:</span> {order.deliveryType}
              </p>
              <p className="text-gray-600 text-sm">
                <span className="font-semibold">Biaya Pengiriman:</span> {order.deliveryFee}
              </p>
              <p className="text-gray-600 text-sm">
                <span className="font-semibold">Status:</span> {order.status}
              </p>
              <p className="text-gray-600 text-sm">
                <span className="font-semibold">Tagihan:</span> {order.tagihan}
              </p>
            </div>
          </div>
          {activeTab === 'orders' && (
            <button
              className="text-gray-500 hover:text-red-500"
              onClick={() => handleDelete(order.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
        <div className="flex justify-between items-center mt-5 border-t pt-3">
          <p className="text-lg font-semibold text-black">Total Tagihan:</p>
          <p className="text-lg font-bold text-gray-800">{order.total}</p>
        </div>
        {activeTab === 'orders' && (
          <button
            className="btn btn-primary w-full mt-4 bg-blue-700"
            onClick={() => handlePayment(order.id)}
          >
            Bayar Tagihan
          </button>
        )}
      </div>
    ));
  };

  return (
    <>
      <Navbar />
      {/* Pembungkus Utama */}
      <div className="bg-gray-100 min-h-screen">
        {/* Teks Pembayaran */}
        <div className="p-5">
          <h1 className="text-3xl font-bold text-black">Pembayaran</h1>
        </div>

        {/* List Card di Tengah */}
        <div className="flex flex-col items-center justify-center p-5">
          {/* Navigasi Tab */}
          <div className="flex justify-center space-x-28 mb-10">
            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'orders' ? 'bg-gray-200 font-bold text-black' : 'text-black'
              }`}
              onClick={() => setActiveTab('orders')}
            >
              Daftar Pesanan
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'cancelled' ? 'bg-gray-200 font-bold text-black' : 'text-black'
              }`}
              onClick={() => setActiveTab('cancelled')}
            >
              Dibatalkan
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'history' ? 'bg-gray-200 font-bold text-black' : 'text-black'
              }`}
              onClick={() => setActiveTab('history')}
            >
              Riwayat
            </button>
          </div>

          {/* Konten Tab */}
          {activeTab === 'orders' && renderOrders(orders)}
          {activeTab === 'cancelled' && renderOrders(cancelledOrders)}
          {activeTab === 'history' && renderOrders(historyOrders)}
        </div>
      </div>
    </>
  );
};

export default PaymentCard;
