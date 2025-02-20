import { motion } from 'framer-motion';
import { Check, ArrowRight, Star, Clock, Users, Camera } from 'lucide-react';
import { Package } from '../../types';

interface PackageCardProps {
  package: Package;
  onBook: () => void;
  index: number;
  featured?: boolean;
}

export default function PackageCard({ package: pkg, onBook, index, featured }: PackageCardProps) {
  // Helper function to get the coverage hours from features
  const getCoverageHours = (features: string[]): string => {
    const coverage = features.find(f => f.toLowerCase().includes('coverage'));
    return coverage ? coverage.match(/\(([^)]+)\)/)?.[1] || coverage : 'Flexible';
  };

  // Helper function to get photographer count from features
  const getPhotographerCount = (features: string[]): number => {
    const photographer = features.find(f => f.toLowerCase().includes('photographer'));
    return photographer ? (photographer.toLowerCase().includes('two') ? 2 : 1) : 1;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 h-full group"
    >
      {featured && (
        <div className="absolute top-0 right-0 bg-brand-primary text-white px-3 sm:px-4 py-1 rounded-bl-xl sm:rounded-bl-2xl text-xs sm:text-sm font-medium z-10 flex items-center">
          <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-1.5" fill="currentColor" />
          Most Popular
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-br from-brand-beige/5 to-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative p-4 sm:p-6 lg:p-8 flex flex-col h-full">
        {/* Package Name & Category */}
        <div className="mb-4 sm:mb-6">
          {pkg.category && (
            <span className="inline-block bg-brand-beige/40 text-brand-dark px-2.5 sm:px-3 py-0.5 rounded-full text-xs font-medium mb-2 sm:mb-3">
              {pkg.category}
            </span>
          )}
          <h3 className="text-lg sm:text-xl lg:text-2xl font-serif text-brand-dark group-hover:text-brand-primary transition-colors duration-300">
            {pkg.name}
          </h3>
        </div>

        {/* Quick Info */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-6 text-xs sm:text-sm text-brand-muted">
          <div className="flex items-center">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-1.5" />
            <span>{getCoverageHours(pkg.features)}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-1.5" />
            <span>{getPhotographerCount(pkg.features)} {getPhotographerCount(pkg.features) === 1 ? 'Photographer' : 'Photographers'}</span>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-xs sm:text-sm text-brand-muted mb-4 sm:mb-6">
          {pkg.description}
        </p>

        {/* Features List */}
        <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 flex-grow">
          {pkg.features.slice(0, 5).map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
              className="flex items-start group/feature"
            >
              <div className="relative flex-shrink-0 w-4 sm:w-5 h-4 sm:h-5">
                <div className="absolute inset-0 bg-brand-beige/20 rounded-full transform rotate-45 transition-transform group-hover/feature:rotate-90" />
                <Check className="relative w-4 sm:w-5 h-4 sm:h-5 text-brand-primary" />
              </div>
              <span className="ml-2 sm:ml-3 text-xs sm:text-sm text-gray-600 group-hover/feature:text-brand-dark transition-colors">
                {feature}
              </span>
            </motion.div>
          ))}
          {pkg.features.length > 5 && (
            <p className="text-xs text-brand-muted mt-2 pl-6 sm:pl-8">
              +{pkg.features.length - 5} more features
            </p>
          )}
        </div>

        {/* View Details Button */}
        <motion.button
          onClick={onBook}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-4 sm:px-6
                   bg-brand-beige/50 text-brand-dark rounded-full text-xs sm:text-sm font-medium 
                   hover:bg-brand-primary hover:text-white transition-all duration-300
                   shadow-sm hover:shadow-md"
        >
          <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Explore Package</span>
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
        </motion.button>
      </div>
    </motion.div>
  );
}