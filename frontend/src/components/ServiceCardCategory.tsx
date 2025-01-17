// /frontend/src/components/ServiceCardCategory.tsx
import { ServiceData } from '@/types/Service';
import Link from 'next/link';

interface ServiceCardCategoryProps {
  service: ServiceData;
}

const ServiceCardCategory: React.FC<ServiceCardCategoryProps> = ({ service }) => {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
      <figure className="px-4 pt-4">
        {service.image ? (
          <img
            src={service.image}
            alt={service.nama_jasa}
            className="rounded-xl h-48 w-full object-cover"
          />
        ) : (
          <div className="bg-base-200 rounded-xl h-48 w-full flex items-center justify-center">
            No Image
          </div>
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg">{service.nama_jasa}</h2>
        <p className="text-sm opacity-70">Category: {service.category.name}</p>
        <p className="font-semibold">
          Rp {service.perkiraan_harga.toLocaleString()}
        </p>
        <p className="text-sm">Est. Time: {service.estimasi} days</p>
        <div className="card-actions justify-end mt-4">
          <Link href="/services/create" className='btn btn-primary btn-sm'>Book Service</Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCardCategory;