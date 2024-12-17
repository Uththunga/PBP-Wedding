import { Photo, PhotoStatus } from '../types';

export const calculatePhotoProgress = (total: number, completed: number): number => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};

export const filterPhotosByStatus = (photos: Photo[], status: PhotoStatus): Photo[] => {
  return photos.filter(photo => photo.status === status);
};

export const getTotalSelectedPhotos = (photos: Photo[]): number => {
  return photos.filter(photo => photo.selected).length;
};