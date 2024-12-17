import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
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
      className="bg-white rounded-2xl overflow-hidden shadow-xl"
    >
      <div className="p-8">
        <h3 className="text-2xl font-serif text-gray-900 mb-2">{pkg.name}</h3>
        <p className="text-gray-600 mb-6">{pkg.description}</p>
        
        <div className="mb-8">
          <span className="text-4xl font-bold text-gray-900">${pkg.price}</span>
        </div>

        <ul className="space-y-4 mb-8">
          {pkg.features.map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <Check className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
              <span className="ml-3 text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={onBook}
          className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-sm font-medium"
        >
          Book Now
        </button>
      </div>
    </motion.div>
  );
}