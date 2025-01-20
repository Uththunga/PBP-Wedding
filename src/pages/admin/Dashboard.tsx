import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ImageIcon, Camera, Settings } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  // Redirect if not admin
  React.useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  const adminModules = [
    {
      title: 'Gallery Albums',
      icon: ImageIcon,
      description: 'Manage gallery albums and photos',
      link: '/admin/gallery'
    },
    {
      title: 'Photography Packages',
      icon: Camera,
      description: 'Manage photography packages and pricing',
      link: '/admin/packages'
    },
    {
      title: 'Settings',
      icon: Settings,
      description: 'Configure website settings',
      link: '/admin/settings'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-beige/20 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-serif text-brand-dark mb-8"
          >
            Overview
          </motion.h1>
          <p className="text-brand-muted">
            Welcome back, {user?.fullName}. Manage your website content and settings here.
          </p>
        </div>

        {/* Admin Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminModules.map((module, index) => (
            <motion.div
              key={module.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => navigate(module.link)}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-brand-beige/20 rounded-xl">
                  <module.icon className="w-6 h-6 text-brand-primary" />
                </div>
                <h2 className="text-xl font-serif text-brand-dark">{module.title}</h2>
              </div>
              <p className="text-brand-muted">{module.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
