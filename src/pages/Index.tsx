
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar } from 'lucide-react';

const Index = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        navigate('/dashboard');
      } else {
        navigate('/login');
      }
    }
  }, [isAuthenticated, isLoading, navigate]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-vacay-100 to-vacay-50 dark:from-vacay-900 dark:to-vacay-800">
        <Calendar className="h-12 w-12 text-vacay-700 dark:text-vacay-300 animate-pulse" />
        <h1 className="mt-4 text-xl font-semibold text-vacay-800 dark:text-vacay-100">
          Cargando App Vacaciones y Permisos...
        </h1>
      </div>
    );
  }
  
  return null;
};

export default Index;
