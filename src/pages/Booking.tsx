import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useBookingStore } from '../store/bookingStore';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Phone } from 'lucide-react';

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { packages, addBooking } = useBookingStore();
  const selectedPackageId = location.state?.packageId || packages[0].id;

  const [formData, setFormData] = React.useState({
    clientName: '',
    clientEmail: '',
    packageId: selectedPackageId,
    date: '',
    time: '',
    phone: '',
    location: '',
    occasion: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const booking = {
      id: Date.now().toString(),
      ...formData,
      status: 'pending' as const
    };
    addBooking(booking);
    navigate('/booking-confirmation');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-brand-beige py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-serif text-brand-dark mb-4">Book Your Session</h1>
          <p className="text-brand-muted text-lg max-w-2xl mx-auto">
            Let's create something beautiful together. Fill out the form below and we'll get back to you within 24 hours to discuss your vision.
          </p>
        </motion.div>

        {/* Booking Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white shadow-lg rounded-lg p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Package Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="packageId" className="block text-sm font-medium text-brand-dark mb-2">
                  Photography Package
                </label>
                <select
                  id="packageId"
                  name="packageId"
                  value={formData.packageId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border-brand-muted/20 bg-brand-beige/10 focus:border-brand-dark focus:ring-brand-dark"
                  required
                >
                  {packages.map(pkg => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="occasion" className="block text-sm font-medium text-brand-dark mb-2">
                  Type of Occasion
                </label>
                <input
                  type="text"
                  id="occasion"
                  name="occasion"
                  value={formData.occasion}
                  onChange={handleChange}
                  placeholder="e.g., Wedding, Family Portrait, Corporate Event"
                  className="w-full px-4 py-2 rounded-md border-brand-muted/20 bg-brand-beige/10 focus:border-brand-dark focus:ring-brand-dark"
                />
              </div>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="clientName" className="block text-sm font-medium text-brand-dark mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="clientName"
                  name="clientName"
                  required
                  value={formData.clientName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border-brand-muted/20 bg-brand-beige/10 focus:border-brand-dark focus:ring-brand-dark"
                />
              </div>

              <div>
                <label htmlFor="clientEmail" className="block text-sm font-medium text-brand-dark mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="clientEmail"
                  name="clientEmail"
                  required
                  value={formData.clientEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border-brand-muted/20 bg-brand-beige/10 focus:border-brand-dark focus:ring-brand-dark"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-brand-dark mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-muted h-5 w-5" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-2 rounded-md border-brand-muted/20 bg-brand-beige/10 focus:border-brand-dark focus:ring-brand-dark"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-brand-dark mb-2">
                  Preferred Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-muted h-5 w-5" />
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., Indoor Studio, Outdoor Location"
                    className="w-full pl-12 pr-4 py-2 rounded-md border-brand-muted/20 bg-brand-beige/10 focus:border-brand-dark focus:ring-brand-dark"
                  />
                </div>
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-brand-dark mb-2">
                  Preferred Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-muted h-5 w-5" />
                  <input
                    type="date"
                    id="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-2 rounded-md border-brand-muted/20 bg-brand-beige/10 focus:border-brand-dark focus:ring-brand-dark"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="time" className="block text-sm font-medium text-brand-dark mb-2">
                  Preferred Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-muted h-5 w-5" />
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-2 rounded-md border-brand-muted/20 bg-brand-beige/10 focus:border-brand-dark focus:ring-brand-dark"
                  />
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-brand-dark mb-2">
                Additional Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                value={formData.notes}
                onChange={handleChange}
                placeholder="Tell us more about your vision for the photoshoot..."
                className="w-full px-4 py-2 rounded-md border-brand-muted/20 bg-brand-beige/10 focus:border-brand-dark focus:ring-brand-dark"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="inline-block px-8 py-3 bg-brand-dark text-brand-beige rounded-full font-medium hover:bg-brand-dark/90 transition-colors duration-200"
              >
                Request Booking
              </motion.button>
              <p className="mt-4 text-sm text-brand-muted">
                We'll get back to you within 24 hours to confirm your booking details.
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}