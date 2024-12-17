import React from 'react';
import { motion } from 'framer-motion';
import { ImageIcon, PrinterIcon, PackageIcon, HeartIcon } from 'lucide-react';

interface PhotoFiltersProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
  counts: {
    all: number;
    selected: number;
    printed: number;
    delivered: number;
  };
}

export default function PhotoFilters({ currentFilter, onFilterChange, counts }: PhotoFiltersProps) {
  const filters = [
    { id: 'all', label: 'All Photos', icon: ImageIcon, count: counts.all },
    { id: 'selected', label: 'Selected', icon: HeartIcon, count: counts.selected },
    { id: 'printed', label: 'Printed', icon: PrinterIcon, count: counts.printed },
    { id: 'delivered', label: 'Delivered', icon: PackageIcon, count: counts.delivered },
  ];

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {filters.map((filter) => {
        const Icon = filter.icon;
        const isActive = currentFilter === filter.id;
        
        return (
          <motion.button
            key={filter.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onFilterChange(filter.id)}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-full
              ${isActive
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                : 'bg-white text-gray-600 hover:bg-gray-50'
              }
              transition-colors duration-200
            `}
          >
            <Icon className="h-4 w-4" />
            <span>{filter.label}</span>
            <span className={`
              px-2 py-0.5 rounded-full text-xs
              ${isActive ? 'bg-white/20' : 'bg-gray-100'}
            `}>
              {filter.count}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}