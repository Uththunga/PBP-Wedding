import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useBookingStore } from '../store/bookingStore';
import { useAuthStore } from '../store/authStore';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Phone, Camera, CheckCircle2, InfoIcon } from 'lucide-react';
import { scrollToTop } from '../utils/scrollUtils';
import PageTransition from '../components/ui/PageTransition';
import emailjs from '@emailjs/browser';
import toast from '../utils/toast';
import { Link } from 'react-router-dom';

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { packages, addBooking } = useBookingStore();
  const { user } = useAuthStore();
  
  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Get package ID from location state or URL params
  const selectedPackageId = location.state?.packageId || new URLSearchParams(location.search).get('package') || packages[0]?.id || 'wedding-premium';
  const selectedPackage = packages.find(pkg => pkg.id === selectedPackageId) || packages[0];

  // Initialize EmailJS once when component mounts
  React.useEffect(() => {
    emailjs.init("NliNJpGj4y_o-00NL");
  }, []);

  const [formData, setFormData] = React.useState({
    clientName: user?.fullName || '',
    clientEmail: user?.email || '',
    packageId: selectedPackageId, // Pre-populate with selected package
    date: '',
    startTime: {
      hour: '',
      minute: ''
    },
    endTime: {
      hour: '',
      minute: ''
    },
    phone: '',
    location: '',
    occasion: selectedPackage?.category || '', // Pre-populate with package category
    notes: ''
  });

  // Update form data when user changes
  React.useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        clientName: user.fullName,
        clientEmail: user.email
      }));
    }
  }, [user]);

  const packagesByCategory = React.useMemo(() => {
    return packages.reduce((acc, pkg) => {
      if (!acc[pkg.category]) {
        acc[pkg.category] = [];
      }
      acc[pkg.category].push(pkg);
      return acc;
    }, {} as Record<string, Package[]>);
  }, [packages]);

  const handleOccasionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newOccasion = e.target.value;
    setFormData(prev => ({
      ...prev,
      occasion: newOccasion,
      packageId: packagesByCategory[newOccasion]?.[0]?.id || '' // Select first package of category by default
    }));
  };

  const hours = Array.from({ length: 24 }, (_, i) => ({
    value: i.toString().padStart(2, '0'),
    label: i.toString().padStart(2, '0') + ':00'
  }));

  const minutes = ['00', '15', '30', '45'].map(minute => ({
    value: minute,
    label: minute
  }));

  const handleTimeChange = (type: 'startTime' | 'endTime', field: 'hour' | 'minute', value: string) => {
    setFormData(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value
      }
    }));
  };

  const formatTime = (hour: string, minute: string) => {
    return `${hour}:${minute}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const templateParams = {
        to_name: 'Prauda',
        from_name: formData.clientName,
        reply_to: formData.clientEmail,
        message: `
📸 New Booking Request
═══════════════════

👤 Client Details
───────────────
• Name: ${formData.clientName}
• Email: ${formData.clientEmail}
• Phone: ${formData.phone}

📅 Session Details
───────────────
• Package: ${packages.find(pkg => pkg.id === formData.packageId)?.name || ''}
• Date: ${formData.date}
• Time: ${formatTime(formData.startTime.hour, formData.startTime.minute)} - ${formatTime(formData.endTime.hour, formData.endTime.minute)}
• Location: ${formData.location}
• Occasion: ${formData.occasion}

📝 Additional Notes
───────────────
${formData.notes || 'No additional notes provided'}
        `,
      };

      console.log('Sending email with params:', templateParams);

      const response = await emailjs.send(
        "service_1a81ztj",
        "template_92mmywd",
        templateParams
      );

      console.log('EmailJS Response:', response);

      // Add booking to store
      const booking = {
        id: Date.now().toString(),
        ...formData,
        status: 'pending' as const
      };
      addBooking(booking);
      
      // Show success message
      toast.success("Booking request sent successfully! We'll get back to you soon.");
      
      // Clear the form
      setFormData({
        clientName: user?.fullName || '',
        clientEmail: user?.email || '',
        packageId: '',
        date: '',
        startTime: {
          hour: '',
          minute: ''
        },
        endTime: {
          hour: '',
          minute: ''
        },
        phone: '',
        location: '',
        occasion: '',
        notes: ''
      });
      
      scrollToTop();
      navigate('/booking-confirmation');
    } catch (error) {
      console.error("Error sending email:", error);
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("There was an error sending your booking request. Please try again.");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-brand-beige/20 to-white">
        {/* Hero Section */}
        <div className="relative h-[40vh] bg-brand-dark overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Photography session"
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-dark/80" />
          </div>
          <div className="relative h-full flex items-center justify-center text-center px-4">
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4"
              >
                Book Your Session
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-brand-beige max-w-2xl mx-auto"
              >
                Let's create timeless memories together
              </motion.p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/95 backdrop-blur-xl shadow-2xl rounded-[2rem] p-8 md:p-12 max-w-3xl mx-auto relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-beige via-transparent to-brand-light" />
              <div className="absolute inset-0" style={{ 
                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.1) 1px, transparent 0)',
                backgroundSize: '20px 20px'
              }} />
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 relative">
              {/* Package Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="occasion" className="block text-sm font-medium text-brand-dark mb-2 ml-1">
                    Type of Session
                  </label>
                  <div className="relative group">
                    <Camera className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-muted group-focus-within:text-brand-beige transition-colors h-5 w-5" />
                    <select
                      id="occasion"
                      name="occasion"
                      value={formData.occasion}
                      onChange={handleOccasionChange}
                      className="w-full pl-12 pr-4 py-3 rounded-2xl border border-brand-beige/50 focus:border-brand-beige focus:ring-2 focus:ring-brand-beige/20 bg-white/50 backdrop-blur-sm transition-all"
                      required
                    >
                      <option value="">Select session type</option>
                      <option value="Wedding">Wedding Photography</option>
                      <option value="Fashion">Fashion & Editorial</option>
                      <option value="Family">Family Portrait</option>
                      <option value="Portrait">Professional Portrait</option>
                      <option value="Commercial">Commercial Photography</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="packageId" className="block text-sm font-medium text-brand-dark mb-2 ml-1">
                    Select Package
                  </label>
                  <div className="space-y-2">
                    <div className="relative group">
                      <CheckCircle2 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-muted group-focus-within:text-brand-beige transition-colors h-5 w-5" />
                      <select
                        id="packageId"
                        name="packageId"
                        value={formData.packageId}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 rounded-2xl border border-brand-beige/50 focus:border-brand-beige focus:ring-2 focus:ring-brand-beige/20 bg-white/50 backdrop-blur-sm transition-all"
                        required
                        disabled={!formData.occasion}
                      >
                        <option value="">
                          {formData.occasion ? 'Select a package' : 'First select session type'}
                        </option>
                        {formData.occasion && packagesByCategory[formData.occasion]?.map(pkg => (
                          <option key={pkg.id} value={pkg.id}>
                            {pkg.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {formData.packageId && (
                      <Link
                        to={`/packages/${formData.packageId}`}
                        target="_blank"
                        className="text-sm text-brand-beige hover:text-brand-muted transition-colors flex items-center gap-1 ml-1"
                      >
                        <InfoIcon className="w-4 h-4" />
                        View selected package details
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="clientName" className="block text-sm font-medium text-brand-dark mb-2 ml-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="clientName"
                    name="clientName"
                    required
                    value={formData.clientName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl border border-brand-beige/50 focus:border-brand-beige focus:ring-2 focus:ring-brand-beige/20 bg-white/50 backdrop-blur-sm transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="clientEmail" className="block text-sm font-medium text-brand-dark mb-2 ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="clientEmail"
                    name="clientEmail"
                    required
                    value={formData.clientEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl border border-brand-beige/50 focus:border-brand-beige focus:ring-2 focus:ring-brand-beige/20 bg-white/50 backdrop-blur-sm transition-all"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-brand-dark mb-2 ml-1">
                    Phone Number
                  </label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-muted group-focus-within:text-brand-beige transition-colors h-5 w-5" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 rounded-2xl border border-brand-beige/50 focus:border-brand-beige focus:ring-2 focus:ring-brand-beige/20 bg-white/50 backdrop-blur-sm transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-brand-dark mb-2 ml-1">
                    Preferred Location
                  </label>
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-muted group-focus-within:text-brand-beige transition-colors h-5 w-5" />
                    <select
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 rounded-2xl border border-brand-beige/50 focus:border-brand-beige focus:ring-2 focus:ring-brand-beige/20 bg-white/50 backdrop-blur-sm transition-all"
                      required
                    >
                      <option value="">Select location</option>
                      <option value="Studio">Our Studio</option>
                      <option value="Outdoor">Outdoor Location</option>
                      <option value="Client Location">Your Location</option>
                      <option value="Venue">Event Venue</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-brand-dark mb-2 ml-1">
                    Preferred Date
                  </label>
                  <div className="relative group">
                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-muted group-focus-within:text-brand-beige transition-colors h-5 w-5" />
                    <input
                      type="date"
                      id="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full pl-12 pr-4 py-3 rounded-2xl border border-brand-beige/50 focus:border-brand-beige focus:ring-2 focus:ring-brand-beige/20 bg-white/50 backdrop-blur-sm transition-all"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Start Time <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <select
                      className="w-24 bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                      value={formData.startTime.hour}
                      onChange={(e) => handleTimeChange('startTime', 'hour', e.target.value)}
                      required
                    >
                      <option value="">Hour</option>
                      {hours.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                    <select
                      className="w-24 bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                      value={formData.startTime.minute}
                      onChange={(e) => handleTimeChange('startTime', 'minute', e.target.value)}
                      required
                    >
                      <option value="">Minute</option>
                      {minutes.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    End Time <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <select
                      className="w-24 bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                      value={formData.endTime.hour}
                      onChange={(e) => handleTimeChange('endTime', 'hour', e.target.value)}
                      required
                    >
                      <option value="">Hour</option>
                      {hours.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                    <select
                      className="w-24 bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                      value={formData.endTime.minute}
                      onChange={(e) => handleTimeChange('endTime', 'minute', e.target.value)}
                      required
                    >
                      <option value="">Minute</option>
                      {minutes.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-brand-dark mb-2 ml-1">
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Tell us about your vision for the photoshoot, any specific requirements, or questions you may have..."
                  className="w-full px-4 py-3 rounded-2xl border border-brand-beige/50 focus:border-brand-beige focus:ring-2 focus:ring-brand-beige/20 bg-white/50 backdrop-blur-sm transition-all"
                />
              </div>

              {/* Submit Button */}
              <div className="flex flex-col items-center border-t border-brand-beige/30 pt-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full md:w-64 px-8 py-4 bg-brand-beige text-white rounded-full font-medium hover:bg-brand-muted transition-all duration-300 relative overflow-hidden group shadow-lg shadow-brand-beige/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-muted to-brand-beige opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative">Book a Session</span>
                </motion.button>
                <p className="mt-4 text-sm text-brand-muted text-center">
                  We'll get back to you within 24 hours to confirm your booking details.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}