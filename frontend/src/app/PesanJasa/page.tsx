'use client'

import Navbar from '@/components/Navbar'
import React, { useState } from 'react'

export default function PesanJasaPage() {
  const [jenisPengiriman, setJenisPengiriman] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handlePengirimanChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setJenisPengiriman(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="flex justify-center items-center mt-10">
        <div className="w-full max-w-lg p-6 bg-white shadow-xl rounded-lg">
          <h1 className="text-2xl font-bold mb-6 text-black">Pesan Jasa</h1>
          <div className="flex items-start space-x-6 mb-8">
            <img
              src="/path-to-your-image.jpg"
              alt="Handphone"
              className="w-24 h-24 object-cover rounded-md"
            />
            <div>
              <h2 className="text-lg font-semibold text-black">
                Ganti LCD & Touchscreen
              </h2>
              <p className="text-gray-700">Perkiraan Harga</p>
              <p className="font-semibold text-black">Rp100.000 - Rp150.000</p>
              <p className="text-gray-700 mt-2">Estimasi: 3 - 7 hari kerja</p>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Nama */}
            <div>
              <label className="block text-black">Nama</label>
              <input
                type="text"
                placeholder="Nama Anda"
                className="w-full px-4 py-2 border bg-gray-200 text-black rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            {/* Gambar */}
            <div>
              <label className="block text-gray-700">Gambar</label>
              <input
                type="file"
                className="w-full px-4 py-2 border bg-gray-200 text-black rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            {/* Nomor HP/WA */}
            <div>
              <label className="block text-gray-700">Nomor HP/WA</label>
              <input
                type="text"
                placeholder="Nomor Anda"
                className="w-full px-4 py-2 border bg-gray-200 text-black rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Email Anda"
                className="w-full px-4 py-2 border bg-gray-200 text-black rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            {/* Jenis Pengiriman */}
            <div>
              <label className="block text-gray-700">Jenis Pengiriman</label>
              <select
                value={jenisPengiriman}
                onChange={handlePengirimanChange}
                className="w-full px-4 py-2 border bg-gray-200 text-black rounded-md focus:outline-none focus:ring focus:ring-blue-200">
                <option value="" disabled>
                  Pilih jenis pengiriman
                </option>
                <option value="antar-jemput">Layanan Antar Jemput</option>
                <option value="datang-lokasi">Datang ke Lokasi</option>
              </select>
            </div>

            {/* Informasi HP */}
            <div>
              <label className="block text-gray-700">Informasi HP</label>
              <input
                type="text"
                placeholder="Tipe HP dll."
                className="w-full px-4 py-2 border bg-gray-200 text-black rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            {/* Alamat */}
            <div>
              <label className="block text-gray-700">Alamat</label>
              <textarea
                placeholder="Alamat Anda"
                className="w-full px-4 py-5 border bg-gray-200 text-black rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                style={{ resize: 'none' }}
              />
            </div>

            {/* Note */}
            <p className="text-sm text-gray-600 mt-4">
              Note: Setelah melakukan pemesanan, harap periksa secara berkala
              untuk tagihan akhir. Terima kasih atas kepercayaan Anda kepada
              ReparaTech.
            </p>

            {/* Button Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none">
              Pesan
            </button>
          </form>
        </div>
      </div>
      {/* Modal Pop-up */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
            <div className="flex justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-center text-black mb-4">
              Pesanan Anda telah berhasil dibuat!
            </h2>
            <p className="text-center text-gray-700 mb-4">
              Mohon cek menu Pembayaran untuk melihat detail tagihan Anda.
            </p>
            <p className="text-center text-gray-700 mb-6">
              Terima kasih atas kepercayaan Anda kepada ReparaTech.
            </p>
            <div className="flex justify-center">
              <button
                onClick={closeModal}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none">
                Pembayaran
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
