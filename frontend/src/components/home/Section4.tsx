import React from 'react';

const Section4 = () => {
  return (
    <div className="w-full py-12 bg-[#DDEDF4] text-center">
      {/* Section 4: Testimoni Pelanggan */}
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
              <h3 className="text-sm font-bold text-black">Pelanggan 1</h3>
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
              <h3 className="text-sm font-bold text-black">Pelanggan 2</h3>
              <p className="text-xs text-gray-500">Surabaya</p>
            </div>
          </div>
          <p className="text-sm text-black">
            “Kualitas sparepart terjamin original. Harga transparan dan ada
            garansi service. Sangat puas!”
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
              <h3 className="text-sm font-bold text-black">Pelanggan 3</h3>
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
              <h3 className="text-sm font-bold text-black">Pelanggan 4</h3>
              <p className="text-xs text-gray-500">Bandung</p>
            </div>
          </div>
          <p className="text-sm text-black">
            “Pelayanan sangat cepat dan profesional.”
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section4;
