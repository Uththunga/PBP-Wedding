import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavLinks from './NavLinks';
import { Instagram, Facebook, UserCircle2 } from 'lucide-react';
import { branding } from '../../config/branding';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

export default function MobileMenu({ isOpen, onClose, onLoginClick }: MobileMenuProps) {
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
              linkClassName="text-3xl font-serif text-brand-dark hover:text-brand-muted transition-colors duration-200"
            />
            <div className="mt-12 flex items-center space-x-8">
              <motion.a
                href={branding.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-brand-dark hover:text-brand-muted transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </motion.a>
              <motion.a
                href={branding.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-brand-dark hover:text-brand-muted transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  onClose();
                  onLoginClick();
                }}
                className="text-brand-dark hover:text-brand-muted transition-colors"
              >
                <UserCircle2 className="w-6 h-6" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}