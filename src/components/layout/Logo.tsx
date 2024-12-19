import React from 'react';
import { Link } from 'react-router-dom';
import { branding } from '../../config/branding';
import logoImage from '../icons/logo.png';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export default function Logo({ variant = 'light', className = '' }: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src={logoImage} 
        alt={branding.name}
        className={`h-8 w-auto object-contain transition-colors ${
          variant === 'dark' ? 'filter brightness-0' : 'filter brightness-0 invert'
        }`}
      />
    </div>
  );
}