'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CategoryJasaButtons from '@/components/CategoryJasaButtons';
import ServiceCardCategory from '@/components/ServiceCardCategory';


interface CategoryItem {
  title: string;
  price: string;
  imgSrc: string;
}

const JasaPage: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsClient(true); // Only enable client-side rendering after mounting
  }, []);

  if (!isClient) return null; // Avoid rendering before client-side is ready

  const category = searchParams?.get('category') || 'smartphone';

  const categories: Record<string, CategoryItem[]> = {
    smartphone: [
      { title: 'Ganti LCD & Touchscreen', price: 'Rp100.000 - Rp150.000', imgSrc: '/path/to/image1.png' },
      { title: 'Perbaikan Hardware', price: 'Rp100.000 - Rp150.000', imgSrc: '/path/to/image2.png' },
      { title: 'Software & OS', price: 'Rp100.000 - Rp150.000', imgSrc: '/path/to/image3.png' },
      { title: 'Water Damage', price: 'Rp100.000 - Rp150.000', imgSrc: '/path/to/image4.png' },
    ],
    laptop: [
      { title: 'Ganti Keyboard', price: 'Rp200.000 - Rp300.000', imgSrc: '/path/to/image5.png' },
      { title: 'Perbaikan Motherboard', price: 'Rp500.000 - Rp800.000', imgSrc: '/path/to/image6.png' },
    ],
    tablet: [
      { title: 'Ganti Baterai', price: 'Rp150.000 - Rp250.000', imgSrc: '/path/to/image7.png' },
    ],
    aksesoris: [
      { title: 'Perbaikan Charger', price: 'Rp50.000 - Rp100.000', imgSrc: '/path/to/image8.png' },
    ],
  };

  if (!categories[category]) {
    router.replace('/jasa?category=smartphone');
    return null;
  }

  return (
    <div className="container mx-auto mt-8">
      <CategoryJasaButtons currentCategory={category} />
      <h2 className="text-center text-2xl font-bold mb-8">Service {category.charAt(0).toUpperCase() + category.slice(1)}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories[category]?.map((service, index) => (
          <ServiceCardCategory
            key={index}
            title={service.title}
            price={service.price}
            imgSrc={service.imgSrc}
          />
        ))}
      </div>
    </div>
  );
};

export default JasaPage;
