export const metadata = {
    title: 'ReparaTech Dashboard',
    description: 'Admin dashboard for ReparaTech',
  };
  
  export default function DashboardComponentAdmin() {
    return (
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 p-4 shadow-md h-screen">
        <h1 className="text-2xl font-bold mb-6">ReparaTech</h1>
        <nav>
          <ul>
            <li className="mb-4">
              <a href="/admin/dashboard" className="block p-2 rounded hover:bg-secondary">Dashboard</a>
            </li>
            <li className="mb-4">
              <a href="#" className="block p-2 rounded hover:bg-secondary">Manage Services</a>
            </li>
            <li className="mb-4">
              <a href="#" className="bg-secondary block p-2 rounded hover:bg-secondary">Booking Management</a>
            </li>
            <li className="mb-4">
              <a href="#" className="block p-2 rounded hover:bg-secondary">Customer Management</a>
            </li>
            <li>
              <a href="#" className="block p-2 rounded hover:bg-secondary">Testimonials Management</a>
            </li>
          </ul>
        </nav>
      </aside>

        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-6">Selamat datang, Admin</h2>
  
          <div className="flex justify-end mb-4">
            <button className="px-4 py-2 rounded hover:bg-secondary">
              Tambah Pesanan
            </button>
          </div>

          <div className="bg-white shadow-md rounded overflow-hidden">
            <table className="table-auto w-full text-left border-collapse">
              <thead className="">
                <tr>
                  <th className="border px-4 py-2">Id Pesanan</th>
                  <th className="border px-4 py-2">Gambar Device User</th>
                  <th className="border px-4 py-2">User</th>
                  <th className="border px-4 py-2">Jasa</th>
                  <th className="border px-4 py-2">Jenis Pengiriman</th>
                  <th className="border px-4 py-2">Biaya Pengiriman</th>
                  <th className="border px-4 py-2">Kategori</th>
                  <th className="border px-4 py-2">Tagihan</th>
                  <th className="border px-4 py-2">Total Tagihan</th>
                  <th className="border px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">1</td>
                  <td className="border px-4 py-2">Gambar Device</td>
                  <td className="border px-4 py-2">Pelanggan123</td>
                  <td className="border px-4 py-2">Ganti LCD & Touchscreen</td>
                  <td className="border px-4 py-2">Antar Jemput</td>
                  <td className="border px-4 py-2">Rp50.000</td>
                  <td className="border px-4 py-2">Smartphone</td>
                  <td className="border px-4 py-2">Pending</td>
                  <td className="border px-4 py-2">Belum dibayar</td>
                  <td className="border px-4 py-2 flex gap-2">
                    <button className="hover:underline">Edit</button>
                    <button className="hover:underline">Hapus</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    );
  }
  