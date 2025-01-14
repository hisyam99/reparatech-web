import React from 'react'

const Section3 = () => {
  return (
    <div className="w-full py-12 bg-base-100 text-center">
      <h2 className="text-xl font-bold mb-5 text-base-content">Layanan Kami</h2>
      <p className="text-base-content mb-10">
        Solusi lengkap untuk berbagai kebutuhan perbaikan gadget Anda dengan
        standar layanan profesional.
      </p>

      <div className="flex justify-center flex-wrap gap-6">
        {/* Service cards with consistent accent colors */}
        {[
          {
            icon: '/assets/smartphone.png',
            title: '📱 Service Smartphone',
            services: [
              'Ganti LCD & Touchscreen',
              'Perbaikan Hardware',
              'Software & OS',
              'Water Damage',
            ],
          },
          // ... similar structure for other cards
        ].map((service, index) => (
          <div
            key={index}
            className="bg-base-100 border rounded-lg shadow-md p-6 max-w-[250px] text-left">
            <div className="flex justify-center mb-8">
              <img
                src={service.icon}
                alt={service.title}
                className="w-24 h-auto"
              />
            </div>
            <h3 className="text-lg font-bold mb-6 text-base-content">
              {service.title}
            </h3>
            <ul className="list-disc pl-5 text-sm text-base-content mb-4">
              {service.services.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <button className="w-full px-4 py-2 bg-accent text-accent-content font-bold rounded hover:bg-accent-focus">
              Lihat Detail →
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Section3
