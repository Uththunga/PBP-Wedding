import { describe, it, expect, beforeEach } from 'vitest';
import { useBookingStore } from '../bookingStore';

describe('bookingStore', () => {
  beforeEach(() => {
    useBookingStore.setState({
      bookings: [],
      packages: [
        {
          id: 'test-package',
          name: 'Test Package',
          description: 'Test Description',
          price: 100,
          features: ['Feature 1']
        }
      ]
    });
  });

  it('adds a booking correctly', () => {
    const booking = {
      id: '1',
      clientName: 'Test Client',
      clientEmail: 'test@example.com',
      packageId: 'test-package',
      date: '2024-03-20',
      status: 'pending' as const,
      photos: [],
      totalPhotos: 0,
      selectedPhotos: 0,
      printedPhotos: 0,
      deliveredPhotos: 0
    };

    useBookingStore.getState().addBooking(booking);
    const state = useBookingStore.getState();
    
    expect(state.bookings).toHaveLength(1);
    expect(state.bookings[0]).toEqual(booking);
  });

  it('updates booking status correctly', () => {
    const booking = {
      id: '1',
      clientName: 'Test Client',
      clientEmail: 'test@example.com',
      packageId: 'test-package',
      date: '2024-03-20',
      status: 'pending' as const,
      photos: [],
      totalPhotos: 0,
      selectedPhotos: 0,
      printedPhotos: 0,
      deliveredPhotos: 0
    };

    useBookingStore.getState().addBooking(booking);
    useBookingStore.getState().updateBookingStatus('1', 'confirmed');
    
    const state = useBookingStore.getState();
    expect(state.bookings[0].status).toBe('confirmed');
  });
});