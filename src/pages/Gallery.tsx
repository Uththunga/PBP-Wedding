import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { images } from '../data/gallery';
import { Search, SlidersHorizontal } from 'lucide-react';
import ErrorBoundary from '../components/ui/ErrorBoundary';
import PageTransition from '../components/ui/PageTransition';
import ImageLightbox from '../components/gallery/ImageLightbox';
import { scrollToTop } from '../utils/scrollUtils';
import { GalleryImage } from '../types/gallery';

const ITEMS_PER_PAGE = 12;

export default function Gallery() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'popular'>('newest');
  const [page, setPage] = useState(1);
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);
  const [displayedImages, setDisplayedImages] = useState<GalleryImage[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort images
  useEffect(() => {
    let filtered = images.filter(img => img.category === 'wedding');

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
          return new Date(b.date || '').getTime() - new Date(a.date || '').getTime();
        case 'oldest':
          return new Date(a.date || '').getTime() - new Date(b.date || '').getTime();
        case 'popular':
          // Since we don't have likes, sort by date as default
          return new Date(b.date || '').getTime() - new Date(a.date || '').getTime();
        default:
          return 0;
      }
    });

    setFilteredImages(filtered);
    setPage(1);
    setDisplayedImages(filtered.slice(0, ITEMS_PER_PAGE));
    setHasMore(filtered.length > ITEMS_PER_PAGE);
  }, [searchQuery, sortOrder]);

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
                src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc"
                alt="Wedding Gallery Hero"
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
                  Wedding Gallery
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-brand-beige text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
                >
                  A collection of beautiful moments from our wedding photography sessions
                </motion.p>
              </div>
            </div>
          </section>

          {/* Gallery Section */}
          <section className="py-16 md:py-24 px-4 md:px-6">
            <div className="max-w-[1400px] mx-auto">
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative mb-12">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search wedding photos..."
                  className="w-full px-6 py-3 pl-12 rounded-full bg-white shadow-lg focus:ring-2 focus:ring-[#D9CFC4]/20 outline-none transition-shadow"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <SlidersHorizontal className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Sort Options */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="max-w-2xl mx-auto mb-8"
                  >
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Sort By</h3>
                      <div className="grid grid-cols-3 gap-4">
                        {['newest', 'oldest', 'popular'].map((sort) => (
                          <button
                            key={sort}
                            onClick={() => setSortOrder(sort as any)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              sortOrder === sort
                                ? 'bg-[#D9CFC4] text-gray-800'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {sort.charAt(0).toUpperCase() + sort.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Photo Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
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
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <h3 className="text-sm font-medium text-white/90">{image.title}</h3>
                        <p className="text-xs text-white/70 line-clamp-1">{image.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="mt-12 text-center">
                  <button
                    onClick={loadMore}
                    className="px-8 py-3 bg-brand-dark text-white rounded-full hover:bg-brand-dark/90 transition-colors"
                  >
                    Load More
                  </button>
                </div>
              )}

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

          {/* Call to Action */}
          <section className="relative py-32 px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-6">
                Ready to Capture Your Wedding Day?
              </h2>
              <p className="text-brand-muted text-lg max-w-2xl mx-auto mb-8">
                Let's create beautiful memories together on your special day
              </p>
              <Link
                to="/booking"
                onClick={scrollToTop}
                className="inline-block border-2 border-brand-dark text-brand-dark px-8 py-3 rounded-full hover:bg-brand-dark hover:text-brand-beige transition-colors duration-300 font-medium"
              >
                Book Your Wedding Session
              </Link>
            </motion.div>
          </section>
        </div>
      </ErrorBoundary>
    </PageTransition>
  );
}