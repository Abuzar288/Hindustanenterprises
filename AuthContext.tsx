import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from './types'; // Corrected path

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
  login: (emailOrUsername: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAIL = 'info@hindustanenterprises.in';
const ADMIN_USERNAME = 'info@hindustanenterprises.in'; // Allow login with email as username
const ADMIN_PASSWORD = 'Mohd@2021';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        const parsedUser: User = JSON.parse(storedUser);
        // Ensure only the admin user can be loaded from localStorage for this setup
        if (parsedUser.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
            setCurrentUser(parsedUser);
        } else {
            localStorage.removeItem('currentUser');
        }
      }
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
      localStorage.removeItem('currentUser');
    }
    setIsLoading(false);
  }, []);

  const login = async (emailOrUsername: string, passwordInput: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

    const normalizedEmailOrUsername = emailOrUsername.trim().toLowerCase();
    const trimmedPassword = passwordInput.trim();

    if (
      (normalizedEmailOrUsername === ADMIN_EMAIL || normalizedEmailOrUsername === ADMIN_USERNAME) &&
      trimmedPassword === ADMIN_PASSWORD
    ) {
      const user: User = { id: 'admin_001', username: 'Admin', email: ADMIN_EMAIL };
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      setError('Invalid credentials. Please try again.');
      setIsLoading(false); 
      throw new Error('Invalid credentials');
    }
    setIsLoading(false);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ currentUser, isLoading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};