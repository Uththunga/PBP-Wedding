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
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full"
    >
      <div className="p-4 sm:p-6 lg:p-8 flex flex-col h-full">
        {/* Category Tag */}
        {pkg.category && (
          <div className="mb-3 sm:mb-4">
            <span className="inline-block bg-brand-beige/40 text-brand-dark px-2.5 sm:px-3 py-0.5 rounded-full text-xs font-medium">
              {pkg.category}
            </span>
          </div>
        )}

        {/* Package Title */}
        <h3 className="text-lg sm:text-xl lg:text-2xl font-serif text-brand-dark mb-2 sm:mb-3">{pkg.name}</h3>
        
        {/* Description */}
        <p className="text-xs sm:text-sm text-brand-muted mb-4 sm:mb-6 line-clamp-2">{pkg.description}</p>

        {/* Features List */}
        <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 flex-grow">
          {pkg.features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
              className="flex items-start"
            >
              <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-brand-primary flex-shrink-0 mt-0.5" />
              <span className="ml-2 text-xs sm:text-sm text-gray-600">
                {feature}
              </span>
            </motion.div>
          ))}
        </div>

        {/* View Details Button */}
        <motion.button
          onClick={onBook}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full flex items-center justify-center space-x-2 py-2 sm:py-2.5 px-4 sm:px-5 
                   bg-brand-beige/50 text-brand-dark rounded-full text-xs sm:text-sm font-medium 
                   hover:bg-brand-primary hover:text-white transition-all duration-300"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}