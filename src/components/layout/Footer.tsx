import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  ];

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Packages', href: '/packages' },
    { name: 'Book Now', href: '/booking' },
  ];

  const services = [
    'Wedding Photography',
    'Portrait Sessions',
    'Event Coverage',
    'Corporate Photography',
    'Family Sessions',
  ];

  return (
    <footer className="bg-brand-dark text-brand-beige">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif text-brand-beige">Prauda Photography</h3>
            <p className="text-sm text-brand-muted">
              Capturing life's precious moments with artistic excellence and professional dedication.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-muted hover:text-brand-beige transition-colors"
                  aria-label={label}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-brand-beige mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-brand-muted hover:text-brand-beige transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-brand-beige mb-4">Our Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service} className="text-brand-muted">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-brand-beige mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-brand-muted" />
                <a href="mailto:contact@prauda.com" className="text-brand-muted hover:text-brand-beige transition-colors">
                  contact@prauda.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-brand-muted" />
                <a href="tel:+1234567890" className="text-brand-muted hover:text-brand-beige transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-brand-muted mt-1" />
                <span className="text-brand-muted">
                  123 Photography Street,<br />
                  Creative District, 12345
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-brand-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-brand-muted">
            &copy; {currentYear} Prauda Photography. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
