import React from 'react';

// const Section2 = () => {
//   return (
//     <div className="bg-[#DDEDF4] px-5 py-12 text-center">
//       <h2 className="text-xl font-bold mb-5 text-black">
//         Kenapa Memilih ReparaTech?
//       </h2>
//       <p className="text-black mb-10">
//         Kami menggabungkan teknologi modern dan keahlian profesional untuk
//         memberikan layanan terbaik bagi pelanggan kami.
//       </p>

//       <div className="flex justify-center flex-wrap gap-6">
//         {/* Card 1 */}
//         <div className="bg-white rounded-lg shadow-md p-5 max-w-[300px] flex items-center">
//           <img
//             src="/assets/petir.png"
//             alt="Icon Petir"
//             className="w-6 h-auto mr-4 flex-shrink-0 relative -mt-20"
//           />
//           <div className="text-left">
//             <h3 className="text-lg font-bold mb-2 text-black">
//               Service Express 1 Jam
//             </h3>
//             <p className="text-sm text-black mb-3">
//               Layanan perbaikan cepat untuk kerusakan ringan dengan teknisi
//               profesional dan garansi penuh.
//             </p>
//             <ul className="list-none space-y-1">
//               <li className="text-black">
//                 <span className="text-[#224CB7]">✓</span> Diagnosa gratis
//               </li>
//               <li className="text-black">
//                 <span className="text-[#224CB7]">✓</span> Sparepart original
//               </li>
//               <li className="text-black">
//                 <span className="text-[#224CB7]">✓</span> Garansi 90 hari
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Card 2 */}
//         <div className="bg-white rounded-lg shadow-md p-5 max-w-[300px] flex items-center">
//           <img
//             src="/assets/perisai.png"
//             alt="Icon Perisai"
//             className="w-20 h-auto mr-4 flex-shrink-0 relative -mt-4"
//           />
//           <div className="text-left">
//             <h3 className="text-lg font-bold mb-5 text-black">
//               Garansi Terpercaya
//             </h3>
//             <p className="text-sm text-black mb-3">
//               Jaminan kualitas dengan garansi layanan hingga 90 hari dan
//               garansi uang kembali.
//             </p>
//             <ul className="list-none space-y-1">
//               <li className="text-black">
//                 <span className="text-[#224CB7]">✓</span> Garansi sparepart
//               </li>
//               <li className="text-black">
//                 <span className="text-[#224CB7]">✓</span> Uang kembali
//               </li>
//               <li className="text-black">
//                 <span className="text-[#224CB7]">✓</span> Asuransi service
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Card 3 */}
//         <div className="bg-white rounded-lg shadow-md p-5 max-w-[300px] flex items-center">
//           <img
//             src="/assets/orang.png"
//             alt="Icon Orang"
//             className="w-10 h-auto mr-4 flex-shrink-0 relative -mt-20"
//           />
//           <div className="text-left">
//             <h3 className="text-lg font-bold mb-2 text-black">
//               Teknisi Profesional
//             </h3>
//             <p className="text-sm text-black mb-3">
//               Tim teknisi berpengalaman dengan sertifikasi resmi dari berbagai
//               brand ternama.
//             </p>
//             <ul className="list-none space-y-1">
//               <li className="text-black">
//                 <span className="text-[#224CB7]">✓</span> Bersertifikasi
//               </li>
//               <li className="text-black">
//                 <span className="text-[#224CB7]">✓</span> 5 tahun pengalaman
//               </li>
//               <li className="text-black">
//                 <span className="text-[#224CB7]">✓</span> Training berkala
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

const Section2 = () => {
  return (
    <div className="bg-accent/10 px-5 py-12 text-center">
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
