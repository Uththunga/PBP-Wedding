import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { 
  Camera, 
  Calendar, 
  Settings, 
  Image as ImageIcon, 
  Clock,
  Download,
  Heart,
  MessageCircle
} from 'lucide-react';
import ClientGallery from '../../components/members/ClientGallery';
import PageTransition from '../../components/ui/PageTransition';

export default function Dashboard() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('gallery');

  // Example data - replace with real data from your backend
  const upcomingSession = {
    date: '2024-01-15',
    time: '14:00',
    type: 'Wedding Photography',
    location: 'Beach Side Resort'
  };

  const recentPhotos = [
    { id: '1', event: 'Engagement Session', date: '2023-12-10', count: 150 },
    { id: '2', event: 'Pre-wedding Shoot', date: '2023-11-25', count: 200 }
  ];

  const stats = [
    { icon: Camera, label: 'Photo Sessions', value: '3' },
    { icon: ImageIcon, label: 'Total Photos', value: '350' },
    { icon: Heart, label: 'Favorites', value: '45' },
    { icon: Download, label: 'Downloads', value: '120' }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-brand-beige pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-brand-dark mb-3">
              Welcome back, {user?.name}
            </h1>
            <p className="text-brand-muted text-lg">
              View and manage your photography sessions
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          >
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="bg-white rounded-lg p-6 shadow-sm"
              >
                <stat.icon className="w-8 h-8 text-brand-dark mb-3" />
                <div className="text-3xl font-bold text-brand-dark mb-1">
                  {stat.value}
                </div>
                <div className="text-brand-muted text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Upcoming Session */}
          {upcomingSession && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg p-6 shadow-sm mb-12"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-serif text-brand-dark">
                  Upcoming Session
                </h2>
                <Clock className="w-6 h-6 text-brand-muted" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-brand-muted mb-2">Date & Time</div>
                  <div className="text-lg text-brand-dark">
                    {upcomingSession.date} at {upcomingSession.time}
                  </div>
                </div>
                <div>
                  <div className="text-brand-muted mb-2">Location</div>
                  <div className="text-lg text-brand-dark">
                    {upcomingSession.location}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Main Content Tabs */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('gallery')}
                  className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                    activeTab === 'gallery'
                      ? 'border-brand-dark text-brand-dark'
                      : 'border-transparent text-brand-muted hover:text-brand-dark hover:border-brand-muted'
                  }`}
                >
                  <ImageIcon className="w-5 h-5 mr-2" />
                  Photo Gallery
                </button>
                <button
                  onClick={() => setActiveTab('sessions')}
                  className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                    activeTab === 'sessions'
                      ? 'border-brand-dark text-brand-dark'
                      : 'border-transparent text-brand-muted hover:text-brand-dark hover:border-brand-muted'
                  }`}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Sessions
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                    activeTab === 'settings'
                      ? 'border-brand-dark text-brand-dark'
                      : 'border-transparent text-brand-muted hover:text-brand-dark hover:border-brand-muted'
                  }`}
                >
                  <Settings className="w-5 h-5 mr-2" />
                  Settings
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'gallery' && <ClientGallery />}
              {activeTab === 'sessions' && (
                <div className="space-y-6">
                  {recentPhotos.map(session => (
                    <div 
                      key={session.id}
                      className="border border-gray-100 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium text-brand-dark mb-2">
                            {session.event}
                          </h3>
                          <p className="text-brand-muted">
                            {session.date}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-brand-dark">
                            {session.count}
                          </div>
                          <div className="text-sm text-brand-muted">Photos</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'settings' && (
                <div className="max-w-2xl">
                  <h3 className="text-lg font-medium text-brand-dark mb-6">
                    Profile Settings
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-brand-muted mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-md border-gray-200 focus:border-brand-dark focus:ring-brand-dark"
                        defaultValue={user?.name}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-muted mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-2 rounded-md border-gray-200 focus:border-brand-dark focus:ring-brand-dark"
                        defaultValue={user?.email}
                      />
                    </div>
                    <button className="px-6 py-2 bg-brand-dark text-white rounded-md hover:bg-brand-muted transition-colors">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}