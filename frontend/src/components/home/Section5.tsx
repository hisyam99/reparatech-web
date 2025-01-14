import React from 'react';

const Section5 = () => {
  return (
    <div className="w-full py-12 bg-white text-center">
      {/* Section 5: Hubungi Kami */}
      <h2 className="text-xl font-bold mb-5 text-black">Hubungi Kami</h2>
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
              <h3 className="text-sm font-bold text-black">Lokasi Kami</h3>
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
              <h3 className="text-sm font-bold text-black">Telepon</h3>
              <p className="text-sm text-gray-500">+62 123-3456-7890</p>
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
  );
};

export default Section5;
