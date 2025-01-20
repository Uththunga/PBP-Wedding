import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Package } from '../../types';

interface PackageCardProps {
  package: Package;
  onBook: () => void;
  index: number;
}

export default function PackageCard({ package: pkg, onBook, index }: PackageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="p-8">
        {/* Category Tag */}
        {pkg.category && (
          <div className="mb-6">
            <span className="inline-block bg-brand-beige text-brand-dark px-4 py-1 rounded-full text-sm font-medium">
              {pkg.category}
            </span>
          </div>
        )}

        {/* Package Title */}
        <h3 className="text-2xl font-serif text-brand-dark mb-3">{pkg.name}</h3>
        
        {/* Description */}
        <p className="text-brand-muted mb-8 line-clamp-2">{pkg.description}</p>

        {/* Features List */}
        <div className="space-y-4 mb-8">
          {pkg.features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
              className="flex items-start group"
            >
              <div className="flex-shrink-0 p-1">
                <Check className="h-5 w-5 text-brand-primary group-hover:text-brand-dark transition-colors duration-200" />
              </div>
              <span className="ml-3 text-gray-600 group-hover:text-brand-dark transition-colors duration-200">
                {feature}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Book Now Button */}
        <motion.button
          onClick={onBook}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center space-x-2 py-3 px-6 bg-brand-beige text-brand-dark rounded-full font-medium 
                   hover:bg-brand-primary hover:text-white transition-all duration-300 group"
        >
          <span>Book Now</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
        </motion.button>
      </div>
    </motion.div>
  );
}