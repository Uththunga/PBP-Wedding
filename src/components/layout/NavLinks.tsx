import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { scrollToTop } from '../../utils/scrollUtils';

interface NavLink {
  path: string;
  label: string;
}

const links: NavLink[] = [
  { path: '/', label: 'Home' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/booking', label: 'Book a Session' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

interface NavLinksProps {
  className?: string;
  linkClassName?: string;
  onClick?: () => void;
}

export default function NavLinks({ className = '', linkClassName = '', onClick }: NavLinksProps) {
  const handleClick = () => {
    scrollToTop();
    if (onClick) onClick();
  };

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
            onClick={handleClick}
            className={`block text-brand-beige font-serif hover:text-brand-muted transition-colors duration-200 ${linkClassName}`}
          >
            {link.label}
          </Link>
        </motion.div>
      ))}
    </div>
  );
}