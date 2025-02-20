export interface User {
    id: string;
    email: string;
    fullName: string;
    role: 'client';
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}