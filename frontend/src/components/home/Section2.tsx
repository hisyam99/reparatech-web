import React from 'react';

const Section2 = () => {
  return (
    <div id='fitur' className="bg-accent/10 px-5 py-12 text-center">
      <h2 className="text-xl font-bold mb-5 text-base-content">
        Kenapa Memilih ReparaTech?
      </h2>
      <p className="text-base-content mb-10">
        Kami menggabungkan teknologi modern dan keahlian profesional untuk memberikan layanan terbaik bagi pelanggan kami.
      </p>

      <div className="flex justify-center flex-wrap gap-6">
        {/* Cards with consistent styling */}
        {[
          {
            icon: '/assets/petir.png',
            title: 'Service Express 1 Jam',
            description: 'Layanan perbaikan cepat untuk kerusakan ringan dengan teknisi profesional dan garansi penuh.',
            features: ['Diagnosa gratis', 'Sparepart original', 'Garansi 90 hari']
          },
          {
            icon: '/assets/perisai.png',
            title: 'Garansi Terpercaya',
            description: 'Jaminan kualitas dengan garansi layanan hingga 90 hari dan garansi uang kembali.',
            features: ['Garansi sparepart', 'Uang kembali', 'Asuransi service']
          },
          {
            icon: '/assets/orang.png',
            title: 'Teknisi Profesional',
            description: 'Tim teknisi berpengalaman dengan sertifikasi resmi dari berbagai brand ternama.',
            features: ['Bersertifikasi', '5 Tahun pengalaman', 'Training Berkala']
          },
        ].map((card, index) => (
          <div key={index} className="bg-base-100 rounded-lg shadow-md p-5 max-w-[300px] flex items-center">
            <img src={card.icon} alt={`Icon ${index + 1}`} className="w-6 h-auto mr-4 flex-shrink-0" />
            <div className="text-left">
              <h3 className="text-lg font-bold mb-2 text-base-content">{card.title}</h3>
              <p className="text-sm text-base-content mb-3">{card.description}</p>
              <ul className="list-none space-y-1">
                {card.features.map((feature, i) => (
                  <li key={i} className="text-base-content">
                    <span className="text-accent">✓</span> {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section2;
