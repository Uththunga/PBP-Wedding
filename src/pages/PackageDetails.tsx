import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Lock } from 'lucide-react';
import { useBookingStore } from '../store/bookingStore';
import { useAuthStore } from '../store/authStore';
import LoginModal from '../components/auth/LoginModal';

export default function PackageDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { packages } = useBookingStore();
  const { isAuthenticated } = useAuthStore();
  const packageId = location.state?.packageId || packages[0]?.id;
  const selectedPackage = packages.find(pkg => pkg.id === packageId) || packages[0];

  const additionalServices = {
    // Wedding Services
    'wedding-premium': [
      { id: 'engagement', name: 'Engagement Session', price: 250 },
      { id: 'album', name: 'Premium Photo Album', price: 300 },
      { id: 'drone', name: 'Drone Coverage', price: 200 },
      { id: 'prints', name: 'Premium Prints Package', price: 150 },
    ],
    'wedding-essential': [
      { id: 'engagement', name: 'Engagement Session', price: 200 },
      { id: 'album', name: 'Standard Photo Album', price: 200 },
      { id: 'prints', name: 'Basic Prints Package', price: 100 },
    ],
    // Fashion Services
    'fashion-editorial': [
      { id: 'styling', name: 'Professional Styling', price: 300 },
      { id: 'makeup', name: 'Hair and Makeup', price: 200 },
      { id: 'location', name: 'Premium Location Fee', price: 250 },
    ],
    'fashion-portfolio': [
      { id: 'makeup', name: 'Hair and Makeup', price: 150 },
      { id: 'retouching', name: 'Advanced Retouching', price: 100 },
      { id: 'digital', name: 'Additional Digital Images', price: 150 },
    ],
    // Family Services
    'family-standard': [
      { id: 'location', name: 'Premium Location', price: 100 },
      { id: 'prints', name: 'Family Print Package', price: 150 },
      { id: 'digital', name: 'Additional Digital Images', price: 100 },
    ],
    'family-extended': [
      { id: 'prints', name: 'Extended Print Package', price: 200 },
      { id: 'video', name: 'Behind-the-Scenes Video', price: 150 },
      { id: 'rush', name: 'Rush Delivery', price: 100 },
    ],
    // Portrait Services
    'portrait-professional': [
      { id: 'makeup', name: 'Professional Makeup', price: 100 },
      { id: 'retouching', name: 'Premium Retouching', price: 75 },
      { id: 'digital', name: 'Additional Digital Images', price: 50 },
    ],
    'portrait-creative': [
      { id: 'location', name: 'Unique Location Fee', price: 150 },
      { id: 'props', name: 'Custom Props', price: 100 },
      { id: 'prints', name: 'Art Prints Package', price: 200 },
    ],
    // Commercial Services
    'commercial-product': [
      { id: 'setup', name: 'Advanced Lighting Setup', price: 200 },
      { id: 'rush', name: 'Same-Day Delivery', price: 300 },
      { id: 'rights', name: 'Extended Usage Rights', price: 250 },
    ],
    'commercial-corporate': [
      { id: 'video', name: 'Event Highlight Video', price: 500 },
      { id: 'prints', name: 'Corporate Print Package', price: 300 },
      { id: 'rush', name: 'Rush Processing', price: 200 },
    ]
  };

  const basePrices = {
    'wedding-premium': 2500,
    'wedding-essential': 1500,
    'fashion-editorial': 1200,
    'fashion-portfolio': 800,
    'family-standard': 400,
    'family-extended': 600,
    'portrait-professional': 300,
    'portrait-creative': 500,
    'commercial-product': 1000,
    'commercial-corporate': 1500
  };

  const [selectedAddons, setSelectedAddons] = React.useState<string[]>([]);
  const services = additionalServices[packageId as keyof typeof additionalServices] || [];

  const basePrice = basePrices[packageId as keyof typeof basePrices]; // Base price for the package
  const totalPrice = React.useMemo(() => {
    const addonsTotal = selectedAddons.reduce((total, addonId) => {
      const addon = services.find(s => s.id === addonId);
      return total + (addon?.price || 0);
    }, 0);
    return basePrice + addonsTotal;
  }, [selectedAddons, services]);

  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white"
    >
      {/* Header */}
      <div className="bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button
            onClick={() => navigate('/packages')}
            className="flex items-center text-brand-dark hover:text-brand-primary mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Packages
          </button>
          <h1 className="text-4xl font-serif text-brand-dark mb-4">{selectedPackage?.name}</h1>
          <p className="text-brand-muted max-w-2xl">{selectedPackage?.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Package Features */}
            <section>
              <h2 className="text-2xl font-serif text-brand-dark mb-6">Package Features</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedPackage?.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-brand-primary mt-1 mr-3 flex-shrink-0" />
                    <span className="text-brand-dark">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Additional Services */}
            {services.length > 0 && (
              <section>
                <h2 className="text-2xl font-serif text-brand-dark mb-6">Additional Services</h2>
                {!isAuthenticated ? (
                  <div className="bg-brand-light/50 p-6 rounded-lg text-center">
                    <Lock className="w-8 h-8 text-brand-primary mx-auto mb-3" />
                    <p className="text-brand-dark mb-4">Please log in to view and select additional services</p>
                    <button
                      onClick={() => setIsLoginModalOpen(true)}
                      className="px-6 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 transition-colors"
                    >
                      Login to Continue
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedAddons.includes(service.id)
                            ? 'border-brand-primary bg-brand-light'
                            : 'border-gray-200 hover:border-brand-primary'
                        }`}
                        onClick={() => toggleAddon(service.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-brand-dark">{service.name}</h3>
                            <p className="text-brand-muted text-sm mt-1">Additional ${service.price}</p>
                          </div>
                          {selectedAddons.includes(service.id) && (
                            <Check className="w-5 h-5 text-brand-primary" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}
          </div>

          {/* Sticky Price Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-white p-6 border border-gray-200 rounded-lg">
              <h2 className="text-2xl font-serif text-brand-dark mb-4">Package Summary</h2>
              {!isAuthenticated ? (
                <div className="text-center py-4">
                  <Lock className="w-6 h-6 text-brand-primary mx-auto mb-2" />
                  <p className="text-brand-muted mb-4">Login to view pricing</p>
                  <button
                    onClick={() => setIsLoginModalOpen(true)}
                    className="w-full bg-brand-primary text-white py-3 px-6 rounded-lg hover:bg-brand-primary/90 transition-colors"
                  >
                    Login to Continue
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b">
                    <span className="text-brand-dark">Base Package</span>
                    <span className="text-brand-dark font-medium">${basePrice}</span>
                  </div>
                  {selectedAddons.length > 0 && (
                    <div className="space-y-2">
                      {selectedAddons.map(addonId => {
                        const addon = services.find(s => s.id === addonId);
                        return (
                          <div key={addonId} className="flex justify-between items-center text-sm">
                            <span className="text-brand-muted">{addon?.name}</span>
                            <span className="text-brand-muted">${addon?.price}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="text-lg font-medium text-brand-dark">Total</span>
                    <span className="text-xl font-medium text-brand-primary">${totalPrice}</span>
                  </div>
                  <button
                    onClick={() => navigate('/booking', { state: { packageId } })}
                    className="w-full bg-brand-primary text-white py-3 px-6 rounded-lg hover:bg-brand-primary/90 transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </motion.div>
  );
}
