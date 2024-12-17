import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface NavLink {
  path: string;
  label: string;
}

const links: NavLink[] = [
  { path: '/', label: 'Home' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/packages', label: 'Services' },
  { path: '/booking', label: 'Book' },
];

interface NavLinksProps {
  className?: string;
  linkClassName?: string;
  onClick?: () => void;
}

export default function NavLinks({ className = '', linkClassName = '', onClick }: NavLinksProps) {
  return (
    <div className={className}>
      {links.map((link, index) => (
        <motion.div
          key={link.path}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link
            to={link.path}
            onClick={onClick}
            className={`block text-brand-beige font-serif hover:text-brand-muted transition-colors duration-200 ${linkClassName}`}
          >
            {link.label}
          </Link>
        </motion.div>
      ))}
    </div>
  );
}