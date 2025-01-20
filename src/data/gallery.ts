import { GalleryCategory, GalleryImage } from '../types/gallery';

export const categories: GalleryCategory[] = [
  {
    id: 'wedding',
    title: 'Wedding',
    description: 'Capturing timeless moments of love and celebration',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552',
    path: '/wedding'
  },
  {
    id: 'fashion',
    title: 'Fashion',
    description: 'Editorial and high-fashion photography',
    coverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae',
    path: '/fashion'
  },
  {
    id: 'family',
    title: 'Family',
    description: 'Beautiful family moments and connections',
    coverImage: 'https://images.unsplash.com/photo-1511895426328-dc8714191300',
    path: '/family'
  },
  {
    id: 'portraits',
    title: 'Portraits',
    description: 'Professional portraits that tell your story',
    coverImage: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04',
    path: '/portraits'
  },
  {
    id: 'commercial',
    title: 'Commercial',
    description: 'Professional photography for businesses and brands',
    coverImage: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0',
    path: '/commercial'
  },
  {
    id: 'events',
    title: 'Events',
    description: 'Capturing special moments at corporate and social events',
    coverImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865',
    path: '/events'
  }
];

export const images: GalleryImage[] = [
  // Wedding Images
  {
    id: 'wedding-1',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552',
    title: 'Beach Wedding Ceremony',
    category: 'wedding',
    description: 'Beautiful sunset beach wedding ceremony',
    location: 'Malibu Beach'
  },
  {
    id: 'wedding-2',
    url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866',
    title: 'First Dance',
    category: 'wedding',
    description: 'Romantic first dance moment',
    location: 'Grand Ballroom'
  },
  {
    id: 'wedding-3',
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a',
    title: 'Wedding Rings',
    category: 'wedding',
    description: 'Elegant wedding rings detail shot',
    location: 'Studio'
  },

  // Fashion Images
  {
    id: 'fashion-1',
    url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae',
    title: 'Editorial Fashion',
    category: 'fashion',
    description: 'High fashion editorial shoot',
    location: 'Urban Studio'
  },
  {
    id: 'fashion-2',
    url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
    title: 'Runway Collection',
    category: 'fashion',
    description: 'Fashion week runway photography',
    location: 'Fashion Week'
  },
  {
    id: 'fashion-3',
    url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b',
    title: 'Street Style',
    category: 'fashion',
    description: 'Urban fashion photography',
    location: 'City Streets'
  },

  // Family Images
  {
    id: 'family-1',
    url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300',
    title: 'Family Portrait',
    category: 'family',
    description: 'Natural family portrait session',
    location: 'Park'
  },
  {
    id: 'family-2',
    url: 'https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb',
    title: 'Family Lifestyle',
    category: 'family',
    description: 'Candid family moment',
    location: 'Home'
  },
  {
    id: 'family-3',
    url: 'https://images.unsplash.com/photo-1597524678053-5e6fe00bc6bf',
    title: 'Generations',
    category: 'family',
    description: 'Multi-generational family portrait',
    location: 'Garden'
  },

  // Portrait Images
  {
    id: 'portrait-1',
    url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04',
    title: 'Professional Headshot',
    category: 'portraits',
    description: 'Corporate professional headshot',
    location: 'Studio'
  },
  {
    id: 'portrait-2',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    title: 'Creative Portrait',
    category: 'portraits',
    description: 'Artistic portrait photography',
    location: 'Studio'
  },
  {
    id: 'portrait-3',
    url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
    title: 'Black & White Portrait',
    category: 'portraits',
    description: 'Classic black and white portraiture',
    location: 'Studio'
  },

  // Commercial Images
  {
    id: 'commercial-1',
    url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0',
    title: 'Corporate Event',
    category: 'commercial',
    description: 'Business conference photography',
    location: 'Convention Center'
  },
  {
    id: 'commercial-2',
    url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf',
    title: 'Product Photography',
    category: 'commercial',
    description: 'Professional product showcase',
    location: 'Studio'
  },
  {
    id: 'commercial-3',
    url: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76',
    title: 'Brand Lifestyle',
    category: 'commercial',
    description: 'Lifestyle product photography',
    location: 'Location Shoot'
  },

  // Event Images
  {
    id: 'event-1',
    url: 'https://images.unsplash.com/photo-1511578314322-379afb476865',
    title: 'Corporate Conference',
    category: 'events',
    description: 'Annual tech conference keynote presentation',
    location: 'Convention Center'
  },
  {
    id: 'event-2',
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
    title: 'Gala Dinner',
    category: 'events',
    description: 'Elegant charity gala dinner event',
    location: 'Grand Ballroom'
  },
  {
    id: 'event-3',
    url: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329',
    title: 'Music Festival',
    category: 'events',
    description: 'Outdoor summer music festival',
    location: 'City Park'
  },
  {
    id: 'event-4',
    url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2',
    title: 'Birthday Party',
    category: 'events',
    description: 'Colorful birthday celebration',
    location: 'Private Venue'
  }
];
