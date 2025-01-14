// components/CategoryButtons.tsx
import React from 'react';
import { useRouter } from 'next/navigation';

interface CategoryJasaButtonsProps {
  currentCategory: string;
}

const CategoryJasaButtons: React.FC<CategoryJasaButtonsProps> = ({ currentCategory }) => {
  const router = useRouter();

  const handleCategoryChange = (newCategory: string) => {
    router.push(`/jasa?category=${newCategory}`);
  };

  return (
    <div className="flex justify-center mb-6 space-x-4">
      <button
        onClick={() => handleCategoryChange('smartphone')}
        className={`py-2 px-4 rounded ${currentCategory === 'smartphone' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        Smartphone
      </button>
      <button
        onClick={() => handleCategoryChange('tablet')}
        className={`py-2 px-4 rounded ${currentCategory === 'tablet' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        Tablet
      </button>
      <button
        onClick={() => handleCategoryChange('laptop')}
        className={`py-2 px-4 rounded ${currentCategory === 'laptop' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        Laptop
      </button>
      <button
        onClick={() => handleCategoryChange('aksesoris')}
        className={`py-2 px-4 rounded ${currentCategory === 'aksesoris' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        Aksesoris
      </button>
    </div>
  );
};

export default CategoryJasaButtons;
