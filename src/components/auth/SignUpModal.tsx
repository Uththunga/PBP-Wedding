import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Loader, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function SignUpModal({ isOpen, onClose, onSwitchToLogin }: SignUpModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const { register, isLoading } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await register(formData.email, formData.password, `${formData.firstName} ${formData.lastName}`);
      onClose();
    } catch (err) {
      setError('Failed to create account. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-md bg-brand-light/95 backdrop-blur-xl rounded-[2rem] shadow-2xl p-8 relative overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-beige via-transparent to-brand-light" />
              <div className="absolute inset-0" style={{ 
                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.1) 1px, transparent 0)',
                backgroundSize: '20px 20px'
              }} />
            </div>

            <div className="relative">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-serif text-brand-dark mb-2">Create Account</h2>
                  <p className="text-brand-muted text-sm">Join us to start your journey</p>
                </div>
                <button
                  onClick={onClose}
                  className="text-brand-muted hover:text-brand-dark transition-colors absolute top-0 right-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50/50 backdrop-blur-sm text-red-500 px-4 py-3 rounded-2xl text-sm border border-red-100 mb-6 flex items-center space-x-2"
                >
                  <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse" />
                  <span>{error}</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-brand-dark mb-2 ml-1">
                      First Name
                    </label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-muted group-focus-within:text-brand-beige transition-colors h-5 w-5" />
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full bg-white/50 backdrop-blur-sm border border-brand-beige/50 rounded-2xl py-3 pl-12 pr-4 text-brand-dark placeholder-brand-muted/70 focus:outline-none focus:ring-2 focus:ring-brand-beige/20 focus:border-brand-beige focus:bg-white transition-all"
                        placeholder="First name"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-brand-dark mb-2 ml-1">
                      Last Name
                    </label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-muted group-focus-within:text-brand-beige transition-colors h-5 w-5" />
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full bg-white/50 backdrop-blur-sm border border-brand-beige/50 rounded-2xl py-3 pl-12 pr-4 text-brand-dark placeholder-brand-muted/70 focus:outline-none focus:ring-2 focus:ring-brand-beige/20 focus:border-brand-beige focus:bg-white transition-all"
                        placeholder="Last name"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-brand-dark mb-2 ml-1">
                    Email
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-muted group-focus-within:text-brand-beige transition-colors h-5 w-5" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white/50 backdrop-blur-sm border border-brand-beige/50 rounded-2xl py-3 px-12 text-brand-dark placeholder-brand-muted/70 focus:outline-none focus:ring-2 focus:ring-brand-beige/20 focus:border-brand-beige focus:bg-white transition-all"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-brand-dark mb-2 ml-1">
                    Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-muted group-focus-within:text-brand-beige transition-colors h-5 w-5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full bg-white/50 backdrop-blur-sm border border-brand-beige/50 rounded-2xl py-3 px-12 text-brand-dark placeholder-brand-muted/70 focus:outline-none focus:ring-2 focus:ring-brand-beige/20 focus:border-brand-beige focus:bg-white transition-all"
                      placeholder="Create a password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-brand-muted hover:text-brand-dark transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-brand-dark mb-2 ml-1">
                    Confirm Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-muted group-focus-within:text-brand-beige transition-colors h-5 w-5" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full bg-white/50 backdrop-blur-sm border border-brand-beige/50 rounded-2xl py-3 px-12 text-brand-dark placeholder-brand-muted/70 focus:outline-none focus:ring-2 focus:ring-brand-beige/20 focus:border-brand-beige focus:bg-white transition-all"
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-brand-muted hover:text-brand-dark transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-brand-beige text-white py-4 px-6 rounded-full hover:bg-brand-muted transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium relative overflow-hidden group shadow-lg shadow-brand-beige/20"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-muted to-brand-beige opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      {isLoading ? (
                        <>
                          <Loader className="w-5 h-5 animate-spin" />
                          <span>Creating account...</span>
                        </>
                      ) : (
                        <span>Create Account</span>
                      )}
                    </div>
                  </button>

                  <p className="text-center text-sm text-brand-muted">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={onSwitchToLogin}
                      className="text-brand-beige hover:text-brand-muted transition-colors font-medium relative group"
                    >
                      <span>Sign in instead</span>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-beige/30 group-hover:w-full transition-all duration-300" />
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
