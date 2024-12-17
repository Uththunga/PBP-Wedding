import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GalleryImage } from '../../types/gallery';
import { useImageLoad } from '../../hooks/useImageLoad';
import LoadingSpinner from '../ui/LoadingSpinner';

interface GalleryGridProps {
  images: GalleryImage[];
}

function GalleryItem({ image, index }: { image: GalleryImage; index: number }) {
  const { isLoading, error } = useImageLoad(image.url);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-gray-100"
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner size="md" />
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center text-red-500">
          <p>Failed to load image</p>
        </div>
      )}

      <motion.img
        src={image.url}
        alt={image.title}
        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      />
      
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-white text-xl font-serif mb-2">{image.title}</h3>
          {image.description && (
            <p className="text-gray-200 text-sm">{image.description}</p>
          )}
          {image.location && (
            <p className="text-gray-300 text-sm mt-2">{image.location}</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {images.map((image, index) => (
          <GalleryItem key={image.id} image={image} index={index} />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}