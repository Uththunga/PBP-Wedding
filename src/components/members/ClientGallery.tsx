import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Download, Image, Filter } from 'lucide-react';

interface Photo {
  id: string;
  url: string;
  selected: boolean;
  date: string;
  event: string;
}

export default function ClientGallery() {
  const photos: Photo[] = [
    { 
      id: '1', 
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc',
      selected: false,
      date: '2024-03-15',
      event: 'Wedding'
    },
    { 
      id: '2',
      url: 'https://images.unsplash.com/photo-1532947974358-a218d18d8d14',
      selected: true,
      date: '2024-03-20',
      event: 'Engagement'
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-serif text-brand-beige mb-1">Your Photos</h2>
          <p className="text-sm text-brand-muted">Select photos to download or share</p>
        </div>
        <div className="flex space-x-4">
          <button className="flex items-center space-x-2 bg-brand-dark/50 border border-brand-beige/10 px-4 py-2 rounded-lg hover:border-brand-beige/30 transition-colors text-brand-beige">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 bg-brand-dark/50 border border-brand-beige/10 px-4 py-2 rounded-lg hover:border-brand-beige/30 transition-colors text-brand-beige">
            <Download className="h-4 w-4" />
            <span>Download Selected</span>
          </button>
        </div>
      </div>

      {photos.length === 0 ? (
        <div className="text-center py-12 bg-brand-dark/50 border border-brand-beige/10 rounded-lg">
          <Image className="h-12 w-12 mx-auto mb-4 text-brand-muted opacity-50" />
          <h3 className="text-lg font-serif text-brand-beige mb-2">No Photos Yet</h3>
          <p className="text-brand-muted">Your photos will appear here after your session</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
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
                <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <button className="p-2 bg-brand-dark/80 rounded-full hover:bg-brand-dark transition-colors">
                    <Heart className={`h-5 w-5 ${photo.selected ? 'text-brand-beige' : 'text-brand-muted'}`} />
                  </button>
                </div>
              </div>
              <div className="px-1">
                <p className="text-brand-beige text-sm">{photo.event}</p>
                <p className="text-brand-muted text-xs">{photo.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}