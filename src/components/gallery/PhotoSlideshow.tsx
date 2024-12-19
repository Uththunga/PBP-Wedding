import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GalleryImage } from '../../types/gallery';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface PhotoSlideshowProps {
  images: GalleryImage[];
  initialImageId: string;
  onClose: () => void;
}

const PhotoSlideshow: React.FC<PhotoSlideshowProps> = ({ images, initialImageId, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(() => {
    return images.findIndex(img => img.id === initialImageId);
  });

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const currentImage = images[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
        onClick={onClose}
      >
        <FiX size={24} />
      </button>

      <button
        className="absolute left-4 text-white hover:text-gray-300 transition-colors"
        onClick={handlePrevious}
      >
        <FiChevronLeft size={32} />
      </button>

      <button
        className="absolute right-4 text-white hover:text-gray-300 transition-colors"
        onClick={handleNext}
      >
        <FiChevronRight size={32} />
      </button>

      <div className="w-full max-w-7xl px-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="relative"
          >
            <img
              src={currentImage.url}
              alt={currentImage.title}
              className="w-full max-h-[80vh] object-contain mx-auto"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
              <h3 className="text-white text-2xl font-serif mb-2">{currentImage.title}</h3>
              {currentImage.location && (
                <p className="text-gray-200">{currentImage.location}</p>
              )}
              {currentImage.description && (
                <p className="text-gray-300 mt-2">{currentImage.description}</p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-white scale-125' : 'bg-gray-500'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PhotoSlideshow;
