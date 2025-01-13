import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#DDEDF4] py-8 text-black">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Kolom 1: ReparaTech */}
          <div>
            <h3 className="text-3xl font-extrabold mb-4">ReparaTech</h3>
            <p className="text-sm text-gray-600">
              Solusi terpercaya untuk perbaikan gadget Anda dengan teknisi profesional dan garansi layanan.
            </p>
          </div>

          {/* Kolom 2: Layanan */}
          <div>
            <h3 className="text-lg font-bold mb-4">Layanan</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>
                <a href="#service-smartphone" className="hover:underline">
                   Service Smartphone
                </a>
              </li>
              <li>
                <a href="#service-laptop" className="hover:underline">
                   Service Laptop
                </a>
              </li>
              <li>
                <a href="#service-tablet" className="hover:underline">
                   Service Tablet
                </a>
              </li>
              <li>
                <a href="#service-aksesoris" className="hover:underline">
                   Service Aksesoris
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Perusahaan */}
          <div>
            <h3 className="text-lg font-bold mb-4">Perusahaan</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>
                <a href="#tentang-kami" className="hover:underline">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#karir" className="hover:underline">
                 Karir
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:underline">
                Blog
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:underline">
                 FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Support */}
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>
                <a href="#syarat-ketentuan" className="hover:underline">
                 Syarat & Ketentuan
                </a>
              </li>
              <li>
                <a href="#kebijakan-privasi" className="hover:underline">
                   Kebijakan Privasi
                </a>
              </li>
              <li>
                <a href="#bantuan" className="hover:underline">
                  Bantuan
                </a>
              </li>
              <li>
                <a href="#kontak" className="hover:underline">
                  Kontak
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-600 text-sm mt-8 border-t pt-4">
          © 2024 ReparaTech. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
