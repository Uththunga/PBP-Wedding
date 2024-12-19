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
        className={`relative overflow-hidden px-6 py-2 rounded-full font-medium transition-colors group ${
          activeCategory === 'all'
            ? 'border-2 border-brand-primary text-white'
            : 'border-2 border-brand-primary text-brand-primary hover:text-white'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="relative z-10">All</span>
        <div className={`absolute inset-0 bg-brand-primary transform transition-transform duration-300 ease-out ${
          activeCategory === 'all' ? 'translate-x-0' : '-translate-x-full group-hover:translate-x-0'
        }`} />
      </motion.button>
      {categories.map((category) => (
        <motion.button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`relative overflow-hidden px-6 py-2 rounded-full font-medium transition-colors group ${
            activeCategory === category.id
              ? 'border-2 border-brand-primary text-white'
              : 'border-2 border-brand-primary text-brand-primary hover:text-white'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10">{category.title}</span>
          <div className={`absolute inset-0 bg-brand-primary transform transition-transform duration-300 ease-out ${
            activeCategory === category.id ? 'translate-x-0' : '-translate-x-full group-hover:translate-x-0'
          }`} />
        </motion.button>
      ))}
    </div>
  );
}
