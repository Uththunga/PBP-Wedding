import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../utils/test-utils';
import GalleryGrid from '../GalleryGrid';

describe('GalleryGrid', () => {
  const mockImages = [
    {
      id: '1',
      url: 'https://example.com/image1.jpg',
      title: 'Test Image 1',
      category: 'wedding',
      description: 'Test description 1'
    },
    {
      id: '2',
      url: 'https://example.com/image2.jpg',
      title: 'Test Image 2',
      category: 'portrait',
      description: 'Test description 2'
    }
  ];

  it('renders all images', () => {
    render(<GalleryGrid images={mockImages} />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(mockImages.length);
  });

  it('displays image titles', () => {
    render(<GalleryGrid images={mockImages} />);
    expect(screen.getByText('Test Image 1')).toBeInTheDocument();
    expect(screen.getByText('Test Image 2')).toBeInTheDocument();
  });
});