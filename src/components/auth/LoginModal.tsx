import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Loader, Eye, EyeOff } from 'lucide-react';
import SignUpModal from './SignUpModal';
import { useAuthStore } from '../../store/authStore';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignUp?: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const { login, isLoading } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
      onClose();
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const handleSwitchToSignUp = () => {
    setShowSignUp(true);
  };

  const handleSwitchToLogin = () => {
    setShowSignUp(false);
  };

  if (showSignUp) {
    return (
      <SignUpModal
        isOpen={isOpen}
        onClose={onClose}
        onSwitchToLogin={handleSwitchToLogin}
      />
    );
  }

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
                  <h2 className="text-3xl font-serif text-brand-dark mb-2">Welcome Back</h2>
                  <p className="text-brand-muted text-sm">Sign in to continue your journey</p>
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
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-brand-dark mb-2 ml-1">
                      Email
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-muted group-focus-within:text-brand-beige transition-colors h-5 w-5" />
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white/50 backdrop-blur-sm border border-brand-beige/50 rounded-2xl py-3 px-12 text-brand-dark placeholder-brand-muted/70 focus:outline-none focus:ring-2 focus:ring-brand-beige/20 focus:border-brand-beige focus:bg-white transition-all"
                        placeholder="Enter your password"
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
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 text-sm text-brand-dark group cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded-xl border-brand-beige text-brand-beige focus:ring-brand-beige/20 focus:ring-offset-0"
                      />
                      <div className="absolute inset-0 bg-brand-beige/10 rounded-xl scale-125 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </div>
                    <span>Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-sm text-brand-beige hover:text-brand-muted transition-colors relative group"
                  >
                    <span>Forgot password?</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-beige/30 group-hover:w-full transition-all duration-300" />
                  </button>
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
                          <span>Signing in...</span>
                        </>
                      ) : (
                        <span>Sign In</span>
                      )}
                    </div>
                  </button>

                  <p className="text-center text-sm text-brand-muted">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={handleSwitchToSignUp}
                      className="text-brand-beige hover:text-brand-muted transition-colors font-medium relative group"
                    >
                      <span>Create one now</span>
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
