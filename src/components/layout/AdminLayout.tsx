import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ImageIcon, Camera, Settings, LogOut, ChevronLeft } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    {
      title: 'Gallery Albums',
      icon: ImageIcon,
      path: '/admin/gallery'
    },
    {
      title: 'Photography Packages',
      icon: Camera,
      path: '/admin/packages'
    },
    {
      title: 'Settings',
      icon: Settings,
      path: '/admin/settings'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-beige/20 to-white">
      {/* Admin Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/admin" className="text-2xl font-serif text-brand-dark">
              Admin Panel
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'text-brand-primary bg-brand-beige/10'
                      : 'text-brand-muted hover:text-brand-dark hover:bg-brand-beige/5'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-6">
            <span className="text-brand-dark">
              Welcome, {user?.fullName}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-brand-muted hover:text-brand-dark transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Back to Website Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link
          to="/"
          className="inline-flex items-center text-brand-muted hover:text-brand-dark transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Website
        </Link>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
