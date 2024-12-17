import React from 'react';
import { Photo, PhotoStatus } from '../../types';
import PhotoGrid from './PhotoGrid';
import PhotoProgress from './PhotoProgress';
import PhotoFilters from './PhotoFilters';
import { motion } from 'framer-motion';

interface PhotoManagementProps {
  photos: Photo[];
  onPhotoStatusChange: (photoId: string, status: PhotoStatus) => void;
  onPhotoSelect: (photoId: string) => void;
  printedCount: number;
  deliveredCount: number;
  onCountUpdate: (type: 'printed' | 'delivered', count: number) => void;
}

export default function PhotoManagement({
  photos,
  onPhotoStatusChange,
  onPhotoSelect,
  printedCount,
  deliveredCount,
  onCountUpdate,
}: PhotoManagementProps) {
  const [filter, setFilter] = React.useState('all');

  const counts = {
    all: photos.length,
    selected: photos.filter(p => p.selected).length,
    printed: printedCount,
    delivered: deliveredCount,
  };

  const filteredPhotos = React.useMemo(() => {
    if (filter === 'all') return photos;
    if (filter === 'selected') return photos.filter(p => p.selected);
    return photos.filter(p => p.status === filter);
  }, [photos, filter]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <PhotoFilters
            currentFilter={filter}
            onFilterChange={setFilter}
            counts={counts}
          />
        </div>
        <div>
          <PhotoProgress
            totalPhotos={photos.length}
            selectedCount={counts.selected}
            printedCount={printedCount}
            deliveredCount={deliveredCount}
          />
        </div>
      </div>

      {filteredPhotos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No photos found for the selected filter.</p>
        </div>
      ) : (
        <PhotoGrid
          photos={filteredPhotos}
          onPhotoSelect={onPhotoSelect}
          onPhotoStatusChange={onPhotoStatusChange}
        />
      )}
    </motion.div>
  );
}