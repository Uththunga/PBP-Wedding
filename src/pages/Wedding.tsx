import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { images } from '../data/gallery';
import PhotoSlideshow from '../components/gallery/PhotoSlideshow';
import PageTransition from '../components/ui/PageTransition';

const Wedding = () => {
  const weddingImages = images.filter(img => img.category === 'wedding');
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  return (
    <PageTransition>
      <div className="min-h-screen bg-brand-beige">
        {/* Hero Section */}
        <div className="relative h-[70vh]">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80"
              alt="Wedding Photography"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/50 to-brand-dark/30" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="max-w-3xl px-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-serif text-brand-beige mb-6"
              >
                Wedding Gallery
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-brand-light text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
              >
                Capturing timeless moments of love and celebration
              </motion.p>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {weddingImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
                onClick={() => setSelectedImageId(image.id)}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white text-xl font-serif mb-2">{image.title}</h3>
                    {image.location && (
                      <p className="text-gray-200 text-sm">{image.location}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Photo Slideshow */}
        {selectedImageId && (
          <PhotoSlideshow
            images={weddingImages}
            initialImageId={selectedImageId}
            onClose={() => setSelectedImageId(null)}
          />
        )}
      </div>
    </PageTransition>
  );
};

export default Wedding;
