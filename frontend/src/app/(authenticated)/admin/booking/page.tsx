import BookingManagement from '@/components/Layouts/admin/booking';
import React from 'react';

const BookingManagementPageAdmin = () => {
  return (
    <div className="p-4 bg-base-100">
      <div className="container mx-auto">
        <BookingManagement/>
      </div>
    </div>
  );
};

export default BookingManagementPageAdmin;
