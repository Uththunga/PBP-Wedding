export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'admin' | 'client';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}