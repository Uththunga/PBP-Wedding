import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Menu } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Camera className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Lens Master</span>
            </Link>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link to="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900">
              Home
            </Link>
            <Link to="/gallery" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
              Gallery
            </Link>
            <Link to="/packages" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
              Packages
            </Link>
            <Link to="/booking" className="relative overflow-hidden px-4 py-2 rounded-full font-medium text-brand-primary border-2 border-brand-primary hover:text-white group">
              <span className="relative z-10">Book a Session</span>
              <div className="absolute inset-0 bg-brand-primary transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0" />
            </Link>
            <Link to="/admin" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
              Admin
            </Link>
          </div>

          <div className="sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-3 py-2 text-base font-medium text-gray-900">
              Home
            </Link>
            <Link to="/gallery" className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900">
              Gallery
            </Link>
            <Link to="/packages" className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900">
              Packages
            </Link>
            <Link to="/booking" className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900">
              Book Now
            </Link>
            <Link to="/admin" className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900">
              Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}