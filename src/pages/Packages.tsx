import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useBookingStore } from '../store/bookingStore';

export default function Packages() {
  const { packages } = useBookingStore();
  const location = useLocation();
  const selectedCategory = 'photography'; // Assuming this is the selected category, replace with actual value

  return (
    <div className="min-h-screen bg-brand-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-brand-dark mb-6">
            Photography Services
          </h1>
          <p className="text-lg text-brand-muted max-w-2xl mx-auto">
            Discover our range of professional photography services, each crafted to deliver exceptional quality and memorable experiences.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-brand-light rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-8">
                <h3 className="text-2xl font-serif text-brand-dark mb-4">{pkg.name}</h3>
                <p className="text-brand-muted mb-8">{pkg.description}</p>
                <ul className="space-y-4">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start text-brand-dark">
                      <Check className="w-5 h-5 text-brand-accent mr-3 mt-1 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/packages/${pkg.id}`}
                  state={{ from: location.pathname + location.search, category: selectedCategory }}
                  className="block"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif text-brand-dark mb-6">
            Let's Create Something Beautiful Together
          </h2>
          <p className="text-lg text-brand-muted mb-8 max-w-2xl mx-auto">
            Contact us to discuss your vision and create a customized photography experience tailored to your needs.
          </p>
          <Link
            to="/booking"
            className="inline-block bg-black text-brand-beige px-8 py-3 rounded-full hover:bg-black/90 transition-colors duration-300"
          >
            Book a Session
          </Link>
        </motion.div>
      </div>
    </div>
  );
}