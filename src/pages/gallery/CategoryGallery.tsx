import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { categories, galleryImages } from '../../data/galleries';
import ImageLightbox from '../../components/gallery/ImageLightbox';

export default function CategoryGallery() {
  const { category } = useParams<{ category: string }>();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  
  const categoryData = categories.find(c => c.id === category);
  const images = category ? galleryImages[category] : [];

  if (!categoryData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Gallery not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-beige/20 to-white">
      {/* Hero Section */}
      <section className="relative h-[40vh] overflow-hidden">
        <div className="absolute inset-0">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
            src={categoryData.coverImage}
            alt={categoryData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 via-brand-dark/40 to-brand-dark/80" />
        </div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center px-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-serif text-white mb-6"
            >
              {categoryData.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-brand-beige text-lg md:text-xl max-w-2xl mx-auto"
            >
              {categoryData.description}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Images Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative aspect-square group cursor-pointer"
              onClick={() => setSelectedImageIndex(index)}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover rounded-lg transform transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <ImageLightbox
            images={images}
            currentIndex={selectedImageIndex}
            isOpen={true}
            onClose={() => setSelectedImageIndex(null)}
            onNext={() => setSelectedImageIndex((prev) => 
              prev !== null ? (prev + 1) % images.length : null
            )}
            onPrev={() => setSelectedImageIndex((prev) => 
              prev !== null ? (prev - 1 + images.length) % images.length : null
            )}
          />
        )}
      </AnimatePresence>
    </div>
  );
}