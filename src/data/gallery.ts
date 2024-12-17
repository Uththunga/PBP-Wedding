import { GalleryCategory, GalleryImage } from '../types/gallery';

export const categories: GalleryCategory[] = [
  {
    id: 'weddings',
    title: 'Weddings',
    description: 'Capturing beautiful moments of love and celebration',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552',
    path: '/gallery/weddings'
  },
  {
    id: 'portraits',
    title: 'Portraits',
    description: 'Professional portrait photography that tells your story',
    coverImage: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04',
    path: '/gallery/portraits'
  },
  {
    id: 'events',
    title: 'Events',
    description: 'Documenting special moments at corporate and social events',
    coverImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865',
    path: '/gallery/events'
  }
];

export const images: GalleryImage[] = [
  {
    id: 'wedding-1',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552',
    title: 'Beach Wedding',
    category: 'weddings',
    description: 'Beautiful sunset beach wedding ceremony',
    location: 'Malibu Beach'
  },
  {
    id: 'portrait-1',
    url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04',
    title: 'Professional Headshot',
    category: 'portraits',
    description: 'Corporate professional headshot',
    location: 'Studio'
  },
  {
    id: 'event-1',
    url: 'https://images.unsplash.com/photo-1511578314322-379afb476865',
    title: 'Corporate Event',
    category: 'events',
    description: 'Annual tech conference keynote',
    location: 'Convention Center'
  },
  // Add more sample images as needed
];
