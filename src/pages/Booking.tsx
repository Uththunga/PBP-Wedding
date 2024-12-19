import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useBookingStore } from '../store/bookingStore';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Phone, Camera, CheckCircle2 } from 'lucide-react';
import { scrollToTop } from '../utils/scrollUtils';
import PageTransition from '../components/ui/PageTransition';
import emailjs from '@emailjs/browser';
import toast from '../utils/toast';

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { packages, addBooking } = useBookingStore();
  const selectedPackageId = location.state?.packageId || (packages[0]?.id || 'wedding-premium');
  const selectedPackage = packages.find(pkg => pkg.id === selectedPackageId) || packages[0] || {
    id: 'wedding-premium',
    name: 'Premium Wedding',
    description: 'Complete wedding day coverage with luxury extras',
    features: []
  };

  // Initialize EmailJS once when component mounts
  React.useEffect(() => {
    emailjs.init("NliNJpGj4y_o-00NL");
  }, []);

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
• Time: ${formData.time}
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
      <div className="min-h-screen bg-gradient-to-b from-brand-beige to-white">
        {/* Hero Section */}
        <div className="relative h-[40vh] bg-brand-dark">
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Photography session"
              className="w-full h-full object-cover opacity-50"
            />
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
            className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto"
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
                    className="w-full px-4 py-3 rounded-lg border border-brand-beige focus:border-brand-primary focus:ring-brand-primary bg-white"
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
                    Type of Session
                  </label>
                  <select
                    id="occasion"
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-brand-beige focus:border-brand-primary focus:ring-brand-primary bg-white"
                    required
                  >
                    <option value="">Select session type</option>
                    <option value="Wedding">Wedding Photography</option>
                    <option value="Engagement">Engagement Session</option>
                    <option value="Family">Family Portrait</option>
                    <option value="Individual">Individual Portrait</option>
                    <option value="Commercial">Commercial Photography</option>
                    <option value="Event">Event Coverage</option>
                  </select>
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
                    className="w-full px-4 py-3 rounded-lg border border-brand-beige focus:border-brand-primary focus:ring-brand-primary bg-white"
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
                    className="w-full px-4 py-3 rounded-lg border border-brand-beige focus:border-brand-primary focus:ring-brand-primary bg-white"
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
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-muted h-5 w-5" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-brand-beige focus:border-brand-primary focus:ring-brand-primary bg-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-brand-dark mb-2">
                    Preferred Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-muted h-5 w-5" />
                    <select
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-brand-beige focus:border-brand-primary focus:ring-brand-primary bg-white"
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-brand-dark mb-2">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-muted h-5 w-5" />
                    <input
                      type="date"
                      id="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-brand-beige focus:border-brand-primary focus:ring-brand-primary bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-brand-dark mb-2">
                    Preferred Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-muted h-5 w-5" />
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-brand-beige focus:border-brand-primary focus:ring-brand-primary bg-white"
                      required
                    >
                      <option value="">Select time</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                      <option value="17:00">5:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="mb-8">
                <label htmlFor="notes" className="block text-sm font-medium text-brand-dark mb-2">
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Tell us about your vision for the photoshoot, any specific requirements, or questions you may have..."
                  className="w-full px-4 py-3 rounded-lg border border-brand-beige focus:border-brand-primary focus:ring-brand-primary bg-white"
                />
              </div>

              {/* Submit Button */}
              <div className="flex flex-col items-center border-t border-brand-beige pt-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full md:w-64 px-8 py-4 bg-transparent border-2 border-brand-dark text-brand-dark rounded-full font-medium hover:bg-brand-dark hover:text-white transition-all duration-300"
                >
                  Book a Session
                </motion.button>
                <p className="mt-4 text-sm text-brand-dark text-center">
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