import React from 'react';
import { useParams } from 'react-router-dom';
import { categories, galleryImages } from '../../data/galleries';
import CategoryHeader from '../../components/gallery/CategoryHeader';
import GalleryGrid from '../../components/gallery/GalleryGrid';

export default function CategoryGallery() {
  const { category } = useParams<{ category: string }>();
  const categoryData = categories.find(c => c.id === category);
  const images = category ? galleryImages[category] : [];

  if (!categoryData) {
    return <div>Gallery not found</div>;
  }

  return (
    <div className="min-h-screen bg-black">
      <CategoryHeader
        title={categoryData.title}
        description={categoryData.description}
        coverImage={categoryData.coverImage}
      />
      
      <div className="max-w-7xl mx-auto px-6 py-16">
        <GalleryGrid images={images} />
      </div>
    </div>
  );
}