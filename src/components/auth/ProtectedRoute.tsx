import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresAdmin?: boolean;
}

export default function ProtectedRoute({ children, requiresAdmin = false }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiresAdmin && user?.role !== 'admin') {
    return <Navigate to="/members/dashboard" replace />;
  }

  return <>{children}</>;
}