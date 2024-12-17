import React from 'react';
import { motion } from 'framer-motion';

interface PhotoProgressProps {
  totalPhotos: number;
  selectedCount: number;
  printedCount: number;
  deliveredCount: number;
}

export default function PhotoProgress({
  totalPhotos,
  selectedCount,
  printedCount,
  deliveredCount,
}: PhotoProgressProps) {
  const getProgressPercentage = (count: number) => (count / totalPhotos) * 100;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Photo Progress</h3>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Selected</span>
            <span className="text-sm font-medium text-rose-600">
              {selectedCount} / {totalPhotos}
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${getProgressPercentage(selectedCount)}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-rose-500 rounded-full"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Printed</span>
            <span className="text-sm font-medium text-blue-600">
              {printedCount} / {totalPhotos}
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${getProgressPercentage(printedCount)}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-blue-500 rounded-full"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Delivered</span>
            <span className="text-sm font-medium text-green-600">
              {deliveredCount} / {totalPhotos}
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${getProgressPercentage(deliveredCount)}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-green-500 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}