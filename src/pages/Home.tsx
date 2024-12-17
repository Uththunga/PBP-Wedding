import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/home/Hero';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Clock, Users, Star, Calendar, ArrowRight } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah & John",
    role: "Wedding Couple",
    content: "Our wedding photos are absolutely stunning. Every moment was captured perfectly!",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc"
  },
  {
    name: "Corporate Events Inc",
    role: "Business Client",
    content: "Professional service and amazing results for our corporate events.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865"
  },
  {
    name: "The Thompson Family",
    role: "Family Session",
    content: "Captured our family's personality beautifully. A day to remember!",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300"
  }
];

const services = [
  {
    icon: Camera,
    title: "Wedding Photography",
    description: "Capturing your special day with elegance and style",
    features: ["Full day coverage", "Two photographers", "Online gallery"]
  },
  {
    icon: Users,
    title: "Portrait Sessions",
    description: "Professional portraits for individuals and families",
    features: ["Indoor/Outdoor", "Multiple outfits", "Retouched photos"]
  },
  {
    icon: Calendar,
    title: "Event Coverage",
    description: "Comprehensive coverage for all types of events",
    features: ["Corporate events", "Social gatherings", "Quick delivery"]
  }
];

const processSteps = [
  {
    number: "01",
    title: "Initial Consultation",
    description: "We discuss your vision and requirements"
  },
  {
    number: "02",
    title: "Planning Session",
    description: "Detailed planning of the shoot and logistics"
  },
  {
    number: "03",
    title: "Photo Session",
    description: "Professional photography with attention to detail"
  },
  {
    number: "04",
    title: "Post-Processing",
    description: "Careful editing and enhancement of photos"
  }
];

const galleryImages = [
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
  "https://images.unsplash.com/photo-1532947974358-a218d18d8d14",
  "https://images.unsplash.com/photo-1519741497674-611481863552",
  "https://images.unsplash.com/photo-1537633552985-df8429e8048b",
  "https://images.unsplash.com/photo-1541250848049-b4f7141dca3f",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed"
];

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <div className="bg-brand-beige">
      <Hero />
      
      {/* Services Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif text-brand-dark mb-4">Our Services</h2>
            <p className="text-brand-muted max-w-2xl mx-auto">
              Professional photography services tailored to your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-brand-light p-8 rounded-lg hover:bg-white transition-colors duration-300"
              >
                <service.icon className="w-12 h-12 text-brand-dark mb-6" />
                <h3 className="text-2xl font-serif text-brand-dark mb-4">{service.title}</h3>
                <p className="text-brand-muted mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="text-brand-muted flex items-center">
                      <Star className="w-4 h-4 text-brand-dark mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-6 bg-brand-light">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif text-brand-dark mb-4">Our Process</h2>
            <p className="text-brand-muted max-w-2xl mx-auto">
              From consultation to delivery, we ensure a smooth and professional experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="text-5xl font-bold text-brand-dark/10 mb-4">{step.number}</div>
                <h3 className="text-xl font-serif text-brand-dark mb-2">{step.title}</h3>
                <p className="text-brand-muted">{step.description}</p>
                {index < processSteps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-4 text-brand-muted transform -translate-y-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif text-brand-dark mb-4">Featured Work</h2>
            <p className="text-brand-muted max-w-2xl mx-auto">
              A glimpse into our portfolio of memorable moments
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative aspect-square overflow-hidden rounded-lg"
              >
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-brand-beige bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/gallery"
              className="inline-flex items-center text-brand-dark hover:text-brand-muted transition-colors"
            >
              View Full Gallery
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-brand-light">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif text-brand-dark mb-4">Client Testimonials</h2>
            <p className="text-brand-muted max-w-2xl mx-auto">
              What our clients say about their experience
            </p>
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
              >
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img
                    src={testimonials[activeTestimonial].image}
                    alt={testimonials[activeTestimonial].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-6">
                  <p className="text-xl text-brand-dark italic">"{testimonials[activeTestimonial].content}"</p>
                  <div>
                    <div className="text-brand-dark font-semibold">{testimonials[activeTestimonial].name}</div>
                    <div className="text-brand-muted">{testimonials[activeTestimonial].role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === activeTestimonial ? 'bg-brand-dark' : 'bg-brand-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-serif text-brand-dark mb-6"
          >
            Ready to Capture Your Special Moments?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-brand-muted mb-8"
          >
            Let's create beautiful memories together. Book your session today.
          </motion.p>
          <Link
            to="/booking"
            className="inline-block bg-brand-dark text-brand-beige px-8 py-3 rounded-full hover:bg-brand-light transition-colors"
          >
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
}