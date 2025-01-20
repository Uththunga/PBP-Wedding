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
      category: 'Wedding',
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
      category: 'Wedding',
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
      id: 'fashion-editorial',
      name: 'Editorial Fashion',
      category: 'Fashion',
      description: 'High-end fashion and editorial photography',
      features: [
        'Professional styling consultation',
        'Hair and makeup included',
        'Studio and location shoots',
        'High-end retouching',
        'Digital and print deliverables',
        'Usage rights included',
        'Multiple outfit changes',
        'Lighting setup and equipment',
        'Professional team coordination'
      ]
    },
    {
      id: 'fashion-portfolio',
      name: 'Portfolio Builder',
      category: 'Fashion',
      description: 'Perfect for models and influencers',
      features: [
        'Studio session (4 hours)',
        'Basic styling included',
        'Multiple looks',
        'Professional retouching',
        'Digital gallery',
        'Print release',
        'Social media formats',
        'Basic hair and makeup'
      ]
    },
    {
      id: 'family-standard',
      name: 'Family Session',
      category: 'Family',
      description: 'Capture your family\'s precious moments',
      features: [
        '1-hour session',
        'Up to 6 family members',
        'Choice of location',
        'Online gallery',
        '20 digital images',
        'Print release',
        'Basic retouching',
        'Multiple poses and groupings'
      ]
    },
    {
      id: 'family-extended',
      name: 'Extended Family',
      category: 'Family',
      description: 'Perfect for larger family gatherings',
      features: [
        '2-hour session',
        'Up to 12 family members',
        'Multiple locations',
        'Online gallery',
        '40 digital images',
        'Print release',
        'Professional retouching',
        'Family grouping consultation'
      ]
    },
    {
      id: 'portrait-professional',
      name: 'Professional Portrait',
      category: 'Portrait',
      description: 'Professional headshots and portraits',
      features: [
        'Studio session',
        'Professional lighting',
        'Multiple backgrounds',
        'Outfit changes',
        'Basic retouching',
        'Digital delivery',
        'LinkedIn/social media formats',
        'Usage rights included'
      ]
    },
    {
      id: 'portrait-creative',
      name: 'Creative Portrait',
      category: 'Portrait',
      description: 'Artistic and unique portrait session',
      features: [
        'Location or studio',
        'Creative lighting',
        'Concept development',
        'Props and styling',
        'Advanced retouching',
        'Digital and print options',
        'Artistic effects',
        'Personal consultation'
      ]
    },
    {
      id: 'commercial-product',
      name: 'Product Photography',
      category: 'Commercial',
      description: 'Professional product photography',
      features: [
        'Studio setup',
        'Multiple angles',
        'White background',
        'Lifestyle shots',
        'Basic retouching',
        'E-commerce ready',
        'Commercial usage rights',
        'Quick turnaround'
      ]
    },
    {
      id: 'commercial-corporate',
      name: 'Corporate Event',
      category: 'Commercial',
      description: 'Corporate event and branding photography',
      features: [
        'Full event coverage',
        'Corporate headshots',
        'Venue and detail shots',
        'Same-day previews',
        'Online gallery',
        'Commercial usage rights',
        'Quick delivery',
        'Professional editing'
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