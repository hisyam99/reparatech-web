// src/app/page.tsx

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
              <a href="#" className="bg-secondary text-white block p-2 rounded hover:bg-secondary">Dashboard</a>
            </li>
            <li className="mb-4">
              <a href="#" className="block p-2 rounded hover:bg-secondary hover:text-white">Manage Services</a>
            </li>
            <li className="mb-4">
              <a href="/admin/booking" className="block p-2 rounded hover:bg-secondary hover:text-white">Booking Management</a>
            </li>
            <li className="mb-4">
              <a href="#" className="block p-2 rounded hover:bg-secondary hover:text-white">Customer Management</a>
            </li>
            <li>
              <a href="#" className="block p-2 rounded hover:bg-secondary hover:text-white">Testimonials Management</a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Konten Utama */}
      <main className="flex-1 p-6">
        {/* Halaman Utama */}
        <div>
          <h2 className="text-xl font-bold mb-4">Selamat datang, Admin</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white shadow-md rounded p-4">
              <h3 className="font-bold text-black">Total Jasa: 16</h3>
            </div>
            <div className="bg-white shadow-md rounded p-4">
              <h3 className="font-bold text-black">Total Pesanan: 16</h3>
            </div>
            <div className="bg-white shadow-md rounded p-4">
              <h3 className="font-bold text-black">Total Pelanggan: 16</h3>
            </div>
            <div className="bg-white shadow-md rounded p-4">
              <h3 className="font-bold text-black">Total Pendapatan: Rp16000000</h3>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
