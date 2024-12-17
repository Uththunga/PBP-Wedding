import React from 'react';
import { Booking } from '../../types';
import PhotoManagement from './PhotoManagement';
import { useBookingStore } from '../../store/bookingStore';

interface BookingDetailsProps {
  booking: Booking;
}

export default function BookingDetails({ booking }: BookingDetailsProps) {
  const { updatePhotoStatus, togglePhotoSelection, updatePhotoCount } = useBookingStore();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Booking Details - {booking.clientName}
        </h2>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="mt-1 text-sm text-gray-900">{booking.clientEmail}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Date</dt>
            <dd className="mt-1 text-sm text-gray-900">{booking.date}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Package</dt>
            <dd className="mt-1 text-sm text-gray-900">{booking.packageId}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Status</dt>
            <dd className="mt-1 text-sm text-gray-900">{booking.status}</dd>
          </div>
        </dl>
      </div>

      <PhotoManagement
        photos={booking.photos}
        onPhotoStatusChange={(photoId, status) => updatePhotoStatus(booking.id, photoId, status)}
        onPhotoSelect={(photoId) => togglePhotoSelection(booking.id, photoId)}
        printedCount={booking.printedPhotos}
        deliveredCount={booking.deliveredPhotos}
        onCountUpdate={(type, count) => updatePhotoCount(booking.id, type, count)}
      />
    </div>
  );
}