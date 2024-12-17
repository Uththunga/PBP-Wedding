import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const handleForgotPassword = () => {
    navigate('/reset-password');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md w-full mx-auto"
    >
      <h2 className="text-3xl font-serif text-center mb-2 text-brand-beige">Welcome Back</h2>
      <p className="text-center text-brand-muted mb-8">Sign in to access your photos and bookings</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-500/10 text-red-500 px-4 py-2 rounded-lg text-sm text-center"
          >
            {error}
          </motion.div>
        )}

        <div>
          <label className="block text-sm font-medium text-brand-beige mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-muted h-5 w-5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-brand-dark/50 border border-brand-muted/20 rounded-lg py-3 px-10 text-brand-beige placeholder-brand-muted/50 focus:outline-none focus:border-brand-beige/50"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-beige mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-muted h-5 w-5" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-brand-dark/50 border border-brand-muted/20 rounded-lg py-3 px-10 text-brand-beige placeholder-brand-muted/50 focus:outline-none focus:border-brand-beige/50"
              placeholder="Enter your password"
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-brand-muted hover:text-brand-beige transition-colors"
          >
            Forgot your password?
          </button>
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="text-brand-muted hover:text-brand-beige transition-colors"
          >
            Create an account
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-brand-dark text-brand-beige rounded-full py-3 font-medium hover:bg-brand-dark/90 transition-colors relative"
        >
          {isLoading ? (
            <Loader className="h-5 w-5 animate-spin mx-auto" />
          ) : (
            'Sign In'
          )}
        </button>
      </form>
    </motion.div>
  );
}