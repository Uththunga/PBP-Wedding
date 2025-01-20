export type Package = {
  id: string;
  name: string;
  description: string;
  features: string[];
  category?: string;
};

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export type PhotoStatus = 'selected' | 'printed' | 'delivered';

export type Photo = {
  id: string;
  url: string;
  status: PhotoStatus;
  selected: boolean;
};

export type Booking = {
  id: string;
  clientName: string;
  clientEmail: string;
  packageId: string;
  date: string;
  status: BookingStatus;
  notes?: string;
  photos: Photo[];
  totalPhotos: number;
  selectedPhotos: number;
  printedPhotos: number;
  deliveredPhotos: number;
};