import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Camera } from 'lucide-react';

interface BookingDetails {
  date: string;
  time: string;
  package: string;
  location: string;
  status: 'pending' | 'confirmed' | 'completed';
  nextStep: string;
  progress: number;
}

export default function BookingStatus() {
  const booking: BookingDetails = {
    date: '2024-03-20',
    time: '14:00',
    package: 'Wedding Photography',
    location: 'Central Park, New York',
    status: 'confirmed',
    nextStep: 'Photo Selection',
    progress: 60,
  };

  const getStatusColor = (status: BookingDetails['status']) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-400';
      case 'confirmed':
        return 'text-green-400';
      case 'completed':
        return 'text-brand-beige';
      default:
        return 'text-brand-muted';
    }
  };

  return (
    <div className="bg-brand-dark/50 border border-brand-beige/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-serif text-brand-beige">Upcoming Session</h3>
        <span className={`text-sm capitalize ${getStatusColor(booking.status)}`}>
          {booking.status}
        </span>
      </div>
      
      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <Calendar className="h-5 w-5 text-brand-beige" />
          <div>
            <p className="text-sm text-brand-muted">Date & Time</p>
            <p className="text-brand-beige">{booking.date} at {booking.time}</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <Camera className="h-5 w-5 text-brand-beige" />
          <div>
            <p className="text-sm text-brand-muted">Package</p>
            <p className="text-brand-beige">{booking.package}</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <MapPin className="h-5 w-5 text-brand-beige" />
          <div>
            <p className="text-sm text-brand-muted">Location</p>
            <p className="text-brand-beige">{booking.location}</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <Clock className="h-5 w-5 text-brand-beige" />
          <div>
            <p className="text-sm text-brand-muted">Next Step</p>
            <p className="text-brand-beige">{booking.nextStep}</p>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-brand-muted">Session Progress</span>
            <span className="text-sm text-brand-beige">{booking.progress}%</span>
          </div>
          <div className="h-2 bg-brand-dark rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${booking.progress}%` }}
              className="h-full bg-brand-beige/50 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}