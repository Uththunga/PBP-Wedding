import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GalleryImage } from '../../types/gallery';
import { useImageLoad } from '../../hooks/useImageLoad';
import LoadingSpinner from '../ui/LoadingSpinner';
import { X, ZoomIn, Download, Share, ChevronLeft, ChevronRight } from 'lucide-react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

interface GalleryGridProps {
  images: GalleryImage[];
  onLoadMore?: () => void;
  hasMore?: boolean;
}

interface LightboxProps {
  image: GalleryImage;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

function Lightbox({ image, onClose, onPrev, onNext, hasPrev, hasNext }: LightboxProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute top-4 right-4 z-50 flex space-x-4">
        <button
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            window.open(image.url, '_blank');
          }}
        >
          <Download className="w-5 h-5" />
        </button>
        <button
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            navigator.share?.({
              title: image.title,
              text: image.description,
              url: image.url,
            }).catch(() => {});
          }}
        >
          <Share className="w-5 h-5" />
        </button>
        <button
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <button
        className={`absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors ${
          !hasPrev && 'opacity-50 cursor-not-allowed'
        }`}
        onClick={(e) => {
          e.stopPropagation();
          hasPrev && onPrev();
        }}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors ${
          !hasNext && 'opacity-50 cursor-not-allowed'
        }`}
        onClick={(e) => {
          e.stopPropagation();
          hasNext && onNext();
        }}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="max-w-7xl max-h-[90vh] px-4" onClick={(e) => e.stopPropagation()}>
        <img
          src={image.url}
          alt={image.title}
          className="max-w-full max-h-[85vh] object-contain mx-auto"
        />
        <div className="mt-4 text-white text-center">
          <h3 className="text-xl font-serif mb-2">{image.title}</h3>
          {image.description && (
            <p className="text-gray-300">{image.description}</p>
          )}
          {image.location && (
            <p className="text-gray-400 text-sm mt-2">{image.location}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function GalleryItem({ image, index, onImageClick }: { image: GalleryImage; index: number; onImageClick: () => void }) {
  const { isLoading, error } = useImageLoad(image.url);
  const ref = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(ref, {});
  const isVisible = !!entry?.isIntersecting;

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-gray-100 cursor-zoom-in"
      onClick={onImageClick}
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
        loading="lazy"
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
          <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="inline-flex items-center text-white text-sm">
              <ZoomIn className="w-4 h-4 mr-2" />
              Click to view
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function GalleryGrid({ images, onLoadMore, hasMore = false }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const loadMoreObserver = useIntersectionObserver(loadMoreRef, {});

  useEffect(() => {
    if (loadMoreObserver?.isIntersecting && hasMore && onLoadMore) {
      onLoadMore();
    }
  }, [loadMoreObserver?.isIntersecting, hasMore, onLoadMore]);

  const handlePrevImage = useCallback(() => {
    setSelectedImage((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
  }, []);

  const handleNextImage = useCallback(() => {
    setSelectedImage((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : prev));
  }, [images.length]);

  return (
    <>
      <AnimatePresence mode="popLayout">
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {images.map((image, index) => (
            <GalleryItem 
              key={image.id} 
              image={image} 
              index={index}
              onImageClick={() => setSelectedImage(index)}
            />
          ))}
        </motion.div>

        {selectedImage !== null && (
          <Lightbox
            image={images[selectedImage]}
            onClose={() => setSelectedImage(null)}
            onPrev={handlePrevImage}
            onNext={handleNextImage}
            hasPrev={selectedImage > 0}
            hasNext={selectedImage < images.length - 1}
          />
        )}
      </AnimatePresence>

      {hasMore && (
        <div ref={loadMoreRef} className="mt-8 flex justify-center">
          <LoadingSpinner size="lg" />
        </div>
      )}
    </>
  );
}