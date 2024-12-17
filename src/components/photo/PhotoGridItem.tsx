import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Printer, Package } from 'lucide-react';
import { Photo, PhotoStatus } from '../../types';

interface PhotoGridItemProps {
  photo: Photo;
  onSelect: (photoId: string) => void;
  onStatusChange: (photoId: string, status: PhotoStatus) => void;
}

export default function PhotoGridItem({ photo, onSelect, onStatusChange }: PhotoGridItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100"
    >
      <img
        src={photo.url}
        alt="Photography"
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onSelect(photo.id)}
              className={`rounded-full p-2 ${
                photo.selected
                  ? 'bg-rose-500 text-white'
                  : 'bg-white/90 text-gray-700'
              }`}
            >
              <Heart className="h-5 w-5" />
            </motion.button>
            
            <select
              value={photo.status}
              onChange={(e) => onStatusChange(photo.id, e.target.value as PhotoStatus)}
              className="text-sm bg-white/90 rounded-full px-3 py-1 border-none focus:ring-2 focus:ring-rose-500"
            >
              <option value="selected">Selected</option>
              <option value="printed">Printed</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        </div>
      </div>

      {photo.status !== 'selected' && (
        <div className="absolute top-3 right-3">
          {photo.status === 'printed' ? (
            <span className="bg-blue-500/90 text-white rounded-full px-3 py-1 text-xs flex items-center">
              <Printer className="h-3 w-3 mr-1" />
              Printed
            </span>
          ) : (
            <span className="bg-green-500/90 text-white rounded-full px-3 py-1 text-xs flex items-center">
              <Package className="h-3 w-3 mr-1" />
              Delivered
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
}