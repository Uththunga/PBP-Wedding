import React from 'react';
import { motion } from 'framer-motion';
import { branding } from '../../config/branding';

export default function Hero() {
  const [firstName, ...rest] = branding.name.split(' ');
  const lastName = rest.join(' ');

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-dark/30" />
      </div>
      
      <div className="relative h-full flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center px-4"
        >
          <h1 className="text-4xl md:text-6xl font-serif text-brand-beige mb-6">
            {firstName}
            <br className="md:hidden" />
            <span className="inline-block mt-2 md:mt-0 md:ml-3">{lastName}</span>
          </h1>
          <p className="text-brand-light text-lg md:text-xl font-serif mb-8 max-w-2xl mx-auto leading-relaxed">
            {branding.tagline}
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <a 
              href="/gallery" 
              className="text-brand-beige text-sm uppercase tracking-widest hover:text-brand-light transition-colors"
            >
              Explore Gallery →
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}