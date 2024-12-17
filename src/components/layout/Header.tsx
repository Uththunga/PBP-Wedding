import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import Navbar from './Navbar';

export default function Header() {
  const { visible } = useScrollDirection();

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <Navbar />
    </motion.header>
  );
}