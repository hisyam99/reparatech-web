export const metadata = {
    title: 'Edit Pesanan - ReparaTech',
    description: 'Halaman untuk mengedit informasi pesanan di ReparaTech',
  };
  
  export default function EditPesananPage() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Logika untuk menyimpan perubahan data pesanan
      console.log('Pesanan berhasil diperbarui!');
    };
  
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Edit Pesanan</h1>
  
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 max-w-3xl mx-auto">
          <div className="mb-4">
            <label htmlFor="user" className="block text-gray-700 font-medium mb-2">
              User
            </label>
            <input
              type="text"
              id="user"
              name="user"
              defaultValue="Pelanggan123" // Data default
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="jasa" className="block text-gray-700 font-medium mb-2">
              Jasa
            </label>
            <input
              type="text"
              id="jasa"
              name="jasa"
              defaultValue="Ganti LCD & Touchscreen"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="jenisPengiriman" className="block text-gray-700 font-medium mb-2">
              Jenis Pengiriman
            </label>
            <select
              id="jenisPengiriman"
              name="jenisPengiriman"
              defaultValue="Antar Jemput"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              <option value="Antar Jemput">Antar Jemput</option>
              <option value="Di Tempat">Di Tempat</option>
              <option value="Pengiriman Mandiri">Pengiriman Mandiri</option>
            </select>
          </div>
  
          <div className="mb-4">
            <label htmlFor="biayaPengiriman" className="block text-gray-700 font-medium mb-2">
              Biaya Pengiriman
            </label>
            <input
              type="number"
              id="biayaPengiriman"
              name="biayaPengiriman"
              defaultValue="50000"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="kategori" className="block text-gray-700 font-medium mb-2">
              Kategori
            </label>
            <select
              id="kategori"
              name="kategori"
              defaultValue="Smartphone"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              <option value="Smartphone">Smartphone</option>
              <option value="Laptop">Laptop</option>
              <option value="Tablet">Tablet</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>
  
          <div className="mb-4">
            <label htmlFor="status" className="block text-gray-700 font-medium mb-2">
              Status
            </label>
            <select
              id="status"
              name="status"
              defaultValue="Pending"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              <option value="Pending">Pending</option>
              <option value="Dalam Proses">Dalam Proses</option>
              <option value="Selesai">Selesai</option>
            </select>
          </div>
  
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-secondary text-white px-4 py-2 rounded hover:bg-opacity-90"
            >
              Simpan Perubahan
            </button>
            <a
              href="/admin/dashboard"
              className="px-4 py-2 text-secondary border border-secondary rounded hover:bg-secondary hover:text-white"
            >
              Batal
            </a>
          </div>
        </form>
      </div>
    );
  }
  