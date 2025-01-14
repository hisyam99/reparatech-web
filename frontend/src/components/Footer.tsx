import React from 'react'

const Footer = () => {
  const footerSections = [
    {
      title: 'Layanan',
      items: [
        { href: '#service-smartphone', text: 'Service Smartphone' },
        { href: '#service-laptop', text: 'Service Laptop' },
        { href: '#service-tablet', text: 'Service Tablet' },
        { href: '#service-aksesoris', text: 'Service Aksesoris' },
      ],
    },
    {
      title: 'Perusahaan',
      items: [
        { href: '#tentang-kami', text: 'Tentang Kami' },
        { href: '#karir', text: 'Karir' },
        { href: '#blog', text: 'Blog' },
        { href: '#faq', text: 'FAQ' },
      ],
    },
    {
      title: 'Support',
      items: [
        { href: '#syarat-ketentuan', text: 'Syarat & Ketentuan' },
        { href: '#kebijakan-privasi', text: 'Kebijakan Privasi' },
        { href: '#bantuan', text: 'Bantuan' },
        { href: '#kontak', text: 'Kontak' },
      ],
    },
  ]

  return (
    <footer className="bg-accent/10 py-8">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Kolom 1: ReparaTech */}
          <div>
            <h3 className="text-3xl font-extrabold mb-4 text-base-content">
              ReparaTech
            </h3>
            <p className="text-sm text-base-content/70">
              Solusi terpercaya untuk perbaikan gadget Anda dengan teknisi
              profesional dan garansi layanan.
            </p>
          </div>

          {/* Dynamic Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-bold mb-4 text-base-content">
                {section.title}
              </h3>
              <ul className="text-sm space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <a
                      href={item.href}
                      className="text-base-content/70 hover:text-accent hover:underline transition-colors duration-200">
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center text-base-content/70 text-sm mt-8 border-t border-base-content/10 pt-4">
          © 2024 ReparaTech. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
