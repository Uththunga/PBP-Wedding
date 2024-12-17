import React from 'react';
import { Link } from 'react-router-dom';
import { branding } from '../../config/branding';
import logoImage from '../icons/logo.png';

interface LogoProps {
  variant?: 'full' | 'minimal';
  className?: string;
}

export default function Logo({ variant = 'full', className = '' }: LogoProps) {
  return (
    <Link 
      to="/" 
      className={`flex items-center ${className}`}
    >
      <img 
        src={logoImage} 
        alt={branding.name}
        className="h-8 w-auto object-contain" 
      />
      {variant === 'full' && (
        <span className="ml-3 font-serif text-lg tracking-wide font-medium text-brand-dark">
          {variant === 'full' ? branding.name : branding.shortName}
        </span>
      )}
    </Link>
  );
}