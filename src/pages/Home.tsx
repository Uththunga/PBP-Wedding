import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Heart, Camera, Users, Briefcase, Sparkles, Star, Check } from 'lucide-react';
import { scrollToTop } from '../utils/scrollUtils';
import { useAuthStore } from '../store/authStore';

// Lazy load Hero component
const Hero = lazy(() => import('../components/home/Hero'));

// Optimize image loading with modern formats and sizes
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

const services = [
  {
    icon: Heart,
    title: "Wedding Photography",
    description: "Capturing your special day with elegance and emotion",
    path: "/wedding",
    features: ["Full day coverage", "Second photographer", "Engagement session"]
  },
  {
    icon: Sparkles,
    title: "Fashion Photography",
    description: "Editorial and high-fashion photography that stands out",
    path: "/fashion",
    features: ["Studio sessions", "Location shoots", "Professional styling"]
  },
  {
    icon: Users,
    title: "Family Photography",
    description: "Natural and candid family moments",
    path: "/family",
    features: ["Outdoor sessions", "Multiple locations", "Digital gallery"]
  },
  {
    icon: Camera,
    title: "Portrait Photography",
    description: "Professional portraits that tell your story",
    path: "/portraits",
    features: ["Studio/Outdoor", "Multiple outfits", "Retouched photos"]
  },
  {
    icon: Briefcase,
    title: "Commercial Photography",
    description: "Professional imagery for your business",
    path: "/commercial",
    features: ["Product photography", "Corporate events", "Brand storytelling"]
  }
];

const processSteps = [
  {
    number: "01",
    title: "Initial Consultation",
    description: "We discuss your vision and requirements"
  },
  {
    number: "02",
    title: "Planning Session",
    description: "Detailed planning of the shoot and locations"
  },
  {
    number: "03",
    title: "Photo Session",
    description: "Professional photography with attention to detail"
  },
  {
    number: "04",
    title: "Post-Processing",
    description: "Artistic editing and enhancement of your photos"
  }
];

const featuredWork = [
  {
    title: "Wedding",
    category: "Wedding",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3",
    link: "/wedding"
  },
  {
    title: "Fashion",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3",
    link: "/fashion"
  },
  {
    title: "Family",
    category: "Family",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3",
    link: "/family"
  },
  {
    title: "Portrait",
    category: "Portrait",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3",
    link: "/portraits"
  },
  {
    title: "Commercial",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1664575197229-3bbebc281874?ixlib=rb-4.0.3",
    link: "/commercial"
  },
  {
    title: "Events",
    category: "Events",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3",
    link: "/events"
  }
];

