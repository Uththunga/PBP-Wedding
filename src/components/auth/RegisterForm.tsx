import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Loader } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
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
      await register(formData.email, formData.password, formData.name);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create account. Please try again.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md w-full mx-auto"
    >
      <h2 className="text-3xl font-serif text-center mb-2 text-brand-beige">Create Account</h2>
      <p className="text-center text-brand-muted mb-8">Join us to manage your photography sessions</p>
      
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
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-muted h-5 w-5" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-brand-dark/50 border border-brand-muted/20 rounded-lg py-3 px-10 text-brand-beige placeholder-brand-muted/50 focus:outline-none focus:border-brand-beige/50"
              placeholder="Enter your full name"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-beige mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-muted h-5 w-5" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-brand-dark/50 border border-brand-muted/20 rounded-lg py-3 px-10 text-brand-beige placeholder-brand-muted/50 focus:outline-none focus:border-brand-beige/50"
              placeholder="Create a password"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-beige mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-muted h-5 w-5" />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full bg-brand-dark/50 border border-brand-muted/20 rounded-lg py-3 px-10 text-brand-beige placeholder-brand-muted/50 focus:outline-none focus:border-brand-beige/50"
              placeholder="Confirm your password"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-brand-dark text-brand-beige rounded-full py-3 font-medium hover:bg-brand-dark/90 transition-colors relative"
        >
          {isLoading ? (
            <Loader className="h-5 w-5 animate-spin mx-auto" />
          ) : (
            'Create Account'
          )}
        </button>

        <p className="text-center text-sm text-brand-muted">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-brand-beige hover:text-brand-muted transition-colors"
          >
            Sign in
          </button>
        </p>
      </form>
    </motion.div>
  );
}
