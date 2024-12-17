import { useState, useCallback } from 'react';
import { Photo } from '../../../types';

export const usePhotoSelection = (initialPhotos: Photo[]) => {
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

  const togglePhotoSelection = useCallback((photoId: string) => {
    setSelectedPhotos(prev => 
      prev.includes(photoId) 
        ? prev.filter(id => id !== photoId)
        : [...prev, photoId]
    );
  }, []);

  const isPhotoSelected = useCallback((photoId: string) => {
    return selectedPhotos.includes(photoId);
  }, [selectedPhotos]);

  const clearSelection = useCallback(() => {
    setSelectedPhotos([]);
  }, []);

  return {
    selectedPhotos,
    togglePhotoSelection,
    isPhotoSelected,
    clearSelection
  };
};