const packages = [
  // Wedding Packages
  {
    id: 'wedding-premium',
    category: 'Wedding',
    name: "Premium Wedding",
    description: "Complete wedding day coverage with luxury extras",
    features: [
      'Full day coverage (10 hours)',
      'Two professional photographers',
      'Engagement session included',
      'Premium leather-bound album',
      'Online gallery with high-res images',
      'Drone aerial shots'
    ]
  },
  {
    id: 'wedding-essential',
    category: 'Wedding',
    name: "Wedding Essentials",
    description: "Perfect coverage for intimate weddings",
    features: [
      '8 hours of coverage',
      'Second photographer',
      'Digital gallery with downloads',
      'Custom photo album',
      'Engagement mini-session',
      'Print release included'
    ]
  },
  // Fashion Packages
  {
    id: 'fashion-editorial',
    category: 'Fashion',
    name: "Editorial Fashion",
    description: "Professional fashion photography for magazines and portfolios",
    features: [
      'Studio or location shoot',
      'Professional styling consultation',
      'Multiple outfit changes',
      'High-end retouching',
      'Commercial usage rights',
      'Digital and print delivery'
    ]
  },
  {
    id: 'fashion-portfolio',
    category: 'Fashion',
    name: "Model Portfolio",
    description: "Build your modeling portfolio with professional shots",
    features: [
      '4 hours of shooting',
      'Multiple looks and setups',
      'Basic retouching included',
      'Digital gallery delivery',
      'Print release',
      '25 final edited images'
    ]
  },
  // Family Packages
  {
    id: 'family-standard',
    category: 'Family',
    name: "Family Portrait",
    description: "Capture precious family moments in beautiful settings",
    features: [
      '2 hours of coverage',
      'Multiple locations',
      'Digital gallery',
      'Print release',
      'Professional editing',
      '20 high-res photos'
    ]
  },
  {
    id: 'family-extended',
    category: 'Family',
    name: "Extended Family Session",
    description: "Perfect for large family gatherings and reunions",
    features: [
      '3 hours of coverage',
      'Multiple group combinations',
      'Individual family shots',
      'Online gallery sharing',
      'Premium editing',
      '30 high-res photos'
    ]
  },
  // Portrait Packages
  {
    id: 'portrait-professional',
    category: 'Portraits',
    name: "Professional Headshots",
    description: "Perfect for business profiles and professional use",
    features: [
      'Studio session',
      'Multiple backgrounds',
      'Professional retouching',
      'Quick turnaround',
      'Digital delivery',
      '5 final edited images'
    ]
  },
  {
    id: 'portrait-creative',
    category: 'Portraits',
    name: "Creative Portrait",
    description: "Artistic portraits that capture your personality",
    features: [
      'Indoor/outdoor locations',
      'Creative lighting setups',
      'Outfit changes',
      'Artistic editing',
      'Online gallery',
      '15 edited photos'
    ]
  },
  // Commercial Packages
  {
    id: 'commercial-product',
    category: 'Commercial',
    name: "Product Photography",
    description: "Professional product photography for your business",
    features: [
      'Studio setup',
      'Multiple angles',
      'White background',
      'Basic retouching',
      'Commercial usage rights',
      'Quick turnaround'
    ]
  },
  {
    id: 'commercial-corporate',
    category: 'Commercial',
    name: "Corporate Package",
    description: "Complete corporate photography solution",
    features: [
      'Event coverage',
      'Team headshots',
      'Office environment shots',
      'Same-day previews',
      'Commercial license',
      'Rush delivery available'
    ]
  }
];

