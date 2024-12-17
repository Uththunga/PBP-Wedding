import React from 'react';
import { Photo, PhotoStatus } from '../../types';
import PhotoGridItem from './PhotoGridItem';
import { motion } from 'framer-motion';

interface PhotoGridProps {
  photos: Photo[];
  onPhotoSelect: (photoId: string) => void;
  onPhotoStatusChange: (photoId: string, status: PhotoStatus) => void;
}

export default function PhotoGrid({ photos, onPhotoSelect, onPhotoStatusChange }: PhotoGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {photos.map((photo) => (
        <PhotoGridItem
          key={photo.id}
          photo={photo}
          onSelect={onPhotoSelect}
          onStatusChange={onPhotoStatusChange}
        />
      ))}
    </div>
  );
}