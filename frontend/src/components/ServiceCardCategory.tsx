// components/ServiceCard.tsx
import React from 'react';

interface CategoryItem {
  title: string;
  price: string;
  imgSrc: string;
}

const ServiceCardCategory: React.FC<CategoryItem> = ({ title, price, imgSrc }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 flex flex-col items-center">
      <img src={imgSrc} alt={title} className="w-24 h-24 mb-4" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-500">Perkiraan Harga</p>
      <p className="font-bold mb-4">{price}</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Pesan Jasa</button>
    </div>
  );
};

export default ServiceCardCategory;
