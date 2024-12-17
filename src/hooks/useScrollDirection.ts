import { useState, useEffect } from 'react';

type ScrollDirection = 'up' | 'down' | null;

export function useScrollDirection(threshold = 0) {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);
  const [prevOffset, setPrevOffset] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset;
      const difference = currentOffset - prevOffset;
      
      // Show navbar at the very top of the page
      if (currentOffset === 0) {
        setVisible(true);
        return;
      }

      // Update visibility based on scroll direction
      if (difference > threshold) {
        setScrollDirection('down');
        setVisible(false);
      } else if (difference < -threshold) {
        setScrollDirection('up');
        setVisible(true);
      }

      setPrevOffset(currentOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevOffset, threshold]);

  return { scrollDirection, visible };
}