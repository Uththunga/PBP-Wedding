import { create } from 'zustand';
import { Package, Booking, Photo, PhotoStatus } from '../types';

interface BookingStore {
  packages: Package[];
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  updatePhotoStatus: (bookingId: string, photoId: string, status: PhotoStatus) => void;
  togglePhotoSelection: (bookingId: string, photoId: string) => void;
  updatePhotoCount: (bookingId: string, type: 'printed' | 'delivered', count: number) => void;
}

export const useBookingStore = create<BookingStore>((set) => ({
  packages: [
    {
      id: 'wedding-premium',
      name: 'Premium Wedding',
      description: 'Complete wedding day coverage with luxury extras',
      features: [
        'Full day coverage (10 hours)',
        'Two professional photographers',
        'Engagement session included',
        'Premium leather-bound album',
        'Online gallery with high-res images',
        'Drone aerial shots',
        'Same-day preview images',
        'Professional editing and retouching',
        'Wedding day timeline consultation',
        'Multiple locations coverage'
      ]
    },
    {
      id: 'wedding-essential',
      name: 'Wedding Essentials',
      description: 'Perfect coverage for intimate weddings',
      features: [
        '8 hours of coverage',
        'Second photographer',
        'Digital gallery with downloads',
        'Custom photo album',
        'Engagement mini-session',
        'Print release included',
        'Professional editing',
        'Online sharing gallery',
        'Wedding day consultation'
      ]
    },
    {
      id: 'portrait-family',
      name: 'Family Portrait',
      description: 'Capture precious family moments',
      features: [
        '90-minute session',
        'Multiple locations',
        '30 edited digital images',
        'Print release',
        'Online gallery',
        'Mini photo album',
        'Professional editing',
        'Multiple poses and groupings',
        'Location recommendations'
      ]
    },
    {
      id: 'portrait-personal',
      name: 'Personal Branding',
      description: 'Professional headshots and personal branding',
      features: [
        '60-minute session',
        'Multiple outfit changes',
        '20 edited photos',
        'LinkedIn optimization',
        'Quick turnaround',
        'Commercial usage rights',
        'Professional retouching',
        'Personal style consultation',
        'Digital delivery'
      ]
    },
    {
      id: 'event-corporate',
      name: 'Corporate Events',
      description: 'Professional coverage for business events',
      features: [
        '6 hours of coverage',
        'Multiple photographers',
        'Same-day preview images',
        'Corporate branding focus',
        'Quick digital delivery',
        'Commercial usage rights',
        'Event timeline planning',
        'Professional editing',
        'High-resolution images'
      ]
    },
    {
      id: 'event-special',
      name: 'Special Occasions',
      description: 'Birthday parties, anniversaries & celebrations',
      features: [
        '4 hours of coverage',
        'Candid and posed shots',
        'Online gallery sharing',
        'Photo booth setup',
        'Digital downloads',
        'Print package included',
        'Event consultation',
        'Professional editing',
        'Quick turnaround'
      ]
    }
  ],
  bookings: [],
  addBooking: (booking) => set((state) => ({
    bookings: [...state.bookings, booking]
  })),
  updateBookingStatus: (id, status) => set((state) => ({
    bookings: state.bookings.map((booking) =>
      booking.id === id ? { ...booking, status } : booking
    )
  })),
  updatePhotoStatus: (bookingId, photoId, status) => set((state) => ({
    bookings: state.bookings.map((booking) =>
      booking.id === bookingId
        ? {
            ...booking,
            photos: booking.photos.map((photo) =>
              photo.id === photoId ? { ...photo, status } : photo
            )
          }
        : booking
    )
  })),
  togglePhotoSelection: (bookingId, photoId) => set((state) => ({
    bookings: state.bookings.map((booking) =>
      booking.id === bookingId
        ? {
            ...booking,
            photos: booking.photos.map((photo) =>
              photo.id === photoId ? { ...photo, selected: !photo.selected } : photo
            ),
            selectedPhotos: booking.photos.reduce(
              (count, photo) => count + (photo.id === photoId ? (photo.selected ? -1 : 1) : 0),
              booking.selectedPhotos
            )
          }
        : booking
    )
  })),
  updatePhotoCount: (bookingId, type, count) => set((state) => ({
    bookings: state.bookings.map((booking) =>
      booking.id === bookingId
        ? {
            ...booking,
            [type === 'printed' ? 'printedPhotos' : 'deliveredPhotos']: count
          }
        : booking
    )
  }))
}));