const expertiseItems = [
  {
    title: "Wedding",
    description: "Capturing your special moments",
    link: "/wedding",
    icon: <Heart className="w-6 h-6" />
  },
  {
    title: "Fashion",
    description: "Editorial & high-fashion shoots",
    link: "/fashion",
    icon: <Sparkles className="w-6 h-6" />
  },
  {
    title: "Family",
    description: "Natural family moments",
    link: "/family",
    icon: <Users className="w-6 h-6" />
  },
  {
    title: "Portrait",
    description: "Professional portraits",
    link: "/portraits",
    icon: <Camera className="w-6 h-6" />
  },
  {
    title: "Commercial",
    description: "Business photography",
    link: "/commercial",
    icon: <Briefcase className="w-6 h-6" />
  }
];

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const categories = ['Wedding', 'Fashion', 'Family', 'Portraits', 'Commercial'];
  
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeCategory, setActiveCategory] = useState('Wedding');
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Preload hero image
  useEffect(() => {
    const img = new Image();
    img.src = "https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg?auto=compress&cs=tinysrgb&w=1920";
    img.onload = () => setIsImageLoaded(true);
  }, []);

  // Update active category when location state changes
  useEffect(() => {
    if (location.state?.activeCategory) {
      const category = categories.find(
        cat => cat.toLowerCase() === location.state.activeCategory.toLowerCase()
      );
      if (category) {
        setActiveCategory(category);
      }
    }
  }, [location.state]);

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

  const filteredPackages = packages.filter(pkg => pkg.category === activeCategory);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePackageClick = (packageId: string, category: string) => {
    // Scroll to top before navigation
    window.scrollTo({ top: 0, behavior: 'instant' });
    navigate(`/packages/${packageId}`, {
      state: { fromCategory: category }
    });
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
              fetchpriority="high"
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
        <section id="photography-packages" className="relative py-16 md:py-32 px-4 md:px-6 bg-brand-beige/20">
          <div className="relative max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10 md:mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-serif text-brand-dark mb-3 md:mb-5">Photography Packages</h2>
              <p className="text-brand-muted text-base md:text-lg max-w-2xl mx-auto mb-8 md:mb-12">
                Choose the perfect package for your special moments
              </p>
              
              {/* Category Tabs */}
              <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    id={`${category.toLowerCase()}-tab`}
                    onClick={() => setActiveCategory(category)}
                    className={`relative px-4 md:px-6 py-2 md:py-3 rounded-full transition-all duration-300 text-xs md:text-sm tracking-wide group hover:transform hover:-translate-y-0.5 ${
                      activeCategory === category
                        ? 'text-white shadow-lg shadow-brand-primary/20'
                        : 'text-brand-dark hover:text-brand-primary'
                    }`}
                  >
                    <span className={`absolute inset-0 rounded-full transition-all duration-300 ${
                      activeCategory === category
                        ? 'bg-gradient-to-r from-brand-primary to-brand-primary/90 opacity-100'
                        : 'bg-white hover:bg-brand-primary/5 opacity-90 shadow-sm group-hover:shadow-md group-hover:scale-105'
                    }`}></span>
                    <span className="relative inline-flex items-center">
                      {category}
                      {!activeCategory === category && (
                        <motion.span
                          initial={{ width: 0 }}
                          animate={{ width: "auto" }}
                          className="ml-1 overflow-hidden"
                        >
                          →
                        </motion.span>
                      )}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Package Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              {filteredPackages.slice(0, 3).map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      duration: 0.5,
                      ease: "easeOut",
                      delay: index * 0.2
                    }
                  }}
                  viewport={{ 
                    once: true,
                    margin: "-100px"
                  }}
                  whileHover={{ 
                    y: -8,
                    transition: {
                      duration: 0.2,
                      ease: "easeOut"
                    }
                  }}
                  className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm bg-white/90"
                >
                  <div className="p-6 md:p-10 flex flex-col items-center text-center">
                    {/* Package Title */}
                    <h3 className="text-xl md:text-3xl font-serif text-brand-dark mb-3 md:mb-4">{pkg.name}</h3>
                    
                    {/* Description */}
                    <p className="text-sm md:text-base text-brand-muted mb-6 md:mb-10 line-clamp-2">{pkg.description}</p>

                    {/* Features List */}
                    <div className="space-y-3 md:space-y-4 mb-6 md:mb-10 w-full">
                      {pkg.features.slice(0, 4).map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + idx * 0.05 }}
                          className="flex items-start group justify-center"
                        >
                          <div className="flex items-center space-x-2 md:space-x-3">
                            <Check className="h-4 w-4 md:h-5 md:w-5 text-brand-primary group-hover:text-brand-dark transition-colors duration-200" />
                            <span className="text-sm md:text-base text-gray-600 group-hover:text-brand-dark transition-colors duration-200">
                              {feature}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Learn More Button */}
                    <Link
                      to={`/packages/${pkg.id}`}
                      onClick={() => window.scrollTo(0, 0)}
                      className="inline-block border-2 border-brand-dark text-brand-dark px-6 md:px-8 py-2 md:py-3 rounded-full hover:bg-brand-dark hover:text-brand-beige transition-colors duration-300 text-sm md:text-base font-medium"
                    >
                      More Details
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Suspense>

      <Suspense fallback={<div className="w-full h-64 bg-brand-beige/50 animate-pulse" />}>
        {/* Featured Work Section */}
        <section className="py-12 md:py-16 bg-[#F8F5F3]">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-serif text-brand-dark mb-3">Featured Work</h2>
              <p className="text-brand-muted text-base md:text-lg">
                Explore a curated collection of my best photography work. Each image tells a unique story and captures precious moments in time.
              </p>
            </div>

            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-3 gap-8 mb-8">
                {featuredWork.slice(0, 6).map((image, index) => (
                  <motion.div
                    key={image.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative aspect-square group cursor-pointer rounded-xl overflow-hidden bg-white shadow-md"
                  >
                    <Link 
                      to={`/gallery?category=${image.category.toLowerCase()}`}
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
                            {image.category}
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
                  <span>View Full Gallery</span>
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