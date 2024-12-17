export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: string;
  description?: string;
  date?: string;
  location?: string;
}

export interface GalleryCategory {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  path: string;
}