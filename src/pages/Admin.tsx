import React from 'react';
import { useBookingStore } from '../store/bookingStore';
import { BookingStatus } from '../types';
import BookingTable from '../components/admin/BookingTable';
import BookingStats from '../components/admin/BookingStats';
import BookingFilters from '../components/admin/BookingFilters';

export default function Admin() {
  const { bookings, packages, updateBookingStatus } = useBookingStore();
  const [statusFilter, setStatusFilter] = React.useState<BookingStatus | 'all'>('all');

  const getPackageName = (packageId: string) => {
    const pkg = packages.find(p => p.id === packageId);
    return pkg ? pkg.name : 'Unknown Package';
  };

  const filteredBookings = statusFilter === 'all'
    ? bookings
    : bookings.filter(booking => booking.status === statusFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Booking Management
          </h1>
          <p className="text-gray-500">
            Manage and track all photography session bookings
          </p>
        </div>
      </div>

      <BookingStats bookings={bookings} />

      <div className="mt-8">
        <BookingFilters
          currentFilter={statusFilter}
          onFilterChange={setStatusFilter}
        />

        {filteredBookings.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">No bookings found for the selected filter.</p>
          </div>
        ) : (
          <BookingTable
            bookings={filteredBookings}
            onStatusChange={updateBookingStatus}
            getPackageName={getPackageName}
          />
        )}
      </div>
    </div>
  );
}