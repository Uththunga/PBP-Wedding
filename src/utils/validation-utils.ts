import { z } from 'zod';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateName = (name: string): boolean => {
  return name.length >= 2 && name.length <= 50;
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  return phoneRegex.test(phone);
};

const bookingSchema = z.object({
  clientName: z.string().min(2, 'Name must be at least 2 characters'),
  clientEmail: z.string().email('Invalid email address'),
  packageId: z.string().min(1, 'Please select a package'),
  date: z.string().min(1, 'Please select a date'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  location: z.string().min(1, 'Please enter a venue location'),
  notes: z.string().optional(),
  addons: z.array(z.string()).optional().default([])
});

export type BookingFormData = z.infer<typeof bookingSchema>;

export const validateBookingForm = (data: BookingFormData) => {
  const result = bookingSchema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map(error => ({
      field: error.path[0],
      message: error.message
    }));
    return { isValid: false, errors };
  }
  return { isValid: true, errors: [] };
};