import React from 'react';
import { format } from 'date-fns';
import { Booking } from '../../types';
import BookingStatusBadge from './BookingStatusBadge';
import BookingActions from './BookingActions';
import BookingDetails from './BookingDetails';

interface BookingTableProps {
  bookings: Booking[];
  onStatusChange: (bookingId: string, newStatus: Booking['status']) => void;
  getPackageName: (packageId: string) => string;
}

export default function BookingTable({ bookings, onStatusChange, getPackageName }: BookingTableProps) {
  const [expandedBooking, setExpandedBooking] = React.useState<string | null>(null);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Client
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Package
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Photos
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bookings.map((booking) => (
            <React.Fragment key={booking.id}>
              <tr
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => setExpandedBooking(
                  expandedBooking === booking.id ? null : booking.id
                )}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{booking.clientName}</div>
                  <div className="text-sm text-gray-500">{booking.clientEmail}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{getPackageName(booking.packageId)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {format(new Date(booking.date), 'MMM dd, yyyy')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <BookingStatusBadge status={booking.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    Selected: {booking.selectedPhotos} / {booking.totalPhotos}
                  </div>
                  <div className="text-sm text-gray-500">
                    Printed: {booking.printedPhotos} / Delivered: {booking.deliveredPhotos}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <BookingActions
                    currentStatus={booking.status}
                    onStatusChange={(newStatus) => onStatusChange(booking.id, newStatus)}
                  />
                </td>
              </tr>
              {expandedBooking === booking.id && (
                <tr>
                  <td colSpan={6} className="px-6 py-4">
                    <BookingDetails booking={booking} />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}