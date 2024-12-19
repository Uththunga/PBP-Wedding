import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Hero from '../components/home/Hero';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Heart, Users, Star, Briefcase, Sparkles, ArrowRight, Check } from 'lucide-react';
import { scrollToTop } from '../utils/scrollUtils';
import { useAuthStore } from '../store/authStore';

const testimonials = [
  {
    name: "Sarah & Michael",
    role: "Wedding Couple",
    content: "Our wedding photos are absolutely stunning. Every precious moment was captured with such artistry and emotion!",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc"
  },
  {
    name: "Elena Martinez",
    role: "Fashion Model",
    content: "Working with this team was incredible. They truly understand how to capture the essence of fashion.",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b"
  },
  {
    name: "The Thompson Family",
    role: "Family Session",
    content: "They made our family shoot so fun and natural. The photos perfectly capture our family's personality!",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300"
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

const galleryImages = [
  {
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
    category: "Wedding"
  },
  {
    url: "https://images.unsplash.com/photo-1469334031218-e382a71b716b",
    category: "Fashion"
  },
  {
    url: "https://images.unsplash.com/photo-1511895426328-dc8714191300",
    category: "Family"
  },
  {
    url: "https://images.unsplash.com/photo-1537633552985-df8429e8048b",
    category: "Portrait"
  },
  {
    url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
    category: "Commercial"
  },
  {
    url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
    category: "Wedding"
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

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeCategory, setActiveCategory] = useState('Wedding');
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const categories = ['Wedding', 'Fashion', 'Family', 'Portraits', 'Commercial'];
  const filteredPackages = packages.filter(pkg => pkg.category === activeCategory);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-brand-beige">
      <Hero />
      
      {/* Services Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif text-brand-dark mb-4">Our Expertise</h2>
            <p className="text-brand-muted max-w-2xl mx-auto">
              Specialized photography services for every moment worth remembering
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-brand-light p-4 rounded-lg hover:bg-white transition-all duration-300 transform hover:-translate-y-1"
              >
                <service.icon className="w-8 h-8 text-brand-dark mb-4" />
                <h3 className="text-lg font-serif text-brand-dark mb-2">{service.title}</h3>
                <p className="text-sm text-brand-muted mb-4 line-clamp-2">{service.description}</p>
                <Link
                  to={service.path}
                  onClick={scrollToTop}
                  className="inline-flex items-center text-sm text-brand-dark hover:text-brand-muted transition-colors"
                >
                  View Gallery
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-6 bg-brand-light">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif text-brand-dark mb-4">Our Process</h2>
            <p className="text-brand-muted max-w-2xl mx-auto">
              From consultation to delivery, we ensure a seamless and professional experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-brand-dark/10 mb-4">{step.number}</div>
                <h3 className="text-xl font-serif text-brand-dark mb-2">{step.title}</h3>
                <p className="text-brand-muted">{step.description}</p>
                {index < processSteps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-4 text-brand-muted transform -translate-y-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif text-brand-dark mb-4">Photography Packages</h2>
            <p className="text-brand-muted max-w-2xl mx-auto mb-8">
              Choose from our carefully curated packages designed to capture your special moments
            </p>
            
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 rounded-full transition-colors ${
                    activeCategory === category
                      ? 'bg-brand-primary text-white'
                      : 'bg-brand-light text-brand-dark hover:bg-brand-primary/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <h3 className="text-2xl font-serif text-brand-dark mb-4">{pkg.name}</h3>
                <p className="text-brand-muted mb-6">{pkg.description}</p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.slice(0, 4).map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="w-5 h-5 text-brand-primary mt-1 mr-3 flex-shrink-0" />
                      <span className="text-brand-dark">{feature}</span>
                    </li>
                  ))}
                  {pkg.features.length > 4 && (
                    <li className="text-brand-muted text-sm">
                      +{pkg.features.length - 4} more features
                    </li>
                  )}
                </ul>
                <div className="flex justify-between items-center">
                  <Link
                    to={`/package/${pkg.id}`}
                    state={{ packageId: pkg.id }}
                    className="text-brand-primary hover:text-brand-primary/80 font-medium"
                  >
                    View Details
                  </Link>
                  {isAuthenticated ? (
                    <button
                      onClick={() => navigate('/booking', { state: { packageId: pkg.id } })}
                      className="bg-brand-primary text-white py-2 px-6 rounded-lg hover:bg-brand-primary/90 transition-colors"
                    >
                      Book Now
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate('/login', { state: { from: location } })}
                      className="bg-brand-primary text-white py-2 px-6 rounded-lg hover:bg-brand-primary/90 transition-colors"
                    >
                      Login to Book
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif text-brand-dark mb-4">Featured Work</h2>
            <p className="text-brand-muted max-w-2xl mx-auto">
              A curated selection from our diverse portfolio
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative aspect-square overflow-hidden rounded-lg"
              >
                <img
                  src={image.url}
                  alt={`${image.category} Photography`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-serif text-xl">{image.category}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/gallery"
              onClick={handleScrollToTop}
              className="inline-flex items-center text-brand-dark hover:text-brand-muted transition-colors"
            >
              View Full Gallery
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-brand-light">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-serif text-brand-dark mb-3">Client Stories</h2>
            <p className="text-brand-muted max-w-xl mx-auto text-sm">
              Hear what our clients say about their experience with us
            </p>
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto"
              >
                <div className="aspect-square rounded-lg overflow-hidden h-[300px] md:h-[350px]">
                  <img
                    src={testimonials[activeTestimonial].image}
                    alt={testimonials[activeTestimonial].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <p className="text-lg text-brand-dark italic">"{testimonials[activeTestimonial].content}"</p>
                  <div>
                    <div className="text-brand-dark font-medium">{testimonials[activeTestimonial].name}</div>
                    <div className="text-brand-muted text-sm">{testimonials[activeTestimonial].role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === activeTestimonial ? 'bg-brand-dark' : 'bg-brand-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-serif text-brand-dark">Ready to Create Something Beautiful?</h2>
            <p className="text-brand-muted max-w-2xl mx-auto">
              Let's work together to capture your special moments
            </p>
            <Link
              to="/booking"
              onClick={handleScrollToTop}
              className="inline-block px-8 py-3 bg-transparent border-2 border-brand-dark text-brand-dark rounded-full font-medium hover:bg-brand-dark hover:text-white transition-all duration-300"
            >
              Book a Session
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}