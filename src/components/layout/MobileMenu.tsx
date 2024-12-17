import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavLinks from './NavLinks';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-brand-beige z-40"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center justify-center min-h-screen px-6 py-24"
          >
            <NavLinks
              className="space-y-8 text-center"
              onClick={onClose}
              linkClassName="text-3xl md:text-4xl text-brand-dark hover:text-brand-muted transition-colors duration-200"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}