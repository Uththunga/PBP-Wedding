import React from 'react';
import { BookingStatus } from '../../types';

interface BookingStatusBadgeProps {
  status: BookingStatus;
}

export default function BookingStatusBadge({ status }: BookingStatusBadgeProps) {
  const getStatusStyles = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyles(status)}`}>
      {status}
    </span>
  );
}