import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, ArrowLeft, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useBookingStore } from '../../store/bookingStore';

interface Feature {
  id: string;
  text: string;
}

interface Package {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  features: string[];
}

export default function PackageManager() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { packages } = useBookingStore();
  const [isAddingPackage, setIsAddingPackage] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [newPackage, setNewPackage] = useState({
    name: '',
    description: '',
    category: 'Wedding',
    price: 0,
    features: [] as string[]
  });
  const [newFeature, setNewFeature] = useState('');

  // Redirect if not admin
  React.useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  const categories = ['Wedding', 'Fashion', 'Family', 'Portrait', 'Commercial'];

  const handleAddPackage = (e: React.FormEvent) => {
    e.preventDefault();
    // Add package logic here
    setIsAddingPackage(false);
  };

  const handleEditPackage = (pkg: Package) => {
    setSelectedPackage(pkg);
  };

  const handleDeletePackage = (packageId: string) => {
    // Delete package logic here
  };

  const handleAddFeature = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newFeature.trim()) {
      setNewPackage({
        ...newPackage,
        features: [...newPackage.features, newFeature.trim()]
      });
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setNewPackage({
      ...newPackage,
      features: newPackage.features.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-beige/20 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <button
              onClick={() => navigate('/admin')}
              className="flex items-center text-brand-muted hover:text-brand-dark transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>
            <h1 className="text-4xl font-serif text-brand-dark">Package Manager</h1>
          </div>
          <button
            onClick={() => setIsAddingPackage(true)}
            className="flex items-center px-6 py-3 bg-brand-primary text-white rounded-full hover:bg-brand-primary/90 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Package
          </button>
        </div>

        {/* Package Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-brand-beige/20 text-brand-dark rounded-full text-sm">
                    {pkg.category}
                  </span>
                  <div className="text-xl font-serif text-brand-primary">
                    ${pkg.price}
                  </div>
                </div>
                <h3 className="text-xl font-serif text-brand-dark mb-2">{pkg.name}</h3>
                <p className="text-brand-muted mb-4">{pkg.description}</p>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-2 text-sm text-brand-muted">
                      <span className="text-brand-primary">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-end space-x-2">
                  <button
                    onClick={() => handleEditPackage(pkg)}
                    className="p-2 text-brand-muted hover:text-brand-primary transition-colors"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeletePackage(pkg.id)}
                    className="p-2 text-brand-muted hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Package Modal */}
        {isAddingPackage && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-serif text-brand-dark mb-6">Create New Package</h2>
              <form onSubmit={handleAddPackage} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-2">
                    Package Name
                  </label>
                  <input
                    type="text"
                    value={newPackage.name}
                    onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-brand-beige focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-2">
                    Category
                  </label>
                  <select
                    value={newPackage.category}
                    onChange={(e) => setNewPackage({ ...newPackage, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-brand-beige focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none"
                    required
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-2">
                    Description
                  </label>
                  <textarea
                    value={newPackage.description}
                    onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-brand-beige focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-2">
                    Price
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-muted" />
                    <input
                      type="number"
                      value={newPackage.price}
                      onChange={(e) => setNewPackage({ ...newPackage, price: Number(e.target.value) })}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-brand-beige focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-2">
                    Features
                  </label>
                  <div className="space-y-2">
                    <div className="relative">
                      <Plus className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-muted" />
                      <input
                        type="text"
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        onKeyDown={handleAddFeature}
                        placeholder="Press Enter to add feature"
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-brand-beige focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none"
                      />
                    </div>
                    <ul className="space-y-2">
                      {newPackage.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between px-4 py-2 bg-brand-beige/10 rounded-lg"
                        >
                          <span className="text-sm text-brand-dark">{feature}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveFeature(index)}
                            className="text-brand-muted hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsAddingPackage(false)}
                    className="px-6 py-2 text-brand-muted hover:text-brand-dark transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-brand-primary text-white rounded-full hover:bg-brand-primary/90 transition-colors"
                  >
                    Create Package
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
