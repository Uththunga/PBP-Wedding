import { create } from 'zustand';
import { AuthState, User } from '../types/auth';

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (user: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      // TODO: Replace with actual API call
      const mockUser: User = {
        id: '1',
        email,
        name: 'John Doe',
        role: 'client'
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false
    });
  },

  register: async (email: string, password: string, name: string) => {
    set({ isLoading: true });
    try {
      // TODO: Replace with actual API call
      const mockUser: User = {
        id: String(Math.random()),
        email,
        name,
        role: 'client'
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error) {
      set({ isLoading: false });
      throw new Error('Registration failed. Please try again.');
    }
  },

  resetPassword: async (email: string) => {
    set({ isLoading: true });
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  updateProfile: async (userData: Partial<User>) => {
    set({ isLoading: true });
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set(state => ({
        user: state.user ? { ...state.user, ...userData } : null,
        isLoading: false
      }));
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  }
}));