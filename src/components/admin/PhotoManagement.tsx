import React from 'react';
import { Photo, PhotoStatus } from '../../types';
import { Check, Printer, Package } from 'lucide-react';

interface PhotoManagementProps {
  photos: Photo[];
  onPhotoStatusChange: (photoId: string, status: PhotoStatus) => void;
  onPhotoSelect: (photoId: string) => void;
  printedCount: number;
  deliveredCount: number;
  onCountUpdate: (type: 'printed' | 'delivered', count: number) => void;
}

export default function PhotoManagement({
  photos,
  onPhotoStatusChange,
  onPhotoSelect,
  printedCount,
  deliveredCount,
  onCountUpdate,
}: PhotoManagementProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Photo Tracking</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-4">
            <Printer className="h-5 w-5 text-gray-400" />
            <div className="flex-1">
              <label htmlFor="printed" className="block text-sm font-medium text-gray-700">
                Printed Photos
              </label>
              <input
                type="number"
                id="printed"
                min="0"
                value={printedCount}
                onChange={(e) => onCountUpdate('printed', parseInt(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Package className="h-5 w-5 text-gray-400" />
            <div className="flex-1">
              <label htmlFor="delivered" className="block text-sm font-medium text-gray-700">
                Delivered Photos
              </label>
              <input
                type="number"
                id="delivered"
                min="0"
                value={deliveredCount}
                onChange={(e) => onCountUpdate('delivered', parseInt(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Photo Selection</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="relative group">
              <img
                src={photo.url}
                alt="Photo"
                className="w-full h-40 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                <div className="absolute inset-0 flex items-center justify-center space-x-2">
                  <button
                    onClick={() => onPhotoSelect(photo.id)}
                    className={`p-2 rounded-full ${
                      photo.selected
                        ? 'bg-green-500 text-white'
                        : 'bg-white text-gray-700'
                    }`}
                  >
                    <Check className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="absolute bottom-2 right-2">
                <select
                  value={photo.status}
                  onChange={(e) => onPhotoStatusChange(photo.id, e.target.value as PhotoStatus)}
                  className="text-xs rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="selected">Selected</option>
                  <option value="printed">Printed</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}