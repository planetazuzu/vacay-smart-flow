
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types/models';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

// Create a mock user for demonstration purposes
const mockUsers = [
  {
    id: '1',
    name: 'Worker Demo',
    email: 'worker@demo.com',
    role: UserRole.WORKER,
    shift: 'localized',
    workday: 'full_time',
    department: 'Operations',
    workGroup: 'localized',
    seniority: 3
  },
  {
    id: '2',
    name: 'HR Manager Demo',
    email: 'hr@demo.com',
    role: UserRole.HR_MANAGER,
    shift: 'programmed',
    workday: 'full_time',
    department: 'Human Resources',
    workGroup: 'programmed',
    seniority: 5
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('vacay_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would be an API call to a backend service
      const foundUser = mockUsers.find(user => user.email === email);
      
      if (foundUser && password === 'password') { // Mock password check
        setUser(foundUser as User);
        localStorage.setItem('vacay_user', JSON.stringify(foundUser));
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      setError((err as Error).message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vacay_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      error
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
