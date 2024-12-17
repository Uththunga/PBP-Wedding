import React from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { Camera, MessageCircle, Calendar, Settings } from 'lucide-react';
import ClientGallery from '../../components/members/ClientGallery';
import BookingStatus from '../../components/members/BookingStatus';

export default function Dashboard() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-brand-dark pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-serif text-brand-beige mb-2">
            Welcome back, {user?.name}
          </h1>
          <p className="text-brand-muted">
            Manage your photography sessions and access your photos
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <button className="flex items-center space-x-3 bg-brand-dark/50 border border-brand-beige/10 p-4 rounded-lg hover:border-brand-beige/30 transition-colors">
            <Camera className="h-5 w-5 text-brand-beige" />
            <span className="text-brand-beige">Book Session</span>
          </button>
          <button className="flex items-center space-x-3 bg-brand-dark/50 border border-brand-beige/10 p-4 rounded-lg hover:border-brand-beige/30 transition-colors">
            <MessageCircle className="h-5 w-5 text-brand-beige" />
            <span className="text-brand-beige">Message</span>
          </button>
          <button className="flex items-center space-x-3 bg-brand-dark/50 border border-brand-beige/10 p-4 rounded-lg hover:border-brand-beige/30 transition-colors">
            <Calendar className="h-5 w-5 text-brand-beige" />
            <span className="text-brand-beige">Schedule</span>
          </button>
          <button className="flex items-center space-x-3 bg-brand-dark/50 border border-brand-beige/10 p-4 rounded-lg hover:border-brand-beige/30 transition-colors">
            <Settings className="h-5 w-5 text-brand-beige" />
            <span className="text-brand-beige">Settings</span>
          </button>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2">
            <ClientGallery />
          </div>
          <div className="space-y-8">
            <BookingStatus />
            
            {/* Communication Section */}
            <div className="bg-brand-dark/50 border border-brand-beige/10 rounded-xl p-6">
              <h3 className="text-xl font-serif text-brand-beige mb-6">Messages</h3>
              <div className="text-brand-muted text-center py-8">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No new messages</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}