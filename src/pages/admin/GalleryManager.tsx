import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Image, ArrowLeft, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

interface Album {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  images: string[];
}

export default function GalleryManager() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isAddingAlbum, setIsAddingAlbum] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [newAlbum, setNewAlbum] = useState({
    title: '',
    description: '',
    coverImage: '',
    images: [] as string[]
  });

  // Redirect if not admin
  React.useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  const handleAddAlbum = (e: React.FormEvent) => {
    e.preventDefault();
    // Add album logic here
    setIsAddingAlbum(false);
  };

  const handleEditAlbum = (album: Album) => {
    setSelectedAlbum(album);
  };

  const handleDeleteAlbum = (albumId: string) => {
    // Delete album logic here
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Image upload logic here
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
            <h1 className="text-4xl font-serif text-brand-dark">Gallery Manager</h1>
          </div>
          <button
            onClick={() => setIsAddingAlbum(true)}
            className="flex items-center px-6 py-3 bg-brand-primary text-white rounded-full hover:bg-brand-primary/90 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Album
          </button>
        </div>

        {/* Album Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map((album, index) => (
            <motion.div
              key={album.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="relative aspect-[4/3] bg-gray-100">
                {album.coverImage ? (
                  <img
                    src={album.coverImage}
                    alt={album.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Image className="w-12 h-12 text-gray-300" />
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif text-brand-dark mb-2">{album.title}</h3>
                <p className="text-brand-muted mb-4">{album.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-brand-muted">{album.images.length} photos</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEditAlbum(album)}
                      className="p-2 text-brand-muted hover:text-brand-primary transition-colors"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteAlbum(album.id)}
                      className="p-2 text-brand-muted hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Album Modal */}
        {isAddingAlbum && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4"
            >
              <h2 className="text-2xl font-serif text-brand-dark mb-6">Create New Album</h2>
              <form onSubmit={handleAddAlbum} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-2">
                    Album Title
                  </label>
                  <input
                    type="text"
                    value={newAlbum.title}
                    onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-brand-beige focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-2">
                    Description
                  </label>
                  <textarea
                    value={newAlbum.description}
                    onChange={(e) => setNewAlbum({ ...newAlbum, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-brand-beige focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-2">
                    Cover Image
                  </label>
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={() => document.getElementById('coverImage')?.click()}
                      className="flex items-center px-4 py-2 border border-brand-beige rounded-xl hover:bg-brand-beige/10 transition-colors"
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      Upload Image
                    </button>
                    <input
                      id="coverImage"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsAddingAlbum(false)}
                    className="px-6 py-2 text-brand-muted hover:text-brand-dark transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-brand-primary text-white rounded-full hover:bg-brand-primary/90 transition-colors"
                  >
                    Create Album
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
