import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Download, Share2 } from 'lucide-react';
import { GalleryImage } from '../../types/gallery';

interface ImageLightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function ImageLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}: ImageLightboxProps) {
  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') onNext();
    if (e.key === 'ArrowLeft') onPrev();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
        onClick={onClose}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Navigation buttons */}
        <button
          className="absolute left-4 p-2 text-white/80 hover:text-white transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button
          className="absolute right-4 p-2 text-white/80 hover:text-white transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        {/* Image */}
        <div
          className="relative max-w-[90vw] max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={currentImage.url}
            alt={currentImage.title}
            className="max-w-full max-h-[90vh] object-contain"
          />
          
          {/* Image info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
            <h3 className="text-xl font-semibold mb-1">{currentImage.title}</h3>
            <p className="text-sm text-white/90 mb-2">{currentImage.description}</p>
            
            {/* Actions */}
            <div className="flex gap-2">
              <button
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                onClick={() => window.open(currentImage.url, '_blank')}
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: currentImage.title,
                      text: currentImage.description,
                      url: currentImage.url,
                    });
                  }
                }}
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
