export default function DashboardComponentAdmin() {
  return (
    <div className="flex"> {/* Tambahkan flex di sini */}
      {/* Konten Utama */}
      <main className="flex-1 p-6">
        {/* Halaman Utama */}
        <div>
          <h2 className="text-xl font-bold mb-4">Selamat datang, Admin</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="shadow-md rounded p-4">
              <h3 className="font-bold">Total Jasa: 16</h3>
            </div>
            <div className="shadow-md rounded p-4">
              <h3 className="font-bold">Total Pesanan: 16</h3>
            </div>
            <div className="shadow-md rounded p-4">
              <h3 className="font-bold">Total Pelanggan: 16</h3>
            </div>
            <div className="shadow-md rounded p-4">
              <h3 className="font-bold">Total Pendapatan: Rp16000000</h3>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
