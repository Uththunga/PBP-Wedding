import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { categories as galleryCategories, images } from '../data/gallery';
import { Camera, Image as ImageIcon, Award, Heart, Star } from 'lucide-react';
import ErrorBoundary from '../components/ui/ErrorBoundary';
import PageTransition from '../components/ui/PageTransition';
import { scrollToTop } from '../utils/scrollUtils';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  const stats = [
    { icon: Camera, label: 'Photo Sessions', value: '1,000+' },
    { icon: Heart, label: 'Happy Clients', value: '500+' },
    { icon: Star, label: 'Years Experience', value: '15+' },
    { icon: Award, label: 'Awards Won', value: '25+' },
  ];

  const photoCategories = [
    {
      id: 'wedding',
      title: 'Wedding Photography',
      description: 'Capturing the magic and emotion of your special day with timeless elegance.',
      path: '/wedding',
      coverImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc'
    },
    {
      id: 'fashion',
      title: 'Fashion Photography',
      description: 'Creative and editorial photography that brings fashion to life.',
      path: '/fashion',
      coverImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b'
    },
    {
      id: 'family',
      title: 'Family Photography',
      description: 'Natural and heartwarming photos of family moments and connections.',
      path: '/family',
      coverImage: 'https://images.unsplash.com/photo-1511895426328-dc8714191300'
    },
    {
      id: 'portrait',
      title: 'Portrait Photography',
      description: 'Professional portraits that capture personality and character.',
      path: '/portraits',
      coverImage: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b'
    },
    {
      id: 'commercial',
      title: 'Commercial Photography',
      description: 'High-quality imagery for businesses and brands.',
      path: '/commercial',
      coverImage: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0'
    }
  ];

  const testimonials = [
    {
      name: "Sarah & Michael",
      role: "Wedding Clients",
      content: "Our wedding photos are absolutely stunning. Every precious moment was captured with such artistry and emotion!",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc"
    },
    {
      name: "Elena Martinez",
      role: "Fashion Model",
      content: "Working with this team was incredible. They truly understand how to capture the essence of fashion and style.",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b"
    },
    {
      name: "The Thompson Family",
      role: "Family Session",
      content: "They made our family shoot so fun and natural. The photos perfectly capture our family's personality!",
      image: "https://images.unsplash.com/photo-1511895426328-dc8714191300"
    }
  ];

  return (
    <ErrorBoundary>
      <PageTransition>
        <div className="bg-brand-beige min-h-screen">
          {/* Hero Section */}
          <section className="relative h-[70vh]">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80"
                alt="Gallery Hero"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/50 to-brand-dark/30" />
            </div>
            <div className="relative h-full flex items-center justify-center">
              <div className="text-center px-4">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl md:text-7xl font-serif text-brand-beige mb-6"
                >
                  Our Gallery
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-brand-light text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
                >
                  Explore our diverse collection of photography across various styles and occasions
                </motion.p>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-16 bg-brand-light">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <stat.icon className="w-8 h-8 mx-auto mb-4 text-brand-dark" />
                    <div className="text-4xl font-bold text-brand-dark mb-2">{stat.value}</div>
                    <div className="text-brand-muted font-serif">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Categories Section */}
          <section className="py-16 md:py-24 px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {photoCategories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group"
                  >
                    <Link
                      to={category.path}
                      onClick={scrollToTop}
                      className="block"
                    >
                      <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                        <img
                          src={category.coverImage}
                          alt={category.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                          <h3 className="text-xl md:text-2xl font-serif text-brand-beige mb-2">
                            {category.title}
                          </h3>
                          <p className="text-sm md:text-base text-brand-beige/80 line-clamp-2">
                            {category.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-16 md:py-24 px-4 md:px-6 bg-brand-light">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 rounded-lg shadow-md"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-lg md:text-xl font-serif text-brand-dark">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-brand-muted mb-4">{testimonial.role}</p>
                        <p className="text-sm md:text-base text-brand-dark">{testimonial.content}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-24 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-4xl font-serif text-brand-dark">Ready to Create Your Story?</h2>
                <p className="text-brand-muted max-w-2xl mx-auto">
                  Let's work together to capture your special moments in extraordinary ways
                </p>
                <Link
                  to="/booking"
                  onClick={scrollToTop}
                  className="inline-block px-8 py-3 bg-transparent border-2 border-brand-dark text-brand-dark rounded-full font-medium hover:bg-brand-dark hover:text-white transition-all duration-300"
                >
                  Book a Session
                </Link>
              </motion.div>
            </div>
          </section>
        </div>
      </PageTransition>
    </ErrorBoundary>
  );
}