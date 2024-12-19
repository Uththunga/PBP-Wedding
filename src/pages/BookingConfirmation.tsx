import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';

export default function BookingConfirmation() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-brand-beige to-white py-20">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center mb-8"
          >
            <CheckCircle2 className="w-20 h-20 mx-auto text-green-500 mb-6" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-brand-dark mb-6">
              Booking Confirmed!
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Thank you for choosing Prauda Buwaneka Photography. We have received your booking request and will get back to you within 24 hours to confirm your session details.
            </p>
            <p className="text-gray-600 mb-12">
              Please check your email for a confirmation of your booking details.
            </p>
            
            <div className="space-x-4">
              <Link
                to="/gallery"
                className="inline-block px-8 py-3 bg-transparent border-2 border-brand-dark text-brand-dark rounded-full font-medium hover:bg-brand-dark hover:text-white transition-all duration-300"
              >
                View Gallery
              </Link>
              <Link
                to="/"
                className="inline-block px-8 py-3 bg-transparent border-2 border-brand-dark text-brand-dark rounded-full font-medium hover:bg-brand-dark hover:text-white transition-all duration-300"
              >
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
