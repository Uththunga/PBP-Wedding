import { format, isValid, parse } from 'date-fns';

export const formatBookingDate = (date: string): string => {
  const parsedDate = new Date(date);
  return isValid(parsedDate) ? format(parsedDate, 'MMM dd, yyyy') : 'Invalid Date';
};

export const isValidBookingDate = (date: string): boolean => {
  const parsedDate = parse(date, 'yyyy-MM-dd', new Date());
  return isValid(parsedDate) && parsedDate > new Date();
};