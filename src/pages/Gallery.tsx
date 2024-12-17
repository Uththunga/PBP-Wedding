import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { categories, images } from '../data/gallery';
import { Camera, Image as ImageIcon, Award, Heart } from 'lucide-react';
import GalleryFilter from '../components/gallery/GalleryFilter';
import GalleryGrid from '../components/gallery/GalleryGrid';
import ErrorBoundary from '../components/ui/ErrorBoundary';
import PageTransition from '../components/ui/PageTransition';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const stats = [
    { icon: Camera, label: 'Photos Taken', value: '50,000+' },
    { icon: ImageIcon, label: 'Projects Completed', value: '1,000+' },
    { icon: Award, label: 'Awards Won', value: '25+' },
    { icon: Heart, label: 'Happy Clients', value: '500+' },
  ];

  const featuredImages = Object.values(images).flat().slice(0, 6).map(image => image.url);

  const testimonials = [
    {
      name: 'John Doe',
      role: 'CEO, ABC Corporation',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
    },
    {
      name: 'Jane Doe',
      role: 'Founder, XYZ Startup',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.',
      image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80',
    },
    {
      name: 'Bob Smith',
      role: 'Marketing Manager, DEF Agency',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.',
      image: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&q=80',
    },
  ];

  return (
    <ErrorBoundary>
      <PageTransition>
        <div className="bg-brand-beige min-h-screen">
          {/* Hero Section */}
          <section className="relative h-[60vh]">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80"
                alt="Gallery Hero"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-brand-dark/30" />
            </div>
            <div className="relative h-full flex items-center justify-center">
              <div className="text-center px-4">
                <h1 className="text-4xl md:text-6xl font-serif text-brand-beige mb-6">
                  Our Gallery
                </h1>
                <p className="text-brand-light text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                  A collection of our finest moments and cherished memories
                </p>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-16 bg-brand-light">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-4xl font-bold text-brand-dark mb-2">{stat.value}</div>
                    <div className="text-brand-muted">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Categories Section */}
          <section className="py-24 px-6">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-serif text-brand-dark text-center mb-16">Categories</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {categories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    onHoverStart={() => setSelectedCategory(category.id)}
                    onHoverEnd={() => setSelectedCategory('all')}
                  >
                    <Link to={category.path} className="block group">
                      <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                        <img
                          src={category.coverImage}
                          alt={category.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <motion.div
                          animate={{
                            backgroundColor: selectedCategory === category.id ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.5)',
                          }}
                          className="absolute inset-0 transition-all duration-300"
                        >
                          <div className="absolute bottom-0 left-0 right-0 p-8">
                            <h2 className="text-white text-3xl font-serif mb-3">{category.title}</h2>
                            <motion.p
                              initial={{ opacity: 0, y: 20 }}
                              animate={{
                                opacity: selectedCategory === category.id ? 1 : 0,
                                y: selectedCategory === category.id ? 0 : 20,
                              }}
                              className="text-gray-200 leading-relaxed"
                            >
                              {category.description}
                            </motion.p>
                          </div>
                        </motion.div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Work */}
          <section className="py-24 px-6 bg-brand-light">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-serif text-brand-dark text-center mb-16">Featured Work</h2>
              <GalleryFilter 
                categories={categories}
                activeCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
              <GalleryGrid images={filteredImages} />
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-24 px-6">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-serif text-brand-dark text-center mb-16">Client Stories</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <div key={testimonial.name} className="bg-brand-light p-8 rounded-lg">
                    <p className="text-brand-dark italic mb-6">{testimonial.content}</p>
                    <div className="flex items-center">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <div className="font-semibold text-brand-dark">{testimonial.name}</div>
                        <div className="text-brand-muted">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-24 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-serif text-brand-dark mb-6"
              >
                Ready to Create Your Story?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-brand-muted mb-8"
              >
                Let's work together to capture your special moments in extraordinary ways
              </motion.p>
              <Link
                to="/booking"
                className="inline-block bg-brand-dark text-brand-beige px-8 py-3 rounded-full hover:bg-brand-dark/80 transition-colors"
              >
                Book a Session
              </Link>
            </div>
          </section>
        </div>
      </PageTransition>
    </ErrorBoundary>
  );
}