import React from 'react';
import { motion } from 'framer-motion';

interface CategoryHeaderProps {
  title: string;
  description: string;
  coverImage: string;
}

export default function CategoryHeader({ title, description, coverImage }: CategoryHeaderProps) {
  return (
    <div className="relative h-[60vh] mb-16">
      <div className="absolute inset-0">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>
      <div className="relative h-full flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-4"
        >
          <h1 className="text-white text-4xl md:text-5xl font-serif mb-4">{title}</h1>
          <p className="text-gray-200 max-w-2xl mx-auto">{description}</p>
        </motion.div>
      </div>
    </div>
  );
}