import React from 'react'

const Section5 = () => {
  return (
    <div className="w-full py-12 bg-base-100 text-center">
      <h2 className="text-xl font-bold mb-5 text-base-content">Hubungi Kami</h2>
      <p className="text-base-content mb-10">
        Kami siap membantu menyelesaikan masalah gadget Anda
      </p>

      <div className="max-w-[700px] mx-auto bg-base-200 rounded-lg shadow-md p-6">
        <div className="flex flex-col gap-4 md:gap-6">
          {[
            {
              icon: '/assets/map.png',
              title: 'Lokasi Kami',
              content: 'Jl. Raya Tlogomas No. 246, Malang',
            },
            {
              icon: '/assets/telepon.png',
              title: 'Telepon',
              content: '+62 123-3456-7890',
            },
            {
              icon: '/assets/email.png',
              title: 'Email',
              content: 'contact@reparatech.xyz',
            },
          ].map((item, index) => (
            <div key={index} className="flex items-start">
              <img src={item.icon} alt={item.title} className="w-8 h-8 mr-4" />
              <div className="text-left">
                <h3 className="text-sm font-bold text-base-content">
                  {item.title}
                </h3>
                <p className="text-sm text-base-content/60">{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Section5
