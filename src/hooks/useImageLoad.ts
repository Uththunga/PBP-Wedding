import { useState, useEffect } from 'react';

export function useImageLoad(src: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const img = new Image();
    
    const handleLoad = () => {
      setIsLoading(false);
      setError(null);
    };

    const handleError = () => {
      setIsLoading(false);
      setError(new Error(`Failed to load image: ${src}`));
    };

    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);
    img.src = src;

    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
      // Cancel the image load if the component unmounts
      img.src = '';
    };
  }, [src]);

  return { isLoading, error };
}
