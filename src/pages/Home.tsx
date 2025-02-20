import { useState, useEffect, Suspense } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PackageCard from '../components/packages/PackageCard';
import { useBookingStore } from '../store/bookingStore';

// Keep only the data we need
const testimonials = [
  {
    name: "Sarah & Michael",
    role: "Wedding Couple",
    content: "Our wedding photos are absolutely stunning. Every precious moment was captured with such artistry and emotion!",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3"
  },
  {
    title: "Elena Martinez",
    role: "Fashion Model",
    content: "Working with this team was incredible. They truly understand how to capture the essence of fashion.",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3"
  },
  {
    title: "The Thompson Family",
    role: "Family Session",
    content: "They made our family shoot so fun and natural. The photos perfectly capture our family's personality!",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3"
  }
];

const featuredWork = [
  {
    title: "Beach Wedding",
    category: "Wedding",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552",
    link: "/gallery"
  },
  {
    title: "Garden Ceremony",
    category: "Wedding",
    image: "https://images.unsplash.com/photo-1606800052052-a08af7148866",
    link: "/gallery"
  },
  {
    title: "First Dance",
    category: "Wedding",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
    link: "/gallery"
  },
  {
    title: "Wedding Details",
    category: "Wedding",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a",
    link: "/gallery"
  },
  {
    title: "Bride Preparation",
    category: "Wedding",
    image: "https://images.unsplash.com/photo-1546804784-896d0dca3805",
    link: "/gallery"
  },
  {
    title: "Wedding Portraits",
    category: "Wedding",
    image: "https://images.unsplash.com/photo-1595407753674-c3305b76ad49",
    link: "/gallery"
  }
];

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { packages } = useBookingStore();

  // Preload hero image
  useEffect(() => {
    const img = new Image();
    img.src = "https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg?auto=compress&cs=tinysrgb&w=1920";
    img.onload = () => setIsImageLoaded(true);
  }, []);

  // Scroll to section effect
  useEffect(() => {
    if (location.state?.scrollToSection) {
      const section = document.getElementById(location.state.scrollToSection);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.state]);

  // Handle scroll position for back to top button
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero-section');
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const scrollPosition = window.scrollY;
        setShowBackToTop(scrollPosition > heroHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll handler for smooth scrolling
  const handleSmoothScroll = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const offset = element.offsetTop - 80; // Subtract header height if needed
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-brand-beige">
      {/* Hero Section */}
      <div id="hero-section" className="relative h-screen bg-brand-dark overflow-hidden">
        {/* Background Image with loading state */}
        <div className="absolute inset-0">
          {isImageLoaded ? (
            <motion.img
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
              src="https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Hero background"
              className="w-full h-full object-cover opacity-50"
              loading="eager"
              fetchPriority="high"
            />
          ) : (
            <div className="w-full h-full bg-brand-dark animate-pulse" />
          )}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20" />

        {/* Content Container */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-[#E2D9D0] font-serif text-4xl md:text-5xl lg:text-6xl mb-4 tracking-wide"
          >
            Prauda Buwaneka Photography
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-[#E2D9D0]/90 text-lg md:text-xl font-light tracking-[0.2em] mb-12"
          >
            Capturing moments, creating memories
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Link
              to="/gallery"
              className="group relative inline-flex items-center px-8 py-3 text-[#E2D9D0]/90 overflow-hidden rounded-full border border-[#E2D9D0]/20 hover:border-[#E2D9D0]/40 transition-colors duration-300"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-brand-primary/10 to-transparent group-hover:from-brand-primary/20 transition-all duration-300"></span>
              <span className="relative flex items-center text-sm tracking-[0.3em] uppercase">
                Explore Gallery 
                <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>
          </motion.div>

          {/* Scroll/Swipe Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="text-[#E2D9D0]/70 flex flex-col items-center cursor-pointer fixed md:absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-50 hover:text-[#E2D9D0] transition-colors"
            onClick={() => handleSmoothScroll('photography-packages')}
          >
            {/* Desktop Scroll Indicator */}
            <div className="hidden md:flex flex-col items-center">
              <span className="text-xs tracking-[0.2em] uppercase mb-2">Scroll</span>
              <div className="w-[1px] h-8 bg-[#E2D9D0]/30 relative overflow-hidden">
                <motion.div
                  animate={{ 
                    y: [0, 32, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-0 left-0 w-full h-full bg-[#E2D9D0]/70"
                />
              </div>
            </div>

            {/* Mobile Swipe Indicator */}
            <div className="flex md:hidden items-center space-x-2 bg-[#E2D9D0]/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-xs tracking-[0.1em] uppercase">Swipe Up</span>
              <motion.div
                animate={{ 
                  y: [-4, 4, -4]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative"
              >
                <motion.svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M12 20V4M5 11l7-7 7 7"/>
                </motion.svg>
                <motion.div
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1"
                  animate={{
                    opacity: [0, 1, 0],
                    y: [-8, 0, -8]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M12 20V4M5 11l7-7 7 7"/>
                  </svg>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wrap sections in Suspense for lazy loading */}
      <Suspense fallback={<div className="w-full h-64 bg-brand-beige/50 animate-pulse" />}>
        {/* Photography Packages Section */}
        <section id="photography-packages" className="relative py-24 md:py-40 px-4 md:px-8 bg-gradient-to-b from-brand-beige/20 to-white">
          <div className="relative max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-12 lg:mb-16 px-4 sm:px-6 lg:px-8"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-brand-dark mb-3 sm:mb-4">Wedding Photography Packages</h2>
              <p className="text-sm sm:text-base lg:text-lg text-brand-muted max-w-2xl mx-auto">
                Choose the perfect package for your special day
              </p>
            </motion.div>

            {/* Package Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
              {packages
                .filter(pkg => pkg.category === 'Wedding')
                .map((pkg, index) => (
                  <PackageCard 
                    key={pkg.id} 
                    package={pkg} 
                    onBook={() => navigate(`/packages/${pkg.id}`)} 
                    index={index}
                  />
                ))}
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-20"
            >
              <Link
                to="/packages"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-block border-2 border-brand-dark text-brand-dark px-10 py-4 rounded-full hover:bg-brand-dark hover:text-brand-beige transition-colors duration-300 font-medium text-lg"
              >
                Compare All Packages
              </Link>
            </motion.div>
          </div>
        </section>
      </Suspense>

      <Suspense fallback={<div className="w-full h-64 bg-brand-beige/50 animate-pulse" />}>
        {/* Featured Work Section */}
        <section className="py-12 md:py-16 bg-[#F8F5F3]">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-serif text-brand-dark mb-3">Featured Wedding Photos</h2>
              <p className="text-brand-muted text-base md:text-lg">
                Explore a curated collection of our most beautiful wedding photography moments that tell unique love stories.
              </p>
            </div>

            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-3 gap-8 mb-8">
                {featuredWork.map((image, index) => (
                  <motion.div
                    key={image.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative aspect-square group cursor-pointer rounded-xl overflow-hidden bg-white shadow-md"
                  >
                    <Link 
                      to="/gallery"
                      className="block w-full h-full"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      <img
                        src={image.image}
                        alt={image.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <h3 className="text-sm md:text-base text-white font-medium truncate">
                            {image.title}
                          </h3>
                          <p className="text-xs md:text-sm text-white/80 truncate">
                            Wedding Photography
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="text-center">
                <Link
                  to="/gallery"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#D9CFC4] text-gray-800 rounded-full text-sm font-medium hover:bg-[#D9CFC4]/90 transition-all duration-300 group"
                >
                  <span>View Wedding Gallery</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Suspense>

      {/* Testimonials Section */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-brand-light">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-brand-dark mb-3">Client Testimonials</h2>
            <p className="text-brand-muted max-w-2xl mx-auto">
              What our clients say about their experience with us
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name || testimonial.title}
                    loading="lazy"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <blockquote className="text-brand-dark text-center mb-4">
                  "{testimonial.content}"
                </blockquote>
                <div className="text-center">
                  <cite className="text-brand-primary font-medium block not-italic">
                    {testimonial.name || testimonial.title}
                  </cite>
                  <span className="text-sm text-brand-muted">{testimonial.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-brand-beige">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-brand-dark mb-4">
              Ready to Create Your Story?
            </h2>
            <p className="text-brand-muted mb-8">
              Let's work together to capture your special moments in extraordinary ways
            </p>
            <a
              href="/booking"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-2 border-brand-dark text-brand-dark px-8 py-3 rounded-full hover:bg-brand-dark hover:text-brand-beige transition-colors duration-300 font-medium"
            >
              Book a Session
            </a>
          </motion.div>
        </div>
      </section>

      {/* Back to Top Button */}
      <AnimatePresence>
  {showBackToTop && (
    <motion.button
      onClick={handleScrollToTop}
      className="group fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ scale: 1.05 }}
    >
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-primary/20 to-transparent group-hover:from-brand-primary/40 transition-all duration-300"></span>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="relative h-6 w-6 text-white transform group-hover:-translate-y-1 transition-transform duration-300"
        fill="none"
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20V4M5 11l7-7 7 7"/>
      </svg>
    </motion.button>
  )}
</AnimatePresence>

    </div>
  );
}