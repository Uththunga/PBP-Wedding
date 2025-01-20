import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { categories as galleryCategories, images } from '../data/gallery';
import { Camera, Image as ImageIcon, Award, Heart, Star } from 'lucide-react';
import ErrorBoundary from '../components/ui/ErrorBoundary';
import PageTransition from '../components/ui/PageTransition';
import GalleryFilter from '../components/gallery/GalleryFilter';
import ImageLightbox from '../components/gallery/ImageLightbox';
import { scrollToTop } from '../utils/scrollUtils';
import { GalleryImage } from '../types/gallery';

const ITEMS_PER_PAGE = 12;

export default function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category');
  
  const [activeCategory, setActiveCategory] = useState(
    categoryFromUrl && galleryCategories.some(cat => cat.id === categoryFromUrl)
      ? categoryFromUrl
      : galleryCategories[0].id
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'popular'>('newest');
  const [page, setPage] = useState(1);
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);
  const [displayedImages, setDisplayedImages] = useState<GalleryImage[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Update URL when category changes
  useEffect(() => {
    if (activeCategory === galleryCategories[0].id) {
      searchParams.delete('category');
    } else {
      searchParams.set('category', activeCategory);
    }
    setSearchParams(searchParams, { replace: true }); // Using replace to avoid adding to history
  }, [activeCategory, searchParams, setSearchParams]);

  // Handle category changes from URL
  useEffect(() => {
    if (categoryFromUrl && galleryCategories.some(cat => cat.id === categoryFromUrl)) {
      setActiveCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  // Filter and sort images based on category, search query, and sort order
  useEffect(() => {
    let filtered = [...images];

    // Apply category filter
    if (activeCategory !== 'all') {
      filtered = filtered.filter(img => img.category === activeCategory);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(img => 
        img.title.toLowerCase().includes(query) ||
        img.description?.toLowerCase().includes(query) ||
        img.location?.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortOrder) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'popular':
          return (b.likes || 0) - (a.likes || 0);
        default:
          return 0;
      }
    });

    setFilteredImages(filtered);
    setPage(1);
    setDisplayedImages(filtered.slice(0, ITEMS_PER_PAGE));
    setHasMore(filtered.length > ITEMS_PER_PAGE);
  }, [activeCategory, searchQuery, sortOrder]);

  // Load more images when scrolling
  const loadMore = useCallback(() => {
    const nextPage = page + 1;
    const start = (nextPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const newImages = filteredImages.slice(start, end);
    
    if (newImages.length > 0) {
      setDisplayedImages(prev => [...prev, ...newImages]);
      setPage(nextPage);
      setHasMore(end < filteredImages.length);
    } else {
      setHasMore(false);
    }
  }, [page, filteredImages]);

  return (
    <PageTransition>
      <ErrorBoundary>
        <div className="bg-gradient-to-b from-brand-beige/20 to-white min-h-screen">
          {/* Hero Section */}
          <section className="relative h-[40vh] overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80"
                alt="Gallery Hero"
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
                  Our Gallery
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-brand-beige text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
                >
                  Explore our diverse collection of photography across various styles and occasions
                </motion.p>
              </div>
            </div>
          </section>

          {/* Gallery Section */}
          <section className="py-16 md:py-24 px-4 md:px-6">
            <div className="max-w-[1400px] mx-auto">
              <GalleryFilter
                categories={galleryCategories}
                activeCategory={activeCategory}
                onCategoryChange={(category) => {
                  setActiveCategory(category);
                  setPage(1);
                  setFilteredImages([]);
                }}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                sortOrder={sortOrder}
                onSortChange={setSortOrder}
              />

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mt-8">
                {displayedImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group aspect-[4/5] rounded-lg overflow-hidden bg-gray-100 cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300"
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
                        <h3 className="text-xs sm:text-sm font-medium mb-0.5 text-white/90">{image.title}</h3>
                        <p className="text-xs text-white/70 line-clamp-1">{image.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Lightbox */}
              <ImageLightbox
                images={displayedImages}
                currentIndex={selectedImageIndex || 0}
                isOpen={selectedImageIndex !== null}
                onClose={() => setSelectedImageIndex(null)}
                onNext={() => setSelectedImageIndex((prev) => 
                  prev !== null ? (prev + 1) % displayedImages.length : null
                )}
                onPrev={() => setSelectedImageIndex((prev) => 
                  prev !== null ? (prev - 1 + displayedImages.length) % displayedImages.length : null
                )}
              />
            </div>
          </section>

          {/* Visual Separator */}
          <div className="h-24 bg-gradient-to-b from-white to-transparent"></div>

          {/* Call to Action */}
          <section className="relative py-32 px-6">
            {/* Background with Parallax Effect */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="absolute inset-0 z-0"
            >
              <div className="absolute inset-0 bg-[url('/images/cta-bg.jpg')] bg-cover bg-center bg-fixed opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-b from-brand-beige/40 to-brand-beige/60" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-8"
              >
                <h2 className="text-4xl md:text-5xl font-serif text-brand-dark">
                  Ready to Create Your Story?
                </h2>
                <p className="text-brand-muted text-lg max-w-2xl mx-auto">
                  Let's work together to capture your special moments in extraordinary ways
                </p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Link
                    to="/booking"
                    onClick={scrollToTop}
                    className="inline-block border-2 border-brand-dark text-brand-dark px-8 py-3 rounded-full hover:bg-brand-dark hover:text-brand-beige transition-colors duration-300 font-medium group"
                  >
                    <span className="relative flex items-center">
                      Book a Session
                      
                    </span>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </section>
        </div>
      </ErrorBoundary>
    </PageTransition>
  );
}