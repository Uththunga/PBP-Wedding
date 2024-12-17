import React from 'react';
import { BookingStatus } from '../../types';

interface BookingFiltersProps {
  currentFilter: BookingStatus | 'all';
  onFilterChange: (filter: BookingStatus | 'all') => void;
}

export default function BookingFilters({ currentFilter, onFilterChange }: BookingFiltersProps) {
  return (
    <div className="flex space-x-4 mb-6">
      <button
        onClick={() => onFilterChange('all')}
        className={`px-4 py-2 rounded-md ${
          currentFilter === 'all'
            ? 'bg-indigo-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        All
      </button>
      <button
        onClick={() => onFilterChange('pending')}
        className={`px-4 py-2 rounded-md ${
          currentFilter === 'pending'
            ? 'bg-yellow-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        Pending
      </button>
      <button
        onClick={() => onFilterChange('confirmed')}
        className={`px-4 py-2 rounded-md ${
          currentFilter === 'confirmed'
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        Confirmed
      </button>
      <button
        onClick={() => onFilterChange('completed')}
        className={`px-4 py-2 rounded-md ${
          currentFilter === 'completed'
            ? 'bg-green-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        Completed
      </button>
      <button
        onClick={() => onFilterChange('cancelled')}
        className={`px-4 py-2 rounded-md ${
          currentFilter === 'cancelled'
            ? 'bg-red-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        Cancelled
      </button>
    </div>
  );
}