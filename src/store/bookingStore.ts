import { create } from 'zustand';
import { Package, Booking, PhotoStatus } from '../types';

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
      id: 'wedding-luxury',
      name: 'Luxury Wedding',
      category: 'Wedding',
      description: 'The ultimate wedding photography experience with premium coverage and exclusive extras',
      features: [
        'Full day coverage (12 hours)',
        'Three professional photographers',
        'Engagement & pre-wedding session',
        'Premium leather-bound album (40 pages)',
        'Parents albums (2 copies)',
        'Drone aerial videography & photography',
        'Same-day preview images',
        'Professional editing and retouching',
        'Wedding day timeline consultation',
        'Multiple locations coverage',
        'Private online gallery',
        'USB drive with all images'
      ]
    },
    {
      id: 'wedding-premium',
      name: 'Premium Wedding',
      category: 'Wedding',
      description: 'Comprehensive wedding coverage with premium features',
      features: [
        'Full day coverage (10 hours)',
        'Two professional photographers',
        'Engagement session included',
        'Premium leather-bound album (30 pages)',
        'Online gallery with high-res images',
        'Drone aerial photography',
        'Same-day preview images',
        'Professional editing and retouching',
        'Wedding day timeline consultation',
        'Multiple locations coverage'
      ]
    },
    {
      id: 'wedding-classic',
      name: 'Classic Wedding',
      category: 'Wedding',
      description: 'Traditional wedding coverage with essential features',
      features: [
        'Full day coverage (8 hours)',
        'Two photographers',
        'Hardcover photo album (25 pages)',
        'Online gallery',
        'Professional editing',
        'Engagement mini-session',
        'Wedding day consultation',
        'High-resolution digital files',
        'Print release included'
      ]
    },
    {
      id: 'wedding-essential',
      name: 'Essential Wedding',
      category: 'Wedding',
      description: 'Perfect coverage for intimate weddings',
      features: [
        '8 hours of coverage',
        'One lead photographer',
        'Second shooter for 4 hours',
        'Digital gallery with downloads',
        'Custom photo album (20 pages)',
        'Professional editing',
        'High-resolution images',
        'Print release'
      ]
    },
    {
      id: 'wedding-intimate',
      name: 'Intimate Wedding',
      category: 'Wedding',
      description: 'Ideal for small, intimate ceremonies and elopements',
      features: [
        '6 hours of coverage',
        'One photographer',
        'Digital gallery',
        'Professional editing',
        'High-resolution images',
        'Print release',
        'Mini photo album (15 pages)',
        'Online sharing gallery'
      ]
    },
    {
      id: 'wedding-micro',
      name: 'Micro Wedding',
      category: 'Wedding',
      description: 'Perfect for micro weddings and civil ceremonies',
      features: [
        '4 hours of coverage',
        'One photographer',
        'Digital gallery',
        'Professional editing',
        'High-resolution images',
        'Print release',
        'Online sharing gallery'
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