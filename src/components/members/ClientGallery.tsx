import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Download, Image, Filter, Search, X } from 'lucide-react';

interface Photo {
  id: string;
  url: string;
  selected: boolean;
  date: string;
  event: string;
  favorite: boolean;
}

export default function ClientGallery() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

  const photos: Photo[] = [
    { 
      id: '1', 
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc',
      selected: false,
      date: '2024-03-15',
      event: 'Wedding',
      favorite: true
    },
    { 
      id: '2',
      url: 'https://images.unsplash.com/photo-1532947974358-a218d18d8d14',
      selected: true,
      date: '2024-03-20',
      event: 'Engagement',
      favorite: false
    },
    { 
      id: '3',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552',
      selected: false,
      date: '2024-03-25',
      event: 'Pre-wedding',
      favorite: true
    }
  ];

  const filters = [
    { id: 'all', label: 'All Photos' },
    { id: 'favorites', label: 'Favorites' },
    { id: 'wedding', label: 'Wedding' },
    { id: 'engagement', label: 'Engagement' }
  ];

  const togglePhotoSelection = (photoId: string) => {
    setSelectedPhotos(prev => 
      prev.includes(photoId) 
        ? prev.filter(id => id !== photoId)
        : [...prev, photoId]
    );
  };

  const filteredPhotos = photos.filter(photo => {
    if (selectedFilter === 'favorites' && !photo.favorite) return false;
    if (selectedFilter !== 'all' && photo.event.toLowerCase() !== selectedFilter) return false;
    if (searchQuery && !photo.event.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search photos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:border-brand-dark focus:ring-brand-dark"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                selectedFilter === filter.id
                  ? 'bg-brand-dark text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Photos Actions */}
      {selectedPhotos.length > 0 && (
        <div className="flex items-center justify-between bg-brand-dark/5 rounded-lg p-4">
          <span className="text-brand-dark font-medium">
            {selectedPhotos.length} photo{selectedPhotos.length > 1 ? 's' : ''} selected
          </span>
          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 text-brand-dark hover:text-brand-muted">
              <Heart className="h-5 w-5" />
              <span>Add to Favorites</span>
            </button>
            <button className="flex items-center space-x-2 bg-brand-dark text-white px-4 py-2 rounded-md hover:bg-brand-muted transition-colors">
              <Download className="h-5 w-5" />
              <span>Download Selected</span>
            </button>
          </div>
        </div>
      )}

      {/* Photo Grid */}
      {filteredPhotos.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Image className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Photos Found</h3>
          <p className="text-gray-500">Try adjusting your search or filter settings</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative aspect-square mb-2">
                <img
                  src={photo.url}
                  alt={`${photo.event} photo`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                  <div className="absolute inset-0 flex items-center justify-center space-x-4">
                    <button 
                      onClick={() => togglePhotoSelection(photo.id)}
                      className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                    >
                      <Download className="h-5 w-5 text-gray-900" />
                    </button>
                    <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                      <Heart className={`h-5 w-5 ${photo.favorite ? 'text-red-500' : 'text-gray-900'}`} />
                    </button>
                  </div>
                </div>
                {selectedPhotos.includes(photo.id) && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-brand-dark rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </div>
                )}
              </div>
              <div className="px-1">
                <p className="text-gray-900 font-medium">{photo.event}</p>
                <p className="text-gray-500 text-sm">{photo.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}