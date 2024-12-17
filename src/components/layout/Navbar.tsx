import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, UserCircle2, Instagram, Facebook } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { branding } from '../../config/branding';
import Logo from './Logo';
import NavLinks from './NavLinks';
import MobileMenu from './MobileMenu';
import LoginModal from '../auth/LoginModal';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`text-2xl transition-colors z-50 ${
                isScrolled ? 'text-brand-dark hover:text-brand-primary' : 'text-white hover:text-brand-beige'
              }`}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <Link to="/">
                <Logo variant={isScrolled ? 'dark' : 'light'} />
              </Link>
            </motion.div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-6">
              <motion.a
                href={branding.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`transition-colors ${
                  isScrolled ? 'text-brand-dark hover:text-brand-primary' : 'text-white hover:text-brand-beige'
                }`}
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href={branding.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`transition-colors ${
                  isScrolled ? 'text-brand-dark hover:text-brand-primary' : 'text-white hover:text-brand-beige'
                }`}
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsLoginModalOpen(true)}
                className={`transition-colors ${
                  isScrolled ? 'text-brand-dark hover:text-brand-primary' : 'text-white hover:text-brand-beige'
                }`}
              >
                <UserCircle2 className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 bg-brand-dark"
          >
            <div className="flex flex-col h-full pt-24 px-6">
              <NavLinks
                className="flex flex-col space-y-6 text-center"
                linkClassName="text-brand-beige hover:text-brand-primary text-2xl font-serif transition-colors"
                onClick={() => setIsMenuOpen(false)}
              />
              <div className="mt-auto pb-8">
                <div className="flex justify-center space-x-8 mb-6">
                  <motion.a
                    href={branding.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-brand-beige hover:text-brand-primary transition-colors"
                  >
                    <Instagram className="w-6 h-6" />
                  </motion.a>
                  <motion.a
                    href={branding.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-brand-beige hover:text-brand-primary transition-colors"
                  >
                    <Facebook className="w-6 h-6" />
                  </motion.a>
                </div>
                <p className="text-brand-beige/60 text-center text-sm">
                  {new Date().getFullYear()} {branding.name}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}