import React from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function PageHeader({ title, subtitle, className = '' }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
        {title}
      </h1>
      {subtitle && (
        <p className="text-xl text-gray-300 font-serif">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}