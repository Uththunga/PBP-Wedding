import { GalleryImage, GalleryCategory } from '../types/gallery';

export const categories: GalleryCategory[] = [
  {
    id: 'wedding',
    title: 'Wedding Photography',
    description: 'Capturing love stories and timeless moments on your special day',
    coverImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc',
    path: '/gallery/wedding'
  },
  {
    id: 'commercial',
    title: 'Commercial Photography',
    description: 'Professional imagery for brands and businesses',
    coverImage: 'https://images.unsplash.com/photo-1532947974358-a218d18d8d14',
    path: '/gallery/commercial'
  },
  {
    id: 'art',
    title: 'Fine Art Photography',
    description: 'Artistic expressions through the lens',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552',
    path: '/gallery/art'
  }
];

export const galleryImages: Record<string, GalleryImage[]> = {
  wedding: [
    {
      id: 'w1',
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc',
      title: 'First Dance',
      category: 'wedding',
      description: 'Intimate moment during the first dance',
      location: 'Villa Rosa'
    },
    {
      id: 'w2',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552',
      title: 'Garden Ceremony',
      category: 'wedding',
      description: 'Beautiful outdoor ceremony setup',
      location: 'Botanical Gardens'
    }
  ],
  commercial: [
    {
      id: 'c1',
      url: 'https://images.unsplash.com/photo-1532947974358-a218d18d8d14',
      title: 'Product Showcase',
      category: 'commercial',
      description: 'Luxury product photography',
    },
    {
      id: 'c2',
      url: 'https://images.unsplash.com/photo-1604537466158-719b1972feb8',
      title: 'Brand Story',
      category: 'commercial',
      description: 'Lifestyle commercial photography',
    }
  ],
  art: [
    {
      id: 'a1',
      url: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d',
      title: 'Abstract Light',
      category: 'art',
      description: 'Experimental light photography',
    },
    {
      id: 'a2',
      url: 'https://images.unsplash.com/photo-1501862700950-18382cd41497',
      title: 'Urban Geometry',
      category: 'art',
      description: 'Architectural abstract photography',
    }
  ]
};