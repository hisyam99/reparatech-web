import React from 'react'

const LandingPage = () => {
  return (
    <div className="font-sans leading-relaxed">
      {/* Section 1: Header */}
      <div className="flex items-center justify-between px-5 py-12 bg-white">
        <div className="max-w-[45%] ml-10">
          <h1 className="text-4xl font-bold mb-2 text-black leading-tight">
            Need repairs for your <br /> electronic gadgets?
          </h1>
          <p className="text-black mb-4 text-lg">
            We provide professional repair services <br /> for all your tech
            devices!
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-2 bg-[#224CB7] text-white font-bold rounded hover:bg-blue-700">
              Temukan Layanan Kami
            </button>
            <button className="flex items-center px-6 py-2 bg-transparent text-[#224CB7] font-bold border-2 border-[#224CB7] rounded hover:bg-blue-100">
              Kontak
              <img
                src="/assets/telepon1.png"
                alt="Icon Telepon"
                className="w-12 h-12 ml-2"
              />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center max-w-[50%]">
          <img
            src="/assets/home.png"
            alt="Electronic devices"
            className="w-full max-w-[500px] h-auto object-cover"
          />
        </div>
      </div>

      {/* Section 2: Why ReparaTech */}
      <div className="bg-[#DDEDF4] px-5 py-12 text-center">
        <h2 className="text-xl font-bold mb-5 text-black">
          Kenapa Memilih ReparaTech?
        </h2>
        <p className="text-black mb-10">
          Kami menggabungkan teknologi modern dan keahlian profesional untuk
          memberikan layanan terbaik bagi pelanggan kami.
        </p>

        {/* Cards */}
        <div className="flex justify-center flex-wrap gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-md p-5 max-w-[300px] flex items-center">
            {/* Asset (Gambar) */}
            <img
              src="/assets/petir.png"
              alt="Icon Petir"
              className="w-6 h-auto mr-4 flex-shrink-0 relative -mt-20"
            />
            {/* Konten Teks */}
            <div className="text-left">
              <h3 className="text-lg font-bold mb-2 text-black">
                Service Express 1 Jam
              </h3>
              <p className="text-sm text-black mb-3">
                Layanan perbaikan cepat untuk kerusakan ringan dengan teknisi
                profesional dan garansi penuh.
              </p>
              <ul className="list-none space-y-1">
                <li className="text-black">
                  <span className="text-[#224CB7]">✓</span> Diagnosa gratis
                </li>
                <li className="text-black">
                  <span className="text-[#224CB7]">✓</span> Sparepart original
                </li>
                <li className="text-black">
                  <span className="text-[#224CB7]">✓</span> Garansi 90 hari
                </li>
              </ul>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow-md p-5 max-w-[300px] flex items-center">
            {/* Asset (Gambar) */}
            <img
              src="/assets/perisai.png"
              alt="Icon Perisai"
              className="w-20 h-auto mr-4 flex-shrink-0 relative -mt-4"
            />

            {/* Konten Teks */}
            <div className="text-left">
              <h3 className="text-lg font-bold mb-2 text-black">
                Garansi Terpercaya
              </h3>
              <p className="text-sm text-black mb-3">
                Jaminan kualitas dengan garansi layanan hingga 90 hari dan
                garansi uang kembali.
              </p>
              <ul className="list-none space-y-1">
                <li className="text-black">
                  <span className="text-[#224CB7]">✓</span> Garansi sparepart
                </li>
                <li className="text-black">
                  <span className="text-[#224CB7]">✓</span> Uang kembali
                </li>
                <li className="text-black">
                  <span className="text-[#224CB7]">✓</span> Asuransi service
                </li>
              </ul>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg shadow-md p-5 max-w-[300px] flex items-center">
            {/* Asset (Gambar) */}
            <img
              src="/assets/orang.png"
              alt="Icon Orang"
              className="w-10 h-auto mr-4 flex-shrink-0 relative -mt-20"
            />
            {/* Konten Teks */}
            <div className="text-left">
              <h3 className="text-lg font-bold mb-2 text-black">
                Teknisi Profesional
              </h3>
              <p className="text-sm text-black mb-3">
                Tim teknisi berpengalaman dengan sertifikasi resmi dari berbagai
                brand ternama.
              </p>
              <ul className="list-none space-y-1">
                <li className="text-black">
                  <span className="text-[#224CB7]">✓</span> Bersertifikasi
                </li>
                <li className="text-black">
                  <span className="text-[#224CB7]">✓</span> 5 tahun pengalaman
                </li>
                <li className="text-black">
                  <span className="text-[#224CB7]">✓</span> Training berkala
                </li>
              </ul>
            </div>
          </div>

          {/* Section 3: Layanan Kami */}
          <div className="w-full py-12 bg-white text-center">
            <h2 className="text-xl font-bold mb-5 text-black">Layanan Kami</h2>
            <p className="text-black mb-10">
              Solusi lengkap untuk berbagai kebutuhan perbaikan gadget Anda
              dengan standar layanan profesional.
            </p>

            {/* Cards */}
            <div className="flex justify-center flex-wrap gap-6">
              {/* Card 1 */}
              <div className="bg-white border rounded-lg shadow-md p-6 max-w-[250px] text-left">
                <div className="flex justify-center mb-4">
                  {/* Tempat untuk Asset Gambar */}
                  <img
                    src="/assets/smartphone.png"
                    alt="Service Smartphone"
                    className="w-24 h-auto"
                  />
                </div>
                <h3 className="text-lg font-bold mb-2 text-black">
                  📱 Service Smartphone
                </h3>
                <ul className="list-disc pl-5 text-sm text-black mb-4">
                  <li>Ganti LCD & Touchscreen</li>
                  <li>Perbaikan Hardware</li>
                  <li>Software & OS</li>
                  <li>Water Damage</li>
                </ul>
                <button className="w-full px-4 py-2 bg-[#224CB7] text-white font-bold rounded hover:bg-blue-700">
                  Lihat Detail →
                </button>
              </div>

              {/* Card 2 */}
              <div className="bg-white border rounded-lg shadow-md p-6 max-w-[250px] text-left">
                <div className="flex justify-center mb-4">
                  {/* Tempat untuk Asset Gambar */}
                  <img
                    src="/assets/laptop.png"
                    alt="Service Laptop"
                    className="w-24 h-auto"
                  />
                </div>
                <h3 className="text-lg font-bold mb-2 text-black">
                  💻 Service Laptop
                </h3>
                <ul className="list-disc pl-5 text-sm text-black mb-4">
                  <li>Perbaikan Motherboard</li>
                  <li>Upgrade Hardware</li>
                  <li>Install Ulang OS</li>
                  <li>Data Recovery</li>
                </ul>
                <button className="w-full px-4 py-2 bg-[#224CB7] text-white font-bold rounded hover:bg-blue-700">
                  Lihat Detail →
                </button>
              </div>

              {/* Card 3 */}
              <div className="bg-white border rounded-lg shadow-md p-6 max-w-[250px] text-left">
                <div className="flex justify-center mb-4">
                  {/* Tempat untuk Asset Gambar */}
                  <img
                    src="/assets/tablet.png"
                    alt="Service Tablet"
                    className="w-24 h-auto"
                  />
                </div>
                <h3 className="text-lg font-bold mb-2 text-black">
                  📱 Service Tablet
                </h3>
                <ul className="list-disc pl-5 text-sm text-black mb-4">
                  <li>Ganti LCD iPad</li>
                  <li>Perbaikan Charging</li>
                  <li>Upgrade Storage</li>
                  <li>Battery Replacement</li>
                </ul>
                <button className="w-full px-4 py-2 bg-[#224CB7] text-white font-bold rounded hover:bg-blue-700">
                  Lihat Detail →
                </button>
              </div>

              {/* Card 4 */}
              <div className="bg-white border rounded-lg shadow-md p-6 max-w-[250px] text-left">
                <div className="flex justify-center mb-4">
                  {/* Tempat untuk Asset Gambar */}
                  <img
                    src="/assets/aksesoris.png"
                    alt="Service Aksesoris"
                    className="w-24 h-auto"
                  />
                </div>
                <h3 className="text-lg font-bold mb-2 text-black">
                  🎧 Service Aksesoris
                </h3>
                <ul className="list-disc pl-5 text-sm text-black mb-4">
                  <li>Headphone & TWS</li>
                  <li>Smartwatch</li>
                  <li>Power Bank</li>
                  <li>Game Console</li>
                </ul>
                <button className="w-full px-4 py-2 bg-[#224CB7] text-white font-bold rounded hover:bg-blue-700">
                  Lihat Detail →
                </button>
              </div>
            </div>

            {/* Section 4: Testimoni Pelanggan */}
            <div className="w-full py-12 bg-[#DDEDF4] text-center">
              <h2 className="text-xl font-bold mb-5 text-black">
                Testimoni Pelanggan
              </h2>
              <p className="text-black mb-10">
                Apa kata mereka tentang layanan ReparaTech
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-5 max-w-[800px] mx-auto">
                {/* Testimoni 1 */}
                <div className="bg-white border rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src="/assets/testimoni.png"
                      alt="Pelanggan 1"
                      className="w-12 h-12 rounded-full mr-3"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-black">
                        Pelanggan 1
                      </h3>
                      <p className="text-xs text-gray-500">Malang</p>
                    </div>
                  </div>
                  <p className="text-sm text-black">
                    “Pelayanan sangat cepat dan profesional.”
                  </p>
                </div>

                {/* Testimoni 2 */}
                <div className="bg-white border rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src="/assets/testimoni.png"
                      alt="Pelanggan 2"
                      className="w-12 h-12 rounded-full mr-3"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-black">
                        Pelanggan 2
                      </h3>
                      <p className="text-xs text-gray-500">Surabaya</p>
                    </div>
                  </div>
                  <p className="text-sm text-black">
                    “Kualitas sparepart terjamin original. Harga transparan dan
                    ada garansi service. Sangat puas!”
                  </p>
                </div>

                {/* Testimoni 3 */}
                <div className="bg-white border rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src="/assets/testimoni.png"
                      alt="Pelanggan 3"
                      className="w-12 h-12 rounded-full mr-3"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-black">
                        Pelanggan 3
                      </h3>
                      <p className="text-xs text-gray-500">Jakarta</p>
                    </div>
                  </div>
                  <p className="text-sm text-black">
                    “Teknisinya ramah dan menjelaskan masalah dengan detail.
                    Recommended!”
                  </p>
                </div>

                {/* Testimoni 4 */}
                <div className="bg-white border rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src="/assets/testimoni.png"
                      alt="Pelanggan 4"
                      className="w-12 h-12 rounded-full mr-3"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-black">
                        Pelanggan 4
                      </h3>
                      <p className="text-xs text-gray-500">Bandung</p>
                    </div>
                  </div>
                  <p className="text-sm text-black">
                    “Pelayanan sangat cepat dan profesional.”
                  </p>
                </div>
              </div>

              {/* Section 5: Hubungi Kami */}
              <div className="w-full py-12 bg-white text-center">
                <h2 className="text-xl font-bold mb-5 text-black">
                  Hubungi Kami
                </h2>
                <p className="text-black mb-10">
                  Kami siap membantu menyelesaikan masalah gadget Anda
                </p>

                <div className="max-w-[700px] mx-auto bg-[#F7F7F7] rounded-lg shadow-md p-6">
                  <div className="flex flex-col gap-4 md:gap-6">
                    {/* Lokasi Kami */}
                    <div className="flex items-start">
                      <img
                        src="/assets/map.png"
                        alt="Lokasi Kami"
                        className="w-8 h-8 mr-4"
                      />
                      <div className="text-left">
                        <h3 className="text-sm font-bold text-black">
                          Lokasi Kami
                        </h3>
                        <p className="text-sm text-gray-500">
                          Jl. Raya Tlogomas No. 246, Malang
                        </p>
                      </div>
                    </div>

                    {/* Telepon */}
                    <div className="flex items-start">
                      <img
                        src="/assets/telepon.png"
                        alt="Telepon"
                        className="w-8 h-8 mr-4"
                      />
                      <div className="text-left">
                        <h3 className="text-sm font-bold text-black">
                          Telepon
                        </h3>
                        <p className="text-sm text-gray-500">
                          +62 123-3456-7890
                        </p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start">
                      <img
                        src="/assets/email.png"
                        alt="Email"
                        className="w-8 h-8 mr-4"
                      />
                      <div className="text-left">
                        <h3 className="text-sm font-bold text-black">Email</h3>
                        <p className="text-sm text-gray-500">
                          contact@reparatech.xyz
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
