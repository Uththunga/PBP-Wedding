import React from 'react';
import { BookingStatus } from '../../types';

interface BookingActionsProps {
  currentStatus: BookingStatus;
  onStatusChange: (newStatus: BookingStatus) => void;
}

export default function BookingActions({ currentStatus, onStatusChange }: BookingActionsProps) {
  return (
    <select
      value={currentStatus}
      onChange={(e) => onStatusChange(e.target.value as BookingStatus)}
      className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
    >
      <option value="pending">Pending</option>
      <option value="confirmed">Confirmed</option>
      <option value="completed">Completed</option>
      <option value="cancelled">Cancelled</option>
    </select>
  );
}