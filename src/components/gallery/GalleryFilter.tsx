import React from 'react';
import { motion } from 'framer-motion';
import { GalleryCategory } from '../../types/gallery';

interface GalleryFilterProps {
  categories: GalleryCategory[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function GalleryFilter({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}: GalleryFilterProps) {
  return (
    <div className="flex flex-wrap gap-4 justify-center mb-12">
      <motion.button
        key="all"
        onClick={() => onCategoryChange('all')}
        className={`px-6 py-2 rounded-full transition-colors ${
          activeCategory === 'all'
            ? 'bg-brand-primary text-white'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        All
      </motion.button>
      {categories.map((category) => (
        <motion.button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-6 py-2 rounded-full transition-colors ${
            activeCategory === category.id
              ? 'bg-brand-primary text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {category.title}
        </motion.button>
      ))}
    </div>
  );
}
