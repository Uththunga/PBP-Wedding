import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams, useLocation, Link } from 'react-router-dom';
import { ArrowLeft, Check, Plus, Lock, Minus, Camera } from 'lucide-react';
import { useBookingStore } from '../store/bookingStore';
import { useAuthStore } from '../store/authStore';
import LoginModal from '../components/auth/LoginModal';
import SignUpModal from '../components/auth/SignUpModal';

export default function PackageDetails() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { packages } = useBookingStore();
  const { isAuthenticated } = useAuthStore();
  const packageId = params.packageId || packages[0]?.id;
  const selectedPackage = packages.find(pkg => pkg.id === packageId) || packages[0];
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const basePrices = {
    'wedding-luxury': 4500,
    'wedding-premium': 3500,
    'wedding-classic': 2800,
    'wedding-essential': 2000,
    'wedding-intimate': 1500,
    'wedding-micro': 1000
  };

  const additionalServices = {
    'wedding-luxury': [
      { id: 'second-engagement', name: 'Second Engagement Session', price: 400, description: 'Additional engagement session at a different location.' },
      { id: 'extra-album', name: 'Extra Premium Album', price: 500, description: 'Additional 40-page premium leather-bound album.' },
      { id: 'video-highlight', name: 'Video Highlight Reel', price: 800, description: '5-minute cinematic highlight video of your special day.' },
      { id: 'prints-collection', name: 'Luxury Print Collection', price: 300, description: 'Set of 20 premium prints in presentation box.' }
    ],
    'wedding-premium': [
      { id: 'engagement', name: 'Extended Engagement Session', price: 300, description: '2-hour engagement session with multiple locations.' },
      { id: 'album', name: 'Premium Photo Album', price: 400, description: 'Additional 30-page premium album.' },
      { id: 'drone', name: 'Extended Drone Coverage', price: 300, description: 'Additional drone coverage time and locations.' },
      { id: 'prints', name: 'Premium Prints Package', price: 250, description: 'Set of 15 premium prints.' }
    ],
    'wedding-classic': [
      { id: 'engagement', name: 'Engagement Session', price: 250, description: '1.5-hour engagement session.' },
      { id: 'album', name: 'Extra Photo Album', price: 300, description: 'Additional 25-page hardcover album.' },
      { id: 'drone', name: 'Drone Coverage', price: 250, description: 'Aerial photography coverage.' },
      { id: 'prints', name: 'Classic Print Package', price: 200, description: 'Set of 12 premium prints.' }
    ],
    'wedding-essential': [
      { id: 'engagement', name: 'Mini Engagement Session', price: 200, description: '1-hour engagement session.' },
      { id: 'album', name: 'Photo Album', price: 250, description: 'Additional 20-page photo album.' },
      { id: 'extra-hours', name: 'Extra Coverage Hours', price: 200, description: '2 additional hours of photography coverage.' },
      { id: 'prints', name: 'Essential Print Package', price: 150, description: 'Set of 10 prints.' }
    ],
    'wedding-intimate': [
      { id: 'engagement', name: 'Mini Engagement Session', price: 150, description: '45-minute engagement session.' },
      { id: 'album', name: 'Basic Photo Album', price: 200, description: 'Additional 15-page photo album.' },
      { id: 'extra-hour', name: 'Extra Coverage Hour', price: 150, description: '1 additional hour of photography coverage.' },
      { id: 'prints', name: 'Print Package', price: 100, description: 'Set of 8 prints.' }
    ],
    'wedding-micro': [
      { id: 'mini-engagement', name: 'Mini Engagement Session', price: 100, description: '30-minute engagement session.' },
      { id: 'album', name: 'Simple Photo Album', price: 150, description: '12-page photo album.' },
      { id: 'extra-hour', name: 'Extra Coverage Hour', price: 150, description: '1 additional hour of photography coverage.' },
      { id: 'prints', name: 'Basic Print Package', price: 75, description: 'Set of 5 prints.' }
    ]
  };

  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const services = additionalServices[packageId as keyof typeof additionalServices] || [];

  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev => {
      if (prev.includes(addonId)) {
        return prev.filter(id => id !== addonId);
      } else {
        return [...prev, addonId];
      }
    });
  };

  const calculateTotalPrice = () => {
    const basePrice = basePrices[packageId as keyof typeof basePrices];
    const addonsPrice = selectedAddons.reduce((total, addonId) => {
      const service = services.find(s => s.id === addonId);
      return total + (service?.price || 0);
    }, 0);
    return basePrice + addonsPrice;
  };

  const handleBack = () => {
    navigate('/', { 
      state: { 
        scrollToSection: 'photography-packages',
        activeCategory: location.state?.fromCategory || selectedPackage?.category || 'Wedding'
      }
    });
  };

  if (!selectedPackage) {
    return (
      <div className="min-h-screen bg-brand-beige flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-brand-dark mb-4">Package not found</h1>
          <button
            onClick={() => navigate('/')}
            className="text-brand-primary hover:text-brand-primary/80 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  // Get the category from the package ID if category is not directly available
  const getPackageCategory = (packageId: string) => {
    if (packageId.includes('wedding')) return 'Wedding';
    return 'Photography';
  };

  const packageCategory = selectedPackage.category || getPackageCategory(packageId);

  return (
    <div className="min-h-screen bg-brand-beige">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20 z-10" />
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          src={`/images/${packageCategory.toLowerCase()}-bg.jpg`}
          alt={selectedPackage.name}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/photography-bg.jpg';
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl font-serif mb-4">{selectedPackage.name}</h1>
            <p className="text-lg md:text-xl text-brand-beige/90">{packageCategory} Photography</p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 text-brand-dark hover:text-brand-primary transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Packages</span>
          </button>
        </div>

        {/* Package Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Package Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="mb-6">
                <span className="inline-block bg-brand-beige text-brand-dark px-4 py-1 rounded-full text-sm font-medium mb-4">
                  {packageCategory}
                </span>
                <h2 className="text-2xl font-serif text-brand-dark mb-3">{selectedPackage.name}</h2>
                <p className="text-brand-muted">{selectedPackage.description}</p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-serif text-brand-dark">What's Included:</h3>
                <ul className="space-y-3">
                  {selectedPackage.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <Check className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" />
                      <span className="text-brand-muted">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Additional Services */}
            {services.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-serif text-brand-dark mb-6">Additional Services</h3>
                <div className="space-y-4">
                  {services.map((service, index) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-xl bg-brand-beige/30 hover:bg-brand-beige/50 transition-colors cursor-pointer"
                      onClick={() => toggleAddon(service.id)}
                    >
                      <div className="flex items-center space-x-4">
                        {selectedAddons.includes(service.id) ? (
                          <Minus className="w-5 h-5 text-brand-primary" />
                        ) : (
                          <Plus className="w-5 h-5 text-brand-dark" />
                        )}
                        <div>
                          <h4 className="font-medium text-brand-dark">{service.name}</h4>
                          <p className="text-sm text-brand-muted">{service.description}</p>
                        </div>
                      </div>
                      {isAuthenticated ? (
                        <span className="text-lg font-serif text-brand-primary">${service.price}</span>
                      ) : (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsLoginModalOpen(true);
                          }}
                          className="flex items-center space-x-2 text-brand-primary hover:text-brand-primary/80 transition-colors"
                        >
                          <Lock className="w-4 h-4" />
                          <span className="text-sm">Login to view price</span>
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-8 shadow-lg sticky top-8">
              {!isAuthenticated && (
                <div className="mb-6 p-4 bg-brand-beige/30 rounded-xl">
                  <p className="text-brand-dark text-sm mb-2">
                    Create a free account to view our pricing and make bookings. It only takes a minute!
                  </p>
                  <button
                    onClick={() => setIsSignUpModalOpen(true)}
                    className="text-brand-primary hover:text-brand-primary/80 text-sm font-medium transition-colors"
                  >
                    Sign up now →
                  </button>
                </div>
              )}

              <h3 className="text-xl font-serif text-brand-dark mb-6">Booking Summary</h3>
              
              {/* Base Price */}
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-brand-beige">
                <span className="text-brand-muted">Base Package</span>
                {isAuthenticated ? (
                  <span className="text-lg font-serif text-brand-dark">
                    ${basePrices[packageId as keyof typeof basePrices]}
                  </span>
                ) : (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsLoginModalOpen(true);
                    }}
                    className="flex items-center space-x-2 text-brand-primary hover:text-brand-primary/80 transition-colors"
                  >
                    <Lock className="w-4 h-4" />
                    <span className="text-sm">Login to view price</span>
                  </button>
                )}
              </div>

              {/* Selected Add-ons */}
              {selectedAddons.length > 0 && isAuthenticated && (
                <div className="space-y-3 mb-4 pb-4 border-b border-brand-beige">
                  <span className="text-brand-muted">Additional Services:</span>
                  {selectedAddons.map(addonId => {
                    const service = services.find(s => s.id === addonId);
                    return service ? (
                      <div key={addonId} className="flex justify-between items-center">
                        <span className="text-sm text-brand-dark">{service.name}</span>
                        {isAuthenticated ? (
                          <span className="text-brand-dark">${service.price}</span>
                        ) : (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsLoginModalOpen(true);
                            }}
                            className="flex items-center space-x-2 text-brand-primary hover:text-brand-primary/80 transition-colors"
                          >
                            <Lock className="w-4 h-4" />
                            <span className="text-sm">Login to view price</span>
                          </button>
                        )}
                      </div>
                    ) : null;
                  })}
                </div>
              )}

              {/* Total Price */}
              <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-medium text-brand-dark">Total</span>
                {isAuthenticated ? (
                  <span className="text-2xl font-serif text-brand-primary">
                    ${calculateTotalPrice()}
                  </span>
                ) : (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsLoginModalOpen(true);
                    }}
                    className="flex items-center space-x-2 text-brand-primary hover:text-brand-primary/80 transition-colors"
                  >
                    <Lock className="w-4 h-4" />
                    <span className="text-sm">Login to view price</span>
                  </button>
                )}
              </div>

              {/* Book Now Button */}
              {isAuthenticated ? (
                <Link
                  to="/booking"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  state={{ 
                    packageId: selectedPackage.id,
                    category: packageCategory,
                    addons: selectedAddons
                  }}
                  className="w-full bg-brand-primary text-white py-3 px-6 rounded-full hover:bg-brand-primary/90 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Book Now</span>
                  <Camera className="w-5 h-5" />
                </Link>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLoginModalOpen(true);
                  }}
                  className="w-full bg-brand-primary text-white py-3 px-6 rounded-full hover:bg-brand-primary/90 transition-colors flex items-center justify-center space-x-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Login to Book</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Booking CTA Section */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-brand-beige mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-brand-dark mb-4">
              Ready to Book Your {packageCategory} Session?
            </h2>
            <p className="text-brand-muted mb-8">
              {packageCategory === 'Wedding' && "Let's capture the magic of your special day together"}
            </p>
            <Link
              to="/booking"
              className="inline-block border-2 border-brand-dark text-brand-dark px-8 py-3 rounded-full hover:bg-brand-dark hover:text-brand-beige transition-colors duration-300 font-medium"
            >
              Book Your Session Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Modals */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onSwitchToSignUp={() => {
          setIsLoginModalOpen(false);
          setIsSignUpModalOpen(true);
        }}
      />
      <SignUpModal 
        isOpen={isSignUpModalOpen} 
        onClose={() => setIsSignUpModalOpen(false)}
        onSwitchToLogin={() => {
          setIsSignUpModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />
    </div>
  );
}
