import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Heart, Award, Users } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';

export default function About() {
  const stats = [
    {
      icon: Camera,
      value: '1000+',
      label: 'Photo Sessions',
      description: 'Capturing moments across Sri Lanka'
    },
    {
      icon: Heart,
      value: '500+',
      label: 'Happy Clients',
      description: 'Creating lasting memories'
    },
    {
      icon: Award,
      value: '15+',
      label: 'Years Experience',
      description: 'Professional excellence'
    },
    {
      icon: Users,
      value: '50+',
      label: 'Events Monthly',
      description: 'Trusted by families'
    }
  ];

  const values = [
    {
      title: 'Authenticity',
      description: 'We believe in capturing genuine moments that tell your unique story.'
    },
    {
      title: 'Excellence',
      description: 'Our commitment to quality drives every aspect of our service.'
    },
    {
      title: 'Connection',
      description: 'Building lasting relationships with our clients is at the heart of what we do.'
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-brand-beige/20 to-white">
        {/* Hero Section */}
        <div className="relative h-[40vh] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Studio photography"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 via-brand-dark/40 to-brand-dark/80" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="max-w-3xl px-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-serif text-white mb-6"
              >
                Our Story
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-brand-beige text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
              >
                Crafting timeless memories through the lens of passion and creativity
              </motion.p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-20">
          {/* Our Journey */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-brand-dark mb-6 text-center">
              Our Journey
            </h2>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-brand-muted text-lg leading-relaxed mb-6">
                Since 2008, Prauda Photography has been capturing life's most precious moments across Sri Lanka. What started as a passion for photography has grown into a trusted name in wedding, fashion, and portrait photography.
              </p>
              <p className="text-brand-muted text-lg leading-relaxed">
                Our approach combines technical excellence with artistic vision, ensuring each photograph tells a story and preserves emotions that last a lifetime.
              </p>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-beige/5 to-white/50 rounded-2xl transform transition-transform group-hover:scale-105" />
                <div className="relative">
                  <div className="relative w-16 h-16 mx-auto mb-4">
                    <div className="absolute inset-0 bg-brand-beige/10 rounded-2xl transform rotate-6 transition-transform group-hover:rotate-12" />
                    <div className="absolute inset-0 bg-white rounded-2xl shadow-lg transform group-hover:-rotate-3 transition-transform" />
                    <stat.icon className="w-8 h-8 absolute inset-0 m-auto text-brand-beige transition-colors group-hover:text-brand-muted" />
                  </div>
                  <div className="text-4xl font-bold text-brand-dark mb-2">{stat.value}</div>
                  <div className="text-lg font-medium text-brand-dark mb-2">{stat.label}</div>
                  <p className="text-brand-muted">{stat.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Our Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-brand-dark mb-12 text-center">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl relative group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-beige/5 to-white/50 rounded-2xl transform transition-transform group-hover:scale-105" />
                  <div className="relative">
                    <div className="w-16 h-16 mx-auto mb-6 bg-brand-beige/10 rounded-2xl transform rotate-45 group-hover:rotate-90 transition-transform duration-500" />
                    <h3 className="text-2xl font-serif text-brand-dark mb-4">
                      {value.title}
                    </h3>
                    <p className="text-brand-muted">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-beige/5 to-white/50" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-serif text-brand-dark mb-6">
                Meet Our Team
              </h2>
              <p className="text-brand-muted text-lg max-w-2xl mx-auto mb-12">
                Our talented team of photographers and creative professionals work together to bring your vision to life.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Team members can be added here */}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
