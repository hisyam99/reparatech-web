'use client'

import Navbar from '@/components/Navbar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios';  // Pastikan mengimpor axios yang telah dikonfigurasi

export default function PesanJasaPage() {
  const [role, setRole] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    gambar: null as File | null,
    nomorHp: '',
    email: '',
    jenisPengiriman: '',
    informasi: '',
    alamat: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mendapatkan instance router dari Next.js
  const router = useRouter();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get('/api/user'); // Ganti dengan endpoint yang benar
        if (response.data && response.data.role) {
          setRole(response.data.role);
        } else {
          setRole(null);  
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserRole();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = event.target;
    const { name, value, type } = target;

    if (type === 'file' && target instanceof HTMLInputElement) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: target.files ? target.files[0] : null,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nama) newErrors.nama = 'Nama wajib diisi';
    if (!formData.gambar) newErrors.gambar = 'Gambar wajib diunggah';
    if (!formData.nomorHp) newErrors.nomorHp = 'Nomor HP/WA wajib diisi';
    if (!formData.email) newErrors.email = 'Email wajib diisi';
    if (!formData.jenisPengiriman) newErrors.jenisPengiriman = 'Jenis pengiriman wajib dipilih';
    if (!formData.informasi) newErrors.informasi = 'Informasi wajib diisi';
    if (!formData.alamat) newErrors.alamat = 'Alamat wajib diisi';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    if (validateForm()) {
      try {
        const formPayload = new FormData();
        formPayload.append('nama', formData.nama);
        if (formData.gambar) {
          formPayload.append('gambar', formData.gambar);
        }
        formPayload.append('nomorHp', formData.nomorHp);
        formPayload.append('email', formData.email);
        formPayload.append('jenisPengiriman', formData.jenisPengiriman);
        formPayload.append('informasi', formData.informasi);
        formPayload.append('alamat', formData.alamat);
  
        // Tidak perlu menambahkan csrfToken secara manual karena axios sudah menangani CSRF token
        const response = await axios.post('http://localhost:8000/api/data_pelanggan', formPayload, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if (response.status === 200) {
          setIsModalOpen(true);
        } else {
          alert('Terjadi kesalahan saat mengirim data.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Gagal mengirim data. Silakan coba lagi.');
      }
    }
  };

  const closeModal = () => setIsModalOpen(false);

  // Fungsi navigasi menuju halaman pembayaran
  const goToPayment = () => router.push('/Payment'); 

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
                name="nama"
                value={formData.nama}
                onChange={handleInputChange}
                placeholder="Nama Anda"
                className="w-full px-4 py-2 border bg-gray-200 text-black rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
              {errors.nama && <p className="text-red-500 text-sm">{errors.nama}</p>}
            </div>

            {/* Gambar */}
            <div>
              <label className="block text-gray-700">Gambar</label>
              <input
                type="file"
                name="gambar"
                onChange={handleInputChange}
                className="w-full px-4 py-2 border bg-gray-200 text-black rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
              {errors.gambar && <p className="text-red-500 text-sm">{errors.gambar}</p>}
            </div>

            {/* Nomor HP/WA */}
            <div>
              <label className="block text-gray-700">Nomor HP/WA</label>
              <input
                type="text"
                name="nomorHp"
                value={formData.nomorHp}
                onChange={handleInputChange}
                placeholder="Nomor Anda"
                className="w-full px-4 py-2 border bg-gray-200 text-black rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
              {errors.nomorHp && <p className="text-red-500 text-sm">{errors.nomorHp}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Anda"
                className="w-full px-4 py-2 border bg-gray-200 text-black rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* Jenis Pengiriman */}
            <div>
              <label className="block text-gray-700">Jenis Pengiriman</label>
              <select
                name="jenisPengiriman"
                value={formData.jenisPengiriman}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border bg-gray-200 text-black rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              >
                <option value="" disabled>
                  Pilih jenis pengiriman
                </option>
                <option value="antar-jemput">Layanan Antar Jemput</option>
                <option value="datang-lokasi">Datang ke Lokasi</option>
              </select>
              {errors.jenisPengiriman && <p className="text-red-500 text-sm">{errors.jenisPengiriman}</p>}
            </div>

            {/* Informasi */}
            <div>
              <label className="block text-gray-700">Informasi</label>
              <input
                type="text"
                name="informasi"
                value={formData.informasi}
                onChange={handleInputChange}
                placeholder="Tipe HP dll."
                className="w-full px-4 py-2 border bg-gray-200 text-black rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
              {errors.informasi && <p className="text-red-500 text-sm">{errors.informasi}</p>}
            </div>

            {/* Alamat */}
            <div>
              <label className="block text-gray-700">Alamat</label>
              <textarea
                name="alamat"
                value={formData.alamat}
                onChange={handleInputChange}
                placeholder="Alamat lengkap Anda"
                className="w-full px-4 py-2 border bg-gray-200 text-black rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
              {errors.alamat && <p className="text-red-500 text-sm">{errors.alamat}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
            >
              Kirim Pesanan
            </button>
          </form>
        </div>
      </div>

      {/* Modal Confirmation */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
          onClick={closeModal}
        >
          <div className="bg-white p-8 rounded-md shadow-lg text-center">
            <h2 className="text-xl font-semibold">Pesanan Anda Telah Dikirim</h2>
            <button
              onClick={goToPayment}
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Lanjutkan ke Pembayaran
